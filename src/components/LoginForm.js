// components/LoginForm.js
import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import useStore from '../store/useStore';
import { loginAPI } from '../api/loginAPI';

const LoginForm = ({ onSuccess }) => {
  const setUser = useStore((state) => state.setUser);
  const addUser = useStore((state) => state.addUser);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await loginAPI(email, password);

      // 로그인 성공 시
      setUser(res.user);          // 로그인 상태 저장
      addUser(res.user.name);     // 사용자 목록에도 추가

      onSuccess?.();              // 로그인 성공 후 처리 (navigation 등)
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
