import React, { useState } from 'react';
import {
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import useUserStore from '../store/useUserStore';
import { postSignin } from '../apis/userAPi';

const LoginForm = ({ onSuccess }) => {
  const setToken = useUserStore((state) => state.setToken);
  const fetchAndSetUserInfo = useUserStore((state) => state.fetchAndSetUserInfo);
  const fetchGuardianUserInfo = useUserStore((state) => state.fetchGuardianUserInfo);

  const [userId, setId] = useState('jskim6335');
  const [password, setPassword] = useState('6335asdf');

  const handleLogin = async () => {
    try {
      console.log('🚀 로그인 시도:', { userId, password });

      // 1️⃣ 로그인 API 요청
      const res = await postSignin({ userId, password });
      const accessToken = res.result.accessToken;
      console.log('✅ 토큰 수신:', accessToken);

      // 2️⃣ accessToken 저장
      await setToken(accessToken);

      // 3️⃣ 유저 정보 상태 저장 (로그인 계정)
      await fetchAndSetUserInfo();

      // 4️⃣ 피보호자 정보도 users 배열에 추가
      await fetchGuardianUserInfo();

      // 5️⃣ 상태 확인 로그 (선택)
      const state = useUserStore.getState();
      console.log('🧾 Zustand 상태 확인:', {
        accessToken: state.accessToken,
        loggedInUserInfo: state.loggedInUserInfo,
        users: state.users,
      });

      // 6️⃣ 로그인 성공 콜백 실행
      onSuccess.onSuccess();
    } catch (error) {
      console.error('❌ 로그인 오류:', error);
      Alert.alert('로그인 실패', error?.response?.data?.message || '아이디 또는 비밀번호를 확인해주세요.');
    }
  };

  const handleSignUp = () => {
    onSuccess.onSignUp();
  };

  return (
    <>
      <TextInput
        placeholder="아이디"
        style={styles.input}
        value={userId}
        onChangeText={setId}
      />
      <TextInput
        placeholder="비밀번호"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity onPress={handleLogin} style={styles.loginBtn}>
        <Text style={styles.loginBtnText}>로그인 하기</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSignUp} style={styles.signUpBtn}>
        <Text style={styles.signUpBtnText}>회원가입 하기</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#dee2e6',
    borderRadius: 5,
    width: '85%',
    height: 50,
    marginBottom: 10,
    paddingLeft: 10,
    fontSize: 18,
  },
  loginBtn: {
    backgroundColor: '#FF9131',
    borderRadius: 5,
    width: '85%',
    height: 50,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginBtnText: {
    fontSize: 25,
    color: 'white',
    fontWeight: '600',
  },
  signUpBtn: {
    backgroundColor: 'white',
    borderRadius: 5,
    borderColor: "#FF9131",
    borderWidth: 1,
    width: '85%',
    height: 50,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpBtnText: {
    fontSize: 25,
    color: '#FF9131',
    fontWeight: '600',
  }
});

export default LoginForm;
