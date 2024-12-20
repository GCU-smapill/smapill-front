import React, { useContext } from 'react';
import { View, Image, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useRecoilValue } from 'recoil';
import { useSetRecoilState } from 'recoil';
import { userState } from '../state';
import { MedicineContext } from '../context/MedicineContext';

const Settings = ({ navigation }) => {
  const userInfo = useRecoilValue(userState);
  const setUserInfo = useSetRecoilState(userState);
  const { medicineSchedule ,updateMedicineSchedule } = useContext(MedicineContext);
  
  const handleLogout = () => {
    navigation.replace('Login'); // 로그인 화면으로 이동
    setUserInfo({}); // userInfo 초기화
  };

  const deleteAllSchedule = () =>{
    updateMedicineSchedule("delete");
    navigation.replace('Main'); // 로그인 화면으로 이동
  }

  return(
  <View style={styles.container}>
    <View style={styles.topBox}>
      <Text style={styles.topBoxText}>내정보</Text>
    </View>
    <View style={styles.userInfoContainer}>
      <View style={styles.userInfoInsideContainer}>
        <Image
          source={require('../default_user.jpg')}
          style={{
            borderColor:"grey",
            borderWidth:2,
            width:65,
            height:65,
            borderRadius:"50%",
            marginBottom:10
          }}
        />
        <TouchableOpacity style={{justifyContent:"center", alignItems:"center"}}>
          <Text style={{fontSize:20, fontWeight:600}}>{userInfo?.result?.name ? userInfo.result.name : "로딩 중"}</Text>
          <Text style={{fontSize:18, fontWeight:500, marginTop:2, color:"grey"}}>개인정보 수정</Text>
        </TouchableOpacity>
      </View>
        
    </View>
    <View style={styles.settingContainer}>
      <TouchableOpacity
        style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center", height:60 ,backgroundColor:"white", borderBottomColor:"#dee2e6", borderBottomWidth:2}}
        title="Logout" onPress={deleteAllSchedule}>
          <Text style={{fontSize:20, marginLeft:20, color:"black" }}>복용 일정 전체 삭제</Text>
          <MaterialCommunityIcons
            name='chevron-right'
            style={{fontSize:50}}
          />
      </TouchableOpacity>
      <TouchableOpacity
        style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center", height:60 ,backgroundColor:"white", borderBottomColor:"#dee2e6", borderBottomWidth:2}}
        title="Logout" onPress={handleLogout}>
          <Text style={{fontSize:20, marginLeft:20, color:"red" }}>로그아웃</Text>
          <MaterialCommunityIcons
            name='chevron-right'
            style={{fontSize:50}}
          />
      </TouchableOpacity>
    </View>
  </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  topBox:{
    flex:1.4,
    width:"100%",
    backgroundColor:"white",
    justifyContent:"flex-end",
    alignItems:"center",
    borderBottomColor:"#dee2e6",
    borderBottomWidth:2
  },
  topBoxText:{
    marginBottom:15,
    fontSize:21,
    fontWeight:600
  },
  userInfoContainer:{
    flex:1.8,
    width:"100%",
    backgroundColor:"white",
    borderBottomColor:"#dee2e6",
    borderBottomWidth:2,
  },
  userInfoInsideContainer:{
    width:"100%",
    height:"100%",
    justifyContent:"center",
    alignItems:"center"
  },
  settingContainer:{
    flex:7,
    width:"100%",
    
  },
});

export default Settings;