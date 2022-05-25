/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Platform,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Arrow from '../assets/images/right-arrow-svgrepo-com.svg';
import Button from '../components/Button';
import {useNavigation} from '@react-navigation/native';
const KeyboardAwareScrollViewComponent = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.alignBaseline, {paddingVertical: 10}]}>
        <TouchableOpacity
          onPress={() => {
            navigation.pop();
          }}
          style={styles.touch}>
          <Arrow width={25} height={25} style={styles.arrow} fill={'#000000'} />
        </TouchableOpacity>
      </View>
      <KeyboardAwareScrollView>
        <View style={styles.inner}>
          <View style={styles.atas}>
            <Text style={styles.text}>Log In</Text>
          </View>
          <View style={styles.form}>
            <View style={[styles.alignBaseline, {marginBottom: 20}]}>
              <Text style={styles.inputLabel}>Username</Text>
              <TextInput
                blurOnSubmit={false}
                placeholder="Masukkan Username..."
                style={[styles.input]}
              />
            </View>
            <View style={styles.alignBaseline}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                placeholder="Masukkan Password..."
                style={[styles.input]}
              />
            </View>
          </View>
          <View style={styles.bawah}>
            <Button text={'Log In'} bgColor={'black'} textColor={'white'} />
            <Text style={styles.textBawah}>
              Belum punya akun ? silahkan&nbsp;
              <Text style={styles.textSpan}>Sign Up</Text>
            </Text>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: 'space-around',
  },
  header: {
    // flex: 1,
    fontSize: 36,
    marginBottom: 48,
  },
  textInput: {
    height: 40,
    borderColor: '#000000',
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  btnContainer: {
    // flex: 4,
    backgroundColor: 'white',
    marginTop: 12,
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
    // flex: 2,
    height: 500,
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
export default KeyboardAwareScrollViewComponent;
