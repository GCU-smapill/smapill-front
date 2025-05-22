import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState({ name: '', email: '', password: '' });

  const validate = () => {
    let valid = true;
    const newErrors = { name: '', email: '', password: '' };

    const nameRegex = /^[ㄱ-ㅎㅏ-ㅣ가-힣]{1,20}$/;
    const emailRegex = /^\w+@\w+\.\w+(\.\w+)?$/;
    const passwordRegex = /^[a-zA-Z0-9~!@#$%^&*()]{8,30}$/;

    if (!nameRegex.test(name)) {
      newErrors.name = '이름은 1~20자의 한글로 입력해주세요';
      valid = false;
    }

    if (!emailRegex.test(email)) {
      newErrors.email = '이메일 형식을 올바르게 입력해주세요';
      valid = false;
    }

    if (!passwordRegex.test(password) || password.length < 8 || password.length > 20) {
      newErrors.password = '비밀번호는 8~20자의 영어 대소문자, 숫자, 특수문자가 포함되어야 합니다';
      valid = false;
    }

    setErrors(newErrors);
    setIsValid(valid);
    return valid;
  };

  useEffect(() => {
    validate();
  }, [name, email, password]);


  const handleRegister = () => {
    if (validate()) {
      alert('회원가입 성공! (추후 서버 연동 예정)');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>회원 가입</Text>
      <Text style={styles.subtitle}>Smapill 사용을 위해 계정을 생성해주세요.</Text>

      <TextInput
        style={styles.input}
        placeholder="이름 (한글)"
        value={name}
        onChangeText={name => setName(name)}
        onBlur={validate}
      />
      {errors.name !== '' && <Text style={styles.errorText}>{errors.name}</Text>}

      <TextInput
        style={styles.input}
        placeholder="이메일 주소"
        value={email}
        onChangeText={email => setEmail(email)}
        onBlur={validate}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {errors.email !== '' && <Text style={styles.errorText}>{errors.email}</Text>}

      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        secureTextEntry
        value={password}
        onChangeText={password => setPassword(password)}
        onBlur={validate}
      />
      {errors.password !== '' && <Text style={styles.errorText}>{errors.password}</Text>}

      <TouchableOpacity 
        style={[styles.registerButton, !isValid && { backgroundColor: '#ccc' }]}
        onPress={handleRegister}
        disabled={!isValid}
      >
        <Text style={styles.registerButtonText}>사용자 등록하기</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.explainingText}>이미 계정이 있으신가요? </Text>
        <TouchableOpacity onPress={() => alert('계정 찾기 기능 준비 중')}>
          <Text style={styles.signupText}>계정 찾기</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack() }>
        <Text style={styles.backButtonText}>← 돌아가기</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpScreen;

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
  errorText: {
    color: 'red',
    marginBottom: 8,
    marginLeft: 4,
    fontSize: 14,
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
  },
  explainingText: {
    color: '#666',
    textAlign: 'center',
  },
  signupText: {
    color: '#007BFF',
    textAlign: 'center',
  },
  backButton: {
    alignItems: 'center',
    marginTop: 20,
  },
  backButtonText: {
    color: '#555',
    fontSize: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
});
