/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  StatusBar,
  TextInput,
} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import React, {useCallback, useRef, useState} from 'react';
import Arrow from '../assets/images/right-arrow-svgrepo-com.svg';
import Dot from '../assets/images/three-dots-vertical-svgrepo-com.svg';
import Ripple from 'react-native-material-ripple';
import {useNavigation} from '@react-navigation/native';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import SaveIcon from '../assets/images/save-svgrepo-com.svg';
import * as Keychain from 'react-native-keychain';
import axios from 'axios';
import {connect} from 'react-redux';
import Toast from 'react-native-toast-message';
const NewNotePage = ({setRefresh}) => {
  const navigaton = useNavigation();
  const bottomSheetRef = useRef(null);
  const judulRef = useRef(null);
  const isiRef = useRef(null);
  const [judulFocus, setJudulFocus] = useState(false);
  const [judul, setJudul] = useState('');
  const [isi, setIsi] = useState('');
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

  const newHandle = () => {
    getToken().then(res => {
      axios
        .post('https://catetinnote.herokuapp.com/note/insert', {
          judul: judul,
          isi: isi,
          user: res.username,
          token: res.password,
        })
        .then(() => {
          setRefresh(true);
          navigaton.pop();
          Toast.show({
            type: 'sukses',
            text1: 'Catatan telah ditambahkan',
            visibilityTime: 2000,
          });
        });
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableWithoutFeedback
          onPress={() => {
            navigaton.pop();
            judulRef.current.blur();
            isiRef.current.blur();
          }}>
          <View style={styles.arrow}>
            <Arrow width={20} height={20} fill={'#000000'} />
          </View>
        </TouchableWithoutFeedback>
        <Ripple
          onPress={() => {
            bottomSheetRef.current.expand();
            judulRef.current.blur();
            isiRef.current.blur();
          }}
          style={styles.threeDots}>
          <Dot width={25} height={25} fill={'black'} />
        </Ripple>
      </View>
      <TextInput
        ref={judulRef}
        onFocus={() => setJudulFocus(true)}
        onBlur={() => setJudulFocus(false)}
        onChangeText={e => setJudul(e)}
        style={[
          styles.textInput,
          {borderBottomColor: 'grey', borderBottomWidth: 1},
          judulFocus ? {borderBottomColor: 'blue'} : {},
        ]}
        placeholder="Judul.."
      />
      <TextInput
        ref={isiRef}
        placeholder="Isikan note di sini..."
        multiline={true}
        onChangeText={e => setIsi(e)}
        style={[
          styles.textInput,
          {textAlignVertical: 'top', maxHeight: '80%', height: '80%'},
        ]}
      />
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
              isi !== '' && judul !== ''
                ? newHandle()
                : Toast.show({
                    type: 'gagal',
                    text1: 'Judul dan isi note tidak boleh kosong',
                    visibilityTime: 2000,
                  });
            }}>
            <SaveIcon
              width={30}
              height={30}
              fill={'black'}
              style={{marginHorizontal: 20}}
            />
            <Text style={styles.textButton}>Save</Text>
          </Ripple>
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    setRefresh: data => dispatch({type: 'REFRESH', payload: data}),
  };
};

export default connect(null, mapDispatchToProps)(NewNotePage);

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
  arrow: {
    transform: [{rotateY: '180deg'}],
    borderRadius: 50,
    padding: 5,
    overflow: 'hidden',
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
  textInput: {
    marginHorizontal: 40,
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
  },
  textButton: {
    fontFamily: 'Poppins-Medium',
    fontSize: 20,
    color: 'black',
  },
});
