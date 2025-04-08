  // app/screens/LoginScreen.js
import React, { useState } from 'react';
import {
    View,
    Text, 
    TextInput, 
    StyleSheet, 
    Image, 
    TouchableOpacity, 
    Button, 
    Dimensions,
    Alert,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
 } from 'react-native';
import useStore from '../store/useStore';
import { loginAPI } from '../api/loginAPI';

{/*
    <View style={{ padding: 20 }}>
      <Text>이메일</Text>
      <TextInput value={email} onChangeText={setEmail} style={{ borderWidth: 1, marginBottom: 10 }} />
      <Text>비밀번호</Text>
      <TextInput value={password} onChangeText={setPassword} secureTextEntry style={{ borderWidth: 1, marginBottom: 10 }} />
      <Button title="로그인" onPress={handleLogin} />
    </View>
    */}

const { width, height } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
  const setUser = useStore(state => state.setUser);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await loginAPI(email, password);
      setUser(res.user);

      navigation.reset({
        index: 0,
        routes: [{ name: 'MainTabs' }],
      });
    } catch (error) {
      Alert.alert('로그인 실패', error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // iOS와 Android 대응
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.inner}
          keyboardShouldPersistTaps="handled"
        >
        <View style={styles.container}>
            <View style={styles.bgOrange}>
                <View style={{ width: "100%", height: "100%", alignItems: "center" }}>
                    <Image
                        source={require('../assets/icon.png')}
                        style={{ marginTop: "17%", width: 90, height: 90, borderRadius: 30 }}
                    />
                    <Text style={{ fontSize: 25, color: "white" }}>smapill</Text>
                    <View style={styles.loginContainer}>
                        <Text style={styles.descriptionTop}>스마필에 오신 것을 환영합니다.</Text>
                        <Text style={styles.descriptionBottom}>스마트한 건강관리, 스마필과 함께</Text>
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
                        <TouchableOpacity title="Login" onPress={handleLogin} style={styles.loginBtn}>
                        <Text style={styles.loginBtnText}>로그인 하기</Text>
                        </TouchableOpacity>
                        <TouchableOpacity title="SignIn" onPress={handleLogin} style={styles.signInBtn}>
                        <Text style={styles.signInBtnText}>회원 가입</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
    container: { flex:1,flexDirection: "column", alignItems: 'center', width: `${width}`, height: `${height}` },
    bgOrange: {
      width: "100%", height: "60%", marginTop: -10, borderRadius: 10,
      backgroundColor: '#FF9131', justifyContent: "center", alignItems: "center"
    },
    loginContainer: {
      width: "90%", height: "90%", marginTop: "5%", borderRadius: 10,
      backgroundColor: "white", justifyContent: "center", alignItems: "center"
    },
    descriptionTop: { fontSize: 20, fontWeight: "600", marginTop: -35 },
    descriptionBottom: { fontSize: 20, fontWeight: "500", color: "grey", marginBottom: 50 },
    input: {
      backgroundColor: "#dee2e6", borderRadius: 5, width: '85%', height: 50,
      marginBottom: 10, paddingLeft: 10, fontSize: 18
    },
    loginBtn: {
      backgroundColor: "#FF9131", borderRadius: 5, width: '85%', height: 50,
      marginBottom: 10, justifyContent: "center", alignItems: "center"
    },
    loginBtnText: { fontSize: 25, color: "white", fontWeight: "600" },
    signInBtn: {
      backgroundColor: "white", borderRadius: 5, borderColor: "#FF9131", borderWidth: 1,
      width: '85%', height: 50, marginBottom: 10, justifyContent: "center", alignItems: "center"
    },
    signInBtnText: { fontSize: 25, color: "#FF9131", fontWeight: "600" }
  });
  

export default LoginScreen;
