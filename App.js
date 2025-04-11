import React, { useEffect } from 'react';
import { Alert, Linking, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PushNotification from 'react-native-push-notification';

import LoginScreen from './src/screens/LoginScreen';
import MainTabs from './src/navigation/MainTabs';

const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {
    // 1. 알림 채널 생성 (Android에서 반드시 필요)
    PushNotification.createChannel(
      {
        channelId: 'medication-channel',
        channelName: '복약 알림',
        importance: 4,
        vibrate: true,
      },
      (created) => console.log(`알림 채널 생성됨: ${created}`)
    );

    // 2. Android 12+ 이상에서 정확한 알람 권한 안내
    if (Platform.OS === 'android' && Platform.Version >= 31) {
      Alert.alert(
        '정확한 알람 권한 필요',
        '복약 알림을 정확한 시간에 받기 위해 "정확한 알람" 권한이 필요합니다. 설정에서 권한을 허용해주세요.',
        [
          { text: '취소', style: 'cancel' },
          {
            text: '설정 열기',
            onPress: () => Linking.openSettings(),
          },
        ]
      );
    }
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
