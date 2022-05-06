import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  ScrollView,
} from 'react-native';
import React, {useCallback, useRef} from 'react';
import Dot from '../assets/images/three-dots-vertical-svgrepo-com.svg';
import ListNote from '../components/ListNote';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import LogOutIcon from '../assets/images/log-out-svgrepo-com.svg';
import Ripple from 'react-native-material-ripple';
import ButtonNewNote from '../components/ButtonNewNote';
const HomePage = () => {
  const bottomSheetRef = useRef(null);
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
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.user}>
          <Image
            source={require('../assets/images/user.png')}
            style={styles.image}
          />
          <Text style={styles.nama}>Rakha</Text>
        </View>
        <Ripple
          onPress={() => bottomSheetRef.current.expand()}
          style={styles.threeDots}>
          <Dot width={25} height={25} fill={'black'} />
        </Ripple>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ListNote />
        <ListNote />
        <ListNote />
        <ListNote />
        <ListNote />
        <ListNote />
        <ListNote />
        <ListNote />
        <ListNote />
        <ListNote />
        <ListNote />
        <ListNote />
        <ListNote />
        <ListNote />
        <ListNote />
      </ScrollView>
      <ButtonNewNote />
      <BottomSheet
        enablePanDownToClose={true}
        index={-1}
        ref={bottomSheetRef}
        snapPoints={[100, 100]}
        backdropComponent={renderBackdrop}>
        <View style={styles.bottomSheetContainer}>
          <Ripple style={styles.tombol}>
            <LogOutIcon width={40} height={40} style={{marginHorizontal: 20}} />
            <Text
              style={{
                fontFamily: 'Poppins-Medium',
                fontSize: 20,
                color: 'black',
              }}>
              Log Out
            </Text>
          </Ripple>
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default HomePage;

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
  user: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  image: {
    resizeMode: 'contain',
    width: 30,
    height: 30,
  },
  nama: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: 'black',
    marginLeft: 10,
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
});
