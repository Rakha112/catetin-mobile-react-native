import {StyleSheet, Text, View, Button} from 'react-native';
import React, {useEffect, useState} from 'react';
import Toast from 'react-native-toast-message';

const CobaPage = () => {
  const [rubah, setRubah] = useState(true);
  useEffect(() => {
    if (rubah) {
      setRubah(false);
    } else {
      console.log('HALOOO');
    }
    // setRubah(false);
  }, [rubah]);

  return (
    <View style={styles.container}>
      <Button
        title="SUKSES"
        onPress={() => {
          setRubah(true);
          Toast.show({
            type: 'sukses',
            text1: 'Isikan nama kota terlebih dahulu...',
            visibilityTime: 2000,
          });
        }}
      />
      <Button
        title="GAGAL"
        onPress={() => {
          Toast.show({
            type: 'gagal',
            text1: 'Isikan nama kota terlebih dahulu...',
            visibilityTime: 2000,
          });
        }}
      />
      <Button
        title="WARNING"
        onPress={() => {
          Toast.show({
            type: 'warning',
            text1: 'Isikan nama kota terlebih dahulu...',
            visibilityTime: 2000,
          });
        }}
      />
    </View>
  );
};

export default CobaPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
