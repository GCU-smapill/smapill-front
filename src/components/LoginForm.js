import React, { useState } from 'react';
import {
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import useStore from '../store/useStore';
import { loginAPI } from '../api/loginAPI';

const LoginForm = ({ onSuccess }) => {
  const login = useStore((state) => state.login);
  const addUser = useStore((state) => state.addUser)
  const users = useStore((state) => state.users);

  const [email, setEmail] = useState('jskim6335@naver.com');
  const [password, setPassword] = useState('6335asdf');

  const handleLogin = async () => {
    try {
      const res = await loginAPI(email, password);
  
      // 1️⃣ 로그인 상태 저장
      login(res.user);
  
      // 2️⃣ users 배열에 사용자 추가 (중복 방지)
      const exists = users.find(u => u.id === res.user.id);
      if (!exists) {
        addUser(res.user);   // user 객체 그대로 추가
      }
  
      // 3️⃣ 성공 콜백 실행
      onSuccess?.();
    } catch (error) {
      Alert.alert('로그인 실패', error.message);
    }
  };

  return (
    <>
      <TextInput
        placeholder="아이디"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
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
});

export default LoginForm;
