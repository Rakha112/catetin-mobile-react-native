/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
} from 'react-native';
import React from 'react';
import Button from '../components/Button';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import Animated, {FadeInUp} from 'react-native-reanimated';
const WelcomePage = () => {
  const navigation = useNavigation();
  const loginHandle = () => {
    navigation.push('Login');
  };
  const signupHandle = () => {
    navigation.push('Signup');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View entering={FadeInUp}>
        <Image
          source={require('../assets/images/CATETIN.png')}
          style={styles.image}
        />
      </Animated.View>
      <Animated.View
        entering={FadeInUp.delay(100)}
        style={{alignItems: 'center'}}>
        <Text style={styles.text}>CATETIN</Text>
        <Text style={styles.textP}>
          Applikasi untuk menulis dan mencatat apapun yang ingin anda tulis dan
          catat
        </Text>
      </Animated.View>
      <Animated.View entering={FadeInUp.delay(200)}>
        <Button
          text={'Sign Up'}
          bgColor={'black'}
          textColor={'white'}
          submit={signupHandle}
        />
      </Animated.View>
      <Animated.View entering={FadeInUp.delay(300)}>
        <Button
          text={'Log In'}
          bgColor={'#F5F5F5'}
          textColor={'black'}
          submit={loginHandle}
        />
      </Animated.View>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  return {
    loggedin: state.loggedin,
  };
};
export default connect(mapStateToProps)(WelcomePage);

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
