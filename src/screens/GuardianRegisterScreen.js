import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Directions } from 'react-native-gesture-handler';

const GuardianRegisterScreen = () => {
  const navigation = useNavigation();
  const [guardianId, setGuardianId] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    // 나중에 로그인 기능 연결 예정
    alert('보호자 등록 기능은 추후 구현됩니다!');
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
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>보호자 등록하기</Text>
      </TouchableOpacity>
      
      <View style={{display:"flex", flexDirection:"row", justifyContent:"center", marginTop: 10}}>
        <Text style={styles.explainingText}>보호자 계정이 없으신가요? </Text>
        <TouchableOpacity onPress={() => alert('회원가입 페이지로 이동 예정!')}>
          <Text style={styles.signupText}>회원가입</Text>
        </TouchableOpacity>
      </View>


      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
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
