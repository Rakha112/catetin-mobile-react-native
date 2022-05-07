import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Ripple from 'react-native-material-ripple';
const Button = ({text, bgColor, textColor, submit}) => {
  const navigation = useNavigation();
  return (
    <Ripple
      rippleColor={text === 'Sign Up' ? 'rgb(255,255,255)' : 'rgb(0, 0, 0)'}
      style={[styles.container, {backgroundColor: bgColor}]}
      activeOpacity={0.5}
      onPress={() => {
        submit();
      }}>
      {/* <View > */}
      <Text style={[styles.text, {color: textColor}]}>{text}</Text>
      {/* </View> */}
    </Ripple>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    width: 330,
    height: 60,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    overflow: 'hidden',
  },
  text: {
    fontFamily: 'Poppins-Regular',
    fontSize: 20,
  },
});
