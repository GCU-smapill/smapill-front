// components/UserProfile.js
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const UserProfile = ({ name }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/default_user.jpg')}
        style={styles.image}
      />
      <TouchableOpacity
        style={styles.textContainer}
        onPress={() => navigation.navigate('UserDetailProfileScreen')}>
        <Text style={styles.nameText}>{name ?? '로딩 중'}</Text>
        <Text style={styles.editText}>상세정보 보기</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  image: {
    borderColor: 'grey',
    borderWidth: 2,
    width: 65,
    height: 65,
    borderRadius: 999,
    marginBottom: 10,
  },
  textContainer: {
    alignItems: 'center',
  },
  nameText: {
    fontSize: 20,
    fontWeight: '600',
  },
  editText: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 2,
    color: 'grey',
  },
});
