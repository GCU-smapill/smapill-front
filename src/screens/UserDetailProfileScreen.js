import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { deleteUserInfo, getUserInfo } from '../apis/userAPi';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import useUserStore from '../store/useUserStore';

const UserDetailProfileScreen = () => {
  const [name, setName] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [userId, setUserId] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();
 

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
          const response = await getUserInfo();
          const data = response.result;

          console.log("유저정보", data);

          setName(data.name);
          setCreatedAt(dayjs(data.createdAt).format("YYYY년 M월 D일"));
          setUserId(data.userId);
          setPhoneNumber(data.phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3"))
          setEmail(data.email)
        } catch (error) {
          console.error('유저 정보 조회 실패:', error);
        } finally {
          setLoading(false); // 로딩 종료
      }
    };

    fetchUserInfo();
  },[])

  const handleUserDelete = () => {
    try {
      const { data } = deleteUserInfo(); // 회원탈퇴 API 호출
      const result = data

      console.log("탈퇴 성공", result)

      // ✅ 로그인 화면으로 이동 (Stack 내 기록 초기화)
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });

    } catch (error) {
      console.log("회원탈퇴 오류", error);
      Alert.alert("탈퇴 실패", "탈퇴하지 못했습니다.");
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.emptyState}>
          <ActivityIndicator size="large" color="orange" />
          <Text>불러오는 중...</Text>
        </View>
      ) : (
        <>
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

          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>사용자 전화번호</Text>
            <Text style={styles.infoText}>{phoneNumber}</Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoLabel}>이메일 주소</Text>
            <Text style={styles.infoText}>{email}</Text>
          </View>

          <View style={{ flexDirection: "row", justifyContent: "space-between", width: "80%" }}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>수정하기</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.deleteButton}
              onPress={handleUserDelete}
            >
              <Text style={styles.buttonText}>회원탈퇴</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
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
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    marginTop: 40,
    backgroundColor: 'red',
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
