import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { getUserInfo } from '../apis/userAPi';

const UserDetailProfileScreen = () => {
  const [name, setName] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [userId, setUserId] = useState('');


  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await getUserInfo();
        const data = response.result;

        console.log("유저정보", data);

        setName(data.name);
        setCreatedAt(data.createdAt);
        setUserId(data.userId);
      } catch (error) {
        console.error('유저 정보 조회 실패:', error);
      }
    };

    fetchUserInfo();
  },[])

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/default_user.jpg')}
        style={styles.profileImage}
      />

      <View style={styles.textContainer}>
        <Text style={styles.nameText}>{name}</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoLabel}>가입일</Text>
        <Text style={styles.infoText}>{createdAt}</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoLabel}>사용자 아이디</Text>
        <Text style={styles.infoText}>{userId}</Text>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>수정하기</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserDetailProfileScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 80,
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 999,
    borderColor: 'grey',
    borderWidth: 1,
    marginBottom: 10,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  nameText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  editText: {
    fontSize: 16,
    color: 'grey',
  },
  infoBox: {
    width: '90%',
    padding: 20,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  infoLabel: {
    fontSize: 15,
    color: '#888',
    marginBottom: 6,
  },
  infoText: {
    fontSize: 17,
    fontWeight: '500',
  },
  button: {
    marginTop: 40,
    backgroundColor: 'orange',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
  },
});
