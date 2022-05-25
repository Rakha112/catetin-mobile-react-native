import {StyleSheet, View} from 'react-native';
import React from 'react';
import ContentLoader, {Rect} from 'react-content-loader/native';
const Skeleton = () => {
  const MyLoader = () => (
    <ContentLoader viewBox="0 0 380 70" speed={3}>
      <Rect x="0" y="0" rx="20" ry="20" width="100%" height="60" />
    </ContentLoader>
  );
  return (
    <>
      <View style={styles.container}>
        <MyLoader />
      </View>
      <View style={styles.container}>
        <MyLoader />
      </View>
      <View style={styles.container}>
        <MyLoader />
      </View>
      <View style={styles.container}>
        <MyLoader />
      </View>
      <View style={styles.container}>
        <MyLoader />
      </View>
      <View style={styles.container}>
        <MyLoader />
      </View>
    </>
  );
};

export default Skeleton;

const styles = StyleSheet.create({
  container: {height: 75, marginHorizontal: 20},
});
