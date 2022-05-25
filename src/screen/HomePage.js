/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  Alert,
  RefreshControl,
} from 'react-native';
import React, {useCallback, useRef, useEffect, useState} from 'react';
import Dot from '../assets/images/three-dots-vertical-svgrepo-com.svg';
import ListNote from '../components/ListNote';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import LogOutIcon from '../assets/images/log-out-svgrepo-com.svg';
import Ripple from 'react-native-material-ripple';
import ButtonNewNote from '../components/ButtonNewNote';
import * as Keychain from 'react-native-keychain';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import Skeleton from '../components/Skeleton';

const HomePage = ({refresh, setRefresh}) => {
  const navigation = useNavigation();
  const bottomSheetRef = useRef(null);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  // eslint-disable-next-line no-unused-vars
  const [refreshing, setRefreshing] = useState(false);
  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    [],
  );
  const getToken = async () => {
    const credentials = await Keychain.getInternetCredentials('token');
    if (credentials) {
      console.log(
        'Credentials successfully loaded for user ' + credentials.username,
      );
    } else {
      console.log('No credentials stored');
    }
    return credentials;
  };

  const getData = async (token, username2) => {
    const request = await axios.get('https://catetinnote.herokuapp.com/note', {
      params: {
        token: token,
        user: username2,
      },
    });
    return request.data;
  };

  const logoutHandle = async () => {
    await Keychain.resetInternetCredentials('token');
    await axios.get('https://catetinnote.herokuapp.com/logout').then(res => {
      if (res.data.logout) {
        navigation.replace('Welcome');
      }
    });
  };

  const refreshHandle = () => {
    getToken().then(res => {
      setUsername(res.username);
      getData(res.password, res.username).then(res2 => {
        setData(res2);
        setRefresh(false);
      });
    });
  };

  // useFocusEffect(
  //   React.useCallback(() => {
  //     getToken().then(res => {
  //       setUsername(res.username);
  //       getData(res.password, res.username).then(res => setData(res));
  //     });
  //   }, []),
  // );

  useEffect(() => {
    if (refresh) {
      setRefresh(false);
    } else {
      getToken().then(res => {
        setUsername(res.username);
        getData(res.password, res.username).then(res2 => {
          setData(res2);
          setLoading(true);
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh]);

  const createAlertLogOut = () =>
    Alert.alert('Log Out', 'Apakah anda yakin akan Log Out ?', [
      {
        text: 'Cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          logoutHandle();
        },
      },
    ]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.user}>
          <Image
            source={require('../assets/images/user.png')}
            style={styles.image}
          />
          <Text style={styles.nama}>{username}</Text>
        </View>
        <Ripple
          onPress={() => bottomSheetRef.current.expand()}
          style={styles.threeDots}>
          <Dot width={25} height={25} fill={'black'} />
        </Ripple>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            onRefresh={() => refreshHandle()}
            refreshing={refreshing}
          />
        }>
        {loading ? (
          data.length > 0 ? (
            data.map(data2 => {
              return (
                <ListNote
                  judul={data2.judul}
                  isi={data2.isi}
                  key={data2.judul}
                />
              );
            })
          ) : (
            <View style={{alignItems: 'center'}}>
              <Text style={styles.nama}>Belum ada Catatan...</Text>
            </View>
          )
        ) : (
          <Skeleton />
        )}
      </ScrollView>
      <ButtonNewNote />
      <BottomSheet
        enablePanDownToClose={true}
        index={-1}
        ref={bottomSheetRef}
        snapPoints={[100, 100]}
        backdropComponent={renderBackdrop}>
        <View style={styles.bottomSheetContainer}>
          <Ripple
            style={styles.tombol}
            onPress={() => {
              createAlertLogOut();
            }}>
            <LogOutIcon width={40} height={40} style={{marginHorizontal: 20}} />
            <Text
              style={{
                fontFamily: 'Poppins-Medium',
                fontSize: 20,
                color: 'black',
              }}>
              Log Out
            </Text>
          </Ripple>
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
};
const mapStateToProps = state => {
  return {
    refresh: state.refresh,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setRefresh: data => dispatch({type: 'REFRESH', payload: data}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  user: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  image: {
    resizeMode: 'contain',
    width: 30,
    height: 30,
  },
  nama: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: 'black',
    marginLeft: 10,
  },
  threeDots: {
    borderRadius: 50,
    padding: 5,
    overflow: 'hidden',
  },
  bottomSheetContainer: {
    flex: 1,
  },
  tombol: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
