import React, { useState } from 'react';
import {
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import useStore from '../store/useStore';
import { loginAPI } from '../apis/loginAPI';
import { postSignin } from '../apis/userAPi';

const LoginForm = ({ onSuccess }) => {

  const setToken = useStore((state) => state.setToken);
  const fetchAndSetUserInfo = useStore((state) => state.fetchAndSetUserInfo);

  const [userId, setId] = useState('jskim6335');
  const [password, setPassword] = useState('6335asdf');

  const handleLoginOrigin = async () => {
    try {
      const res = await loginAPI(userId, password);
  
      // 1️⃣ 로그인 상태 저장
      login(res.user);
  
      // 2️⃣ users 배열에 사용자 추가 (중복 방지)
      const exists = users.find(u => u.id === res.user.id);
      if (!exists) {
        addUser(res.user);   // user 객체 그대로 추가
      }
  
      // 3️⃣ 성공 콜백 실행
      onSuccess.onSuccess();
    } catch (error) {
      Alert.alert('로그인 실패', error.message);
    }
  };

  const handleLogin = async () => {
    try {
      console.log('🚀 로그인 시도:', { userId, password });

      const res = await postSignin({ userId, password });

      const accessToken = res.result.accessToken;
      console.log('✅ 토큰 수신:', accessToken);

      await setToken(accessToken);

      await fetchAndSetUserInfo();

      // ✅ Zustand에서 저장된 값 바로 확인
      const state = useStore.getState();
      console.log('🧾 Zustand 상태 확인:', {
        accessToken: state.accessToken,
        loggedInAccount: state.loggedInAccount,
      });

      onSuccess.onSuccess();
    } catch (error) {
      console.error('❌ 로그인 오류:', error);
      Alert.alert('로그인 실패', error?.response?.data?.message || '아이디 또는 비밀번호를 확인해주세요.');
    }
  };

  const handleSignUp = () => {
    onSuccess.onSignUp()
  }

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
