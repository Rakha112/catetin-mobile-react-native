import {StyleSheet, Text} from 'react-native';
import React from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  Easing,
  withTiming,
} from 'react-native-reanimated';
import Ripple from 'react-native-material-ripple';
const Button = ({text, bgColor, textColor, submit}) => {
  const scaleValue = useSharedValue(1);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withTiming(scaleValue.value, {
            duration: 200,
            easing: Easing.out(Easing.exp),
          }),
        },
      ],
    };
  });
  return (
    <Animated.View style={animatedStyles}>
      <Ripple
        onPressIn={() => {
          scaleValue.value = 0.95;
        }}
        onPressOut={() => {
          scaleValue.value = 1;
        }}
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
    </Animated.View>
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
