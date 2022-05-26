/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  SafeAreaView,
  TextInput,
  Alert,
} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import React, {useRef, useCallback, useState} from 'react';
import Ripple from 'react-native-material-ripple';
import Arrow from '../assets/images/right-arrow-svgrepo-com.svg';
import Dot from '../assets/images/three-dots-vertical-svgrepo-com.svg';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {useNavigation} from '@react-navigation/native';
import EditIcon from '../assets/images/edit-svgrepo-com.svg';
import DeleteIcon from '../assets/images/trash-alt-delete-bin-svgrepo-com.svg';
import SaveIcon from '../assets/images/save-svgrepo-com.svg';
import axios from 'axios';
import * as Keychain from 'react-native-keychain';
import {connect} from 'react-redux';
import Toast from 'react-native-toast-message';
const NotePage = ({route, setRefresh}) => {
  const navigaton = useNavigation();
  const bottomSheetRef = useRef(null);
  const isiRef = useRef(null);
  const [editable, setEditable] = useState(false);
  const [isiBaru, setIsiBaru] = useState('');
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

  const editHandle = () => {
    getToken().then(res => {
      axios
        .put('https://catetinnote.herokuapp.com/note/update', {
          judul: route.params.judul,
          isi: isiBaru,
          user: res.username,
          token: res.password,
        })
        .then(() => {
          setRefresh(true);
          Toast.show({
            type: 'sukses',
            text1: 'Perubahan telah tersimpan',
            visibilityTime: 2000,
          });
        });
    });
  };

  const deleteHandle = () => {
    getToken().then(res => {
      axios
        .delete('https://catetinnote.herokuapp.com/note/delete', {
          data: {
            judul: route.params.judul,
            isi: route.params.isi,
            user: res.username,
            token: res.password,
          },
        })
        .then(() => {
          setRefresh(true);
          navigaton.pop();
          Toast.show({
            type: 'sukses',
            text1: 'Catatan telah terhapus',
            visibilityTime: 2000,
          });
        });
    });
  };

  const createSaveAlert = () =>
    Alert.alert(
      'Simpan Catatan',
      'Anda belum menyimpan catatan anda. Simpan sebelum kembali ?',
      [
        {
          text: 'Cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            setEditable(false);
            editHandle();
            navigaton.pop();
          },
        },
      ],
    );
  const createDeleteAlert = () =>
    Alert.alert('Hapus catatan', 'Apakah anda yakin akan menghapus catatan ?', [
      {
        text: 'Cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          deleteHandle();
        },
      },
    ]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableWithoutFeedback
          onPress={() => {
            if (editable) {
              createSaveAlert();
            } else {
              navigaton.pop();
              isiRef.current.blur();
            }
          }}>
          <View style={styles.arrow}>
            <Arrow width={20} height={20} fill={'#000000'} />
          </View>
        </TouchableWithoutFeedback>
        <Ripple
          onPress={() => {
            bottomSheetRef.current.expand();
            isiRef.current.blur();
          }}
          style={styles.threeDots}>
          <Dot width={25} height={25} fill={'black'} />
        </Ripple>
      </View>
      <Text
        style={[
          styles.textInput,
          {borderBottomWidth: 1, borderBottomColor: 'grey', paddingBottom: 10},
        ]}>
        {route.params.judul}
      </Text>
      <TextInput
        editable={editable}
        ref={isiRef}
        placeholder="Isikan note di sini..."
        defaultValue={route.params.isi}
        multiline={true}
        onChangeText={e => setIsiBaru(e)}
        style={[
          styles.textInput,
          {textAlignVertical: 'top', maxHeight: '80%', height: '80%'},
        ]}
      />
      <BottomSheet
        enablePanDownToClose={true}
        index={-1}
        ref={bottomSheetRef}
        snapPoints={[150, 150]}
        backdropComponent={renderBackdrop}>
        <View style={styles.bottomSheetContainer}>
          {editable ? (
            <Ripple
              style={styles.tombol}
              onPress={() => {
                setEditable(false);
                bottomSheetRef.current.close();
                editHandle();
              }}>
              <SaveIcon
                width={30}
                height={30}
                fill={'black'}
                style={{marginHorizontal: 20}}
              />
              <Text style={styles.textButton}>Save</Text>
            </Ripple>
          ) : (
            <Ripple
              style={styles.tombol}
              onPress={() => {
                setEditable(true);
                bottomSheetRef.current.close();
              }}>
              <EditIcon
                width={30}
                height={30}
                fill={'black'}
                style={{marginHorizontal: 20}}
              />
              <Text style={styles.textButton}>Edit</Text>
            </Ripple>
          )}
          <Ripple
            style={styles.tombol}
            onPress={() => {
              createDeleteAlert();
            }}>
            <DeleteIcon width={30} height={30} style={{marginHorizontal: 20}} />
            <Text style={styles.textButton}>Delete</Text>
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

export default connect(null, mapDispatchToProps)(NotePage);

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
    fontFamily: 'Pippins-Regular',
    fontSize: 18,
    color: 'black',
  },
  textButton: {
    fontFamily: 'Poppins-Medium',
    fontSize: 20,
    color: 'black',
  },
});
