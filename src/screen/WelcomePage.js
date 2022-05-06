import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
} from 'react-native';
import React from 'react';
import Button from '../components/Button';

const WelcomePage = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../assets/images/CATETIN.png')}
        style={styles.image}
      />
      <Text style={styles.text}>CATETIN</Text>
      <Text style={styles.textP}>
        Applikasi untuk menulis dan mencatat apapun yang ingin anda tulis dan
        catat
      </Text>
      <Button text={'Sign Up'} bgColor={'black'} textColor={'white'} />
      <Button text={'Log In'} bgColor={'#F5F5F5'} textColor={'black'} />
    </SafeAreaView>
  );
};

export default WelcomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  text: {
    fontFamily: 'Poppins-Bold',
    fontSize: 50,
    color: 'black',
    marginTop: 40,
    marginBottom: 5,
    includeFontPadding: false,
  },
  textP: {
    includeFontPadding: false,
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    textAlign: 'center',
    color: 'black',
    marginHorizontal: 40,
    marginBottom: 40,
  },
});
