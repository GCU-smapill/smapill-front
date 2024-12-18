import React, { useState } from 'react';
import {
  View,
  Text, 
  TextInput, 
  Image, 
  StyleSheet, 
  TouchableOpacity, 
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import { useSetRecoilState } from 'recoil';
import { userState } from '../state';


const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const setUser = useSetRecoilState(userState);
  
  const handleLogin = async () => {
    // 빈 칸 확인
    if (!username.trim()) {
      Alert.alert('입력 오류', '아이디를 입력해주세요.');
      return;
    }

    if (!password.trim()) {
      Alert.alert('입력 오류', '비밀번호를 입력해주세요.');
      return;
    }

    try {
      const LoginResponse = await fetch('http://134.185.109.176:8080/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: username, password }),
      });

      let loginResponse

      try{
        loginResponse = await LoginResponse.json();
      }catch{
        loginResponse = {"isSuccess":false}
      }

      if (loginResponse.isSuccess) {
        const token = loginResponse.result.accessToken;

        // 유저 정보 가져오기
        const userResponse = await fetch('http://134.185.109.176:8080/user/', {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        });

        const userData = await userResponse.json();
        console.log('User Data:', userData);
        setUser(userData); // Recoil 상태 업데이트
        Alert.alert('로그인 성공', `${userData.result.name}님 환영합니다!`);
        navigation.replace('Main');
      } else {
        Alert.alert('로그인 실패', loginResponse.message || '아이디 또는 비밀번호를 확인해주세요.');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('에러 발생', '서버와의 통신에 실패했습니다.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.bgOrange}>
        <View style={{width:"100%", height:"100%", alignItems:"center"}}>
          <Image
            source={require('../assets/icon.png')}
            style={{marginTop:"30%", width:'90', height:"90", borderRadius:"30%"}}
          />
          <Text style={{fontSize:25, color:"white"}}>smapill</Text>
          <View style={styles.loginContainer}>
            <Text style={styles.descriptionTop}>스마필에 오신 것을 환영합니다.</Text>
            <Text style={styles.descriptionBottom}>스마트한 건강관리, 스마필과 함께</Text>
            <TextInput 
              placeholder="아이디"
              style={styles.input}
              value={username}
              onChangeText={setUsername}  
            />
            <TextInput
              placeholder="비밀번호"
              style={styles.input} 
              value={password}
              onChangeText={setPassword}
              secureTextEntry />
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
  );
};

const styles = StyleSheet.create({
  container: {flexDirection:"column", alignItems: 'center' },
  bgOrange: {width:"100%", height:"77%", marginTop:"-10", borderRadius:"10%", backgroundColor: '#FF9131', justifyContent:"center", alignItems:"center"},
  loginContainer: {width:"90%", height:"90%", marginTop:"5%", borderRadius:"10%" ,backgroundColor:"white", justifyContent:"center", alignItems:"center"},
  descriptionTop:{fontSize:20, fontWeight:600, marginTop:-35,marginBottom:0,},
  descriptionBottom:{fontSize:20, fontWeight:500, color:"grey", marginBottom:50,},
  input: { backgroundColor:"#dee2e6", borderRadius:5 ,width: '85%', height: 50, borderBottomWidth: 0, marginBottom: 10, paddingLeft:10, fontSize:18},
  loginBtn:{backgroundColor:"#FF9131", borderRadius:5 ,width: '85%', height: 50, borderBottomWidth: 0,marginBottom: 10 , justifyContent:"center", alignItems:"center"},
  loginBtnText:{fontSize:"25", color:"white", fontWeight:"600"},
  signInBtn:{backgroundColor:"white", borderRadius:5, borderColor:"#FF9131", borderWidth:"1" ,width: '85%', height: 50, marginBottom: 10 , justifyContent:"center", alignItems:"center"},
  signInBtnText:{fontSize:"25", color:"#FF9131", fontWeight:"600"}
});

export default Login;
