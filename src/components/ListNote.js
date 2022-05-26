import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import React from 'react';
import NoteIcon from '../assets/images/note.svg';
import {useNavigation} from '@react-navigation/native';
const ListNote = ({judul, isi}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.5}
      onPress={() => navigation.push('Note', {judul: judul, isi: isi})}>
      <View style={styles.iconContainer}>
        <NoteIcon width={40} height={40} fill={'black'} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{judul}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ListNote;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: '#f4f6f8',
    height: 60,
    borderRadius: 20,
    flexDirection: 'row',
    // alignItems: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: '#e6ecfc',
    width: 60,
  },
  textContainer: {
    paddingLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: 'black',
  },
});
