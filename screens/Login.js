import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';


const Login = ({ navigation }) => {
  const handleLogin = () => {
    navigation.replace('Main'); // 로그인 성공 시 메인 화면으로 이동
  };

  return (
    <View style={styles.container}>
      <View style={styles.bgOrange}>
        <View style={styles.loginContainer}>
          <Text style={styles.descriptionTop}>스마필에 오신 것을 환영합니다.</Text>
          <Text style={styles.descriptionBottom}>스마트한 건강관리, 스마필과 함께</Text>
          <TextInput placeholder="전화번호" style={styles.input} />
          <TextInput placeholder="비밀번호" style={styles.input} secureTextEntry />
          <TouchableOpacity title="Login" onPress={handleLogin} style={styles.loginBtn}>
            <Text style={styles.loginBtnText}>로그인 하기</Text>
          </TouchableOpacity>
          <TouchableOpacity title="SignIn" onPress={handleLogin} style={styles.signInBtn}>
            <Text style={styles.signInBtnText}>회원 가입</Text>
          </TouchableOpacity>
          
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flexDirection:"column", alignItems: 'center' },
  bgOrange: {width:"100%", height:"77%", marginTop:"-10", borderRadius:"10%", backgroundColor: '#FF9131', justifyContent:"center", alignItems:"center"},
  loginContainer: {width:"90%", height:"90%", marginTop:"100%", borderRadius:"10%" ,backgroundColor:"white", justifyContent:"center", alignItems:"center"},
  descriptionTop:{fontSize:20, fontWeight:600, marginTop:-25 ,marginBottom:0,},
  descriptionBottom:{fontSize:20, fontWeight:500, color:"grey", marginBottom:50,},
  input: { backgroundColor:"#dee2e6", borderRadius:5 ,width: '85%', height: 50, borderBottomWidth: 0, marginBottom: 10, paddingLeft:10, fontSize:18},
  loginBtn:{backgroundColor:"#FF9131", borderRadius:5 ,width: '85%', height: 50, borderBottomWidth: 0,marginBottom: 10 , justifyContent:"center", alignItems:"center"},
  loginBtnText:{fontSize:"25", color:"white", fontWeight:"600"},
  signInBtn:{backgroundColor:"white", borderRadius:5, borderColor:"#FF9131", borderWidth:"1" ,width: '85%', height: 50, marginBottom: 10 , justifyContent:"center", alignItems:"center"},
  signInBtnText:{fontSize:"25", color:"#FF9131", fontWeight:"600"}
});

export default Login;
