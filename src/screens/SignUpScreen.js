import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert } from 'react-native';
import { postSignup } from '../apis/userAPi';

const SignUpScreen = ({ navigation }) => {
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState({ userId: '', name: '', email: '', password: '', phoneNumber: '' });

  const validate = () => {
    let valid = true;
    const newErrors = { userId: '', name: '', email: '', password: '', phoneNumber: '' };

    const nameRegex = /^[ㄱ-ㅎㅏ-ㅣ가-힣]{1,20}$/;
    const emailRegex = /^\w+@\w+\.\w+(\.\w+)?$/;
    const passwordRegex = /^[a-zA-Z0-9~!@#$%^&*()]{8,30}$/;
    const phoneRegex = /^010\d{8}$/;
    const userIdRegex = /^[a-zA-Z0-9_.-]{4,20}$/;

    if (!userIdRegex.test(userId)) {
      newErrors.userId = '아이디는 영문, 숫자, 특수문자(._-) 포함 4~20자여야 합니다';
      valid = false;
    }

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

    if (!phoneRegex.test(phoneNumber)) {
      newErrors.phoneNumber = '휴대폰 번호는 010으로 시작하는 11자리 숫자여야 합니다';
      valid = false;
    }

    setErrors(newErrors);
    setIsValid(valid);
    return valid;
  };

  useEffect(() => {
    validate();
  }, [userId, name, email, password, phoneNumber]);

  const handleRegister = async () => {
    if (!validate()) return;

    try {
      const response = await postSignup({
        userId,
        name,
        email,
        password,
        phoneNumber,
      });

      console.log("✅ 서버 응답 데이터:", response);
      Alert.alert("회원가입 성공!" ,"로그인 페이지로 이동합니다.");
      navigation.navigate('Login');
    } catch (error) {
      if (error.response?.status === 409) {
        Alert.alert('이미 존재하는 이메일 또는 아이디입니다.');
      }

      console.log("회원가입 실패", error);
      Alert.alert("회원가입 실패!","다시 시도해주세요.");
    }
  };

  return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.TotalContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <Text style={styles.title}>회원 가입</Text>
            <Text style={styles.subtitle}>Smapill 사용을 위해 계정을 생성해주세요.</Text>

            <TextInput
              style={styles.input}
              placeholder="아이디"
              value={userId}
              onChangeText={setUserId}
              onBlur={validate}
            />
            {errors.userId !== '' && <Text style={styles.errorText}>{errors.userId}</Text>}

            <TextInput
              style={styles.input}
              placeholder="이름 (한글)"
              value={name}
              onChangeText={setName}
              onBlur={validate}
            />
            {errors.name !== '' && <Text style={styles.errorText}>{errors.name}</Text>}

            <TextInput
              style={styles.input}
              placeholder="이메일 주소"
              value={email}
              onChangeText={setEmail}
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
              onChangeText={setPassword}
              onBlur={validate}
            />
            {errors.password !== '' && <Text style={styles.errorText}>{errors.password}</Text>}

            <TextInput
              style={styles.input}
              placeholder="휴대폰 번호 (예: 01012345678)"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="number-pad"
              onBlur={validate}
            />
            {errors.phoneNumber !== '' && <Text style={styles.errorText}>{errors.phoneNumber}</Text>}

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

            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <Text style={styles.backButtonText}>← 돌아가기</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>

  );
};

export default SignUpScreen;


const styles = StyleSheet.create({
  TotalContainer: {
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
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
