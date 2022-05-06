import {
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  SafeAreaView,
  TouchableWithoutFeedback,
  TextInput,
} from 'react-native';
import React, {useRef, useCallback, useState} from 'react';
import Ripple from 'react-native-material-ripple';
import Arrow from '../assets/images/right-arrow-svgrepo-com.svg';
import Dot from '../assets/images/three-dots-vertical-svgrepo-com.svg';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {useNavigation} from '@react-navigation/native';
import EditIcon from '../assets/images/edit-svgrepo-com.svg';
import DeleteIcon from '../assets/images/trash-alt-delete-bin-svgrepo-com.svg';
import SaveIcon from '../assets/images/save-svgrepo-com.svg';
const NotePage = () => {
  const navigaton = useNavigation();
  const bottomSheetRef = useRef(null);
  const isiRef = useRef(null);
  const [editable, setEditable] = useState(false);
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
  const coba = () => {
    <Ripple
      style={styles.tombol}
      onPress={() => {
        setEditable(true);
        bottomSheetRef.current.close();
      }}>
      <SaveIcon
        width={30}
        height={30}
        fill={'black'}
        style={{marginHorizontal: 20}}
      />
      <Text style={styles.textButton}>Save</Text>
    </Ripple>;
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableWithoutFeedback
          onPress={() => {
            navigaton.pop();
            isiRef.current.blur();
          }}>
          <View style={styles.arrow}>
            <Arrow width={20} height={20} fill={'#000000'} />
          </View>
        </TouchableWithoutFeedback>
        <Ripple
          onPress={() => {
            bottomSheetRef.current.expand();
            isiRef.current.blur();
          }}
          style={styles.threeDots}>
          <Dot width={25} height={25} fill={'black'} />
        </Ripple>
      </View>
      <Text
        style={[
          styles.textInput,
          {borderBottomWidth: 1, borderBottomColor: 'grey', paddingBottom: 10},
        ]}>
        Judul...
      </Text>
      <TextInput
        editable={editable}
        ref={isiRef}
        placeholder="Isikan note di sini..."
        defaultValue={'isi'}
        multiline={true}
        style={[
          styles.textInput,
          {textAlignVertical: 'top', maxHeight: '80%', height: '80%'},
        ]}
      />
      <BottomSheet
        enablePanDownToClose={true}
        index={-1}
        ref={bottomSheetRef}
        snapPoints={[150, 150]}
        backdropComponent={renderBackdrop}>
        <View style={styles.bottomSheetContainer}>
          {editable ? (
            <Ripple
              style={styles.tombol}
              onPress={() => {
                setEditable(false);
                bottomSheetRef.current.close();
              }}>
              <SaveIcon
                width={30}
                height={30}
                fill={'black'}
                style={{marginHorizontal: 20}}
              />
              <Text style={styles.textButton}>Save</Text>
            </Ripple>
          ) : (
            <Ripple
              style={styles.tombol}
              onPress={() => {
                setEditable(true);
                bottomSheetRef.current.close();
              }}>
              <EditIcon
                width={30}
                height={30}
                fill={'black'}
                style={{marginHorizontal: 20}}
              />
              <Text style={styles.textButton}>Edit</Text>
            </Ripple>
          )}
          <Ripple style={styles.tombol}>
            <DeleteIcon width={30} height={30} style={{marginHorizontal: 20}} />
            <Text style={styles.textButton}>Delete</Text>
          </Ripple>
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default NotePage;

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
  arrow: {
    transform: [{rotateY: '180deg'}],
    borderRadius: 50,
    padding: 5,
    overflow: 'hidden',
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
  textInput: {
    marginHorizontal: 40,
    fontFamily: 'Pippins-Regular',
    fontSize: 18,
    color: 'black',
  },
  textButton: {
    fontFamily: 'Poppins-Medium',
    fontSize: 20,
    color: 'black',
  },
});
