// app/screens/HomeScreen.js
import React from 'react';
import { View, Text } from 'react-native';
import useStore from '../store/useStore';
import UserSwitcher from '../components/UserSwitcher';

const HomeScreen = () => {
  const user = useStore(state => state.user);

  return (
    <View style={{ padding: 20 }}>
      <UserSwitcher />
      <Text style={{ fontSize: 20 }}>홈 화면</Text>
      {user && <Text>{user.name} 님, 환영합니다!</Text>}
    </View>
  );
};

export default HomeScreen;
