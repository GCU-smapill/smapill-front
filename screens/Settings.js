import React, { useContext } from 'react';
import { View, Image, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { UserContext } from '../context/UserContext';

const Settings = ({ navigation }) => {
  
  const user = useContext(UserContext)

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
          <Text style={{fontSize:20, fontWeight:600}}>{user}</Text>
          <Text style={{fontSize:18, fontWeight:500, marginTop:2, color:"grey"}}>개인정보 수정</Text>
        </TouchableOpacity>
      </View>
        
    </View>
    <View style={styles.settingContainer}>
      <TouchableOpacity
        style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center", height:60 ,backgroundColor:"white", borderBottomColor:"#dee2e6", borderBottomWidth:2}}
        title="Logout" onPress={() => navigation.replace('Login')}>
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