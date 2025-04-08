// app/screens/ScheduleScreen.js
import React from 'react';
import { View, Text } from 'react-native';
import useStore from '../store/useStore';

const ScheduleScreen = () => {
  const user = useStore(state => state.user);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20 }}>복약 스케줄</Text>
      <Text>{user ? `${user.name}님의 복약 일정입니다.` : '유저 정보 없음'}</Text>
    </View>
  );
};

export default ScheduleScreen;
