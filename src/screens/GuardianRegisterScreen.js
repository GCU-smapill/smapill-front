import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { postUserLink } from '../apis/userLinkAPI';
import useUserStore from '../store/useUserStore';

const GuardianRegisterScreen = () => {
  const navigation = useNavigation();
  const fetchGuardianUserInfo = useUserStore((state) => state.fetchGuardianUserInfo);
  const [guardianId, setGuardianId] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!guardianId || !password) {
      Alert.alert('입력 오류', '보호자 ID와 비밀번호를 모두 입력해주세요.');
      return;
    }

    try {
      setLoading(true);
      const response = await postUserLink({ userId: guardianId, password });
      console.log('보호자 연동 성공:', response);
      await fetchGuardianUserInfo()

      Alert.alert('성공', '보호자 계정이 성공적으로 연동되었습니다.', [
        {
          text: '확인',
          onPress: () => {
            navigation.replace('GuardianManage')
          
          }
        },
      ]);
    } catch (error) {
      console.error('보호자 연동 실패:', error);
      Alert.alert('실패', '보호자 연동에 실패했습니다. 아이디/비밀번호를 다시 확인해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>보호자 등록</Text>
      <Text style={styles.subtitle}>귀하의 보호자 계정으로 로그인해주세요.</Text>

      <TextInput
        style={styles.input}
        placeholder="보호자 ID"
        value={guardianId}
        onChangeText={setGuardianId}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister} disabled={loading}>
        <Text style={styles.registerButtonText}>{loading ? '등록 중...' : '보호자 등록하기'}</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
        <Text style={styles.explainingText}>보호자 계정이 없으신가요? </Text>
        <TouchableOpacity onPress={() => Alert.alert('준비 중', '회원가입 페이지로 이동 예정입니다.')}>
          <Text style={styles.signupText}>회원가입</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.replace('GuardianManage')}>
        <Text style={styles.backButtonText}>← 돌아가기</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GuardianRegisterScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    padding: 19,
    fontSize: 19,
    marginBottom: 10,
  },
  registerButton: {
    backgroundColor: '#FF9131',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 15,
  },
  registerButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'thin',
  },
  explainingText: {
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  signupText: {
    color: '#007BFF',
    textAlign: 'center',
    marginBottom: 30,
  },
  backButton: {
    alignItems: 'center',
  },
  backButtonText: {
    color: '#555',
    fontSize: 20,
  },
});
