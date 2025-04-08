// app/screens/SettingsScreen.js
import React from 'react';
import { View, Text, Button } from 'react-native';
import useStore from '../store/useStore';

const SettingsScreen = ({ navigation }) => {
  const logout = useStore(state => state.logout);

  const handleLogout = () => {
    logout();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>설정 화면</Text>
      <Button title="로그아웃" onPress={handleLogout} />
    </View>
  );
};

export default SettingsScreen;
