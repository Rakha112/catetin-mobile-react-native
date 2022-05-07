import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  StatusBar,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import Arrow from '../assets/images/right-arrow-svgrepo-com.svg';
import {useNavigation} from '@react-navigation/native';
import Button from '../components/Button';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import * as Keychain from 'react-native-keychain';
import {connect} from 'react-redux';

const LoginPage = ({setUsernameGlobal}) => {
  const navigation = useNavigation();
  const passwordRef = useRef(null);
  const [usernameFocus, setUsernameFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  axios.defaults.withCredentials = true;

  const storeToken = async (username, token) => {
    await Keychain.setInternetCredentials('token', username, token);
  };
  const storeLogin = async () => {
    await Keychain.setInternetCredentials('login', 'login', 'true');
  };

  const getToken = async () => {
    try {
      // Retrieve the credentials
      const credentials = await Keychain.getInternetCredentials('token');
      if (credentials) {
        console.log(
          'Credentials successfully loaded for user ' + credentials.username,
        );
      } else {
        console.log('No credentials stored');
      }
    } catch (error) {
      console.log("Keychain couldn't be accessed!", error);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  const submitHandle = () => {
    if (username === '' || password === '') {
      Toast.show({
        type: 'gagal',
        text1: 'Username dan password tidak boleh kosong',
        visibilityTime: 2000,
      });
    } else {
      axios
        .post('https://catetinnote.herokuapp.com/login/mobile', {
          username: username,
          password: password,
        })
        .then(response => {
          if (response.data.alert === 2) {
            Toast.show({
              type: 'sukses',
              text1: response.data.message,
              visibilityTime: 2000,
            });
            setUsernameGlobal(username);
            storeToken(username, response.data.token);
            storeLogin();
            navigation.reset({
              index: 0,
              routes: [{name: 'Home'}],
            });
          } else if (response.data.alert === 3) {
            Toast.show({
              type: 'warning',
              text1: response.data.message,
              visibilityTime: 2000,
            });
          } else {
            Toast.show({
              type: 'warning',
              text1: response.data.message,
              visibilityTime: 2000,
            });
          }
        })
        .catch(err => {
          console.log(err.response);
        });
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        enabled={false}>
        <View style={[styles.alignBaseline, {paddingVertical: 10}]}>
          <TouchableOpacity
            onPress={() => {
              navigation.pop();
            }}
            style={styles.touch}>
            <Arrow
              width={25}
              height={25}
              style={styles.arrow}
              fill={'#000000'}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.atas}>
          <Text style={styles.text}>Log In</Text>
        </View>
        <View style={styles.form}>
          <View style={[styles.alignBaseline, {marginBottom: 20}]}>
            <Text style={styles.inputLabel}>Username</Text>
            <TextInput
              blurOnSubmit={false}
              placeholder="Masukkan Username..."
              style={[
                styles.input,
                usernameFocus ? {borderColor: 'black'} : {},
              ]}
              autoCapitalize="none"
              onFocus={() => setUsernameFocus(true)}
              onBlur={() => setUsernameFocus(false)}
              onChangeText={e => setUsername(e)}
              onSubmitEditing={() => passwordRef.current.focus()}
            />
          </View>
          <View style={styles.alignBaseline}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              ref={passwordRef}
              placeholder="Masukkan Password..."
              style={[
                styles.input,
                passwordFocus ? {borderColor: 'black'} : {},
              ]}
              secureTextEntry={true}
              autoCapitalize="none"
              onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordFocus(false)}
              onChangeText={e => setPassword(e)}
              onSubmitEditing={() => submitHandle()}
            />
          </View>
        </View>
        <View style={styles.bawah}>
          <Button
            text={'Log In'}
            bgColor={'black'}
            textColor={'white'}
            submit={submitHandle}
          />
          <Text style={styles.textBawah}>
            Belum punya akun ? silahkan&nbsp;
            <Text
              style={styles.textSpan}
              onPress={() => {
                navigation.replace('Signup');
              }}>
              Sign Up
            </Text>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
const mapDispatchToProps = dispatch => {
  return {
    setUsernameGlobal: data => dispatch({type: 'USERNAME', payload: data}),
  };
};

export default connect(null, mapDispatchToProps)(LoginPage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  arrow: {
    transform: [{rotateY: '180deg'}],
  },
  touch: {
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  atas: {justifyContent: 'center', alignItems: 'center', flex: 2},
  form: {
    alignItems: 'center',
    flex: 2,
  },
  text: {
    fontFamily: 'Poppins-Bold',
    fontSize: 40,
    color: 'black',
  },
  textBawah: {
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    color: 'black',
  },
  textSpan: {fontFamily: 'Poppins-Bold'},
  inputLabel: {
    fontFamily: 'Poppins-Regular',
    backgroundColor: 'white',
    position: 'absolute',
    zIndex: 2,
    marginLeft: 20,
    paddingHorizontal: 5,
  },
  input: {
    fontFamily: 'Poppins-Regular',
    borderColor: '#C1C7C9',
    borderWidth: 2,
    borderRadius: 50,
    width: 300,
    marginTop: 10,
    paddingLeft: 25,
  },
  bawah: {flex: 2, justifyContent: 'center', alignItems: 'center'},
  alignBaseline: {
    alignItems: 'baseline',
  },
});
