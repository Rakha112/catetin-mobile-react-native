import {StyleSheet, Image} from 'react-native';
import React from 'react';
import Ripple from 'react-native-material-ripple';
import {useNavigation} from '@react-navigation/native';
const ButtonNewNote = () => {
  const navigation = useNavigation();
  return (
    <Ripple
      style={styles.container}
      onPress={() => {
        navigation.push('NewNote');
      }}>
      <Image
        source={require('../assets/images/plus.png')}
        style={styles.image}
      />
    </Ripple>
  );
};

export default ButtonNewNote;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#d1e8fc',
    position: 'absolute',
    padding: 15,
    borderRadius: 20,
    bottom: 20,
    right: 20,
    overflow: 'hidden',
  },
  image: {
    resizeMode: 'contain',
    width: 40,
    height: 40,
  },
});
