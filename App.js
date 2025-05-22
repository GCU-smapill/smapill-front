import React, { useEffect } from 'react';
import { Alert, Linking, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PushNotification from 'react-native-push-notification';

import LoginScreen from './src/screens/LoginScreen';
import MainTabs from './src/navigation/MainTabs';
import CameraScreen from './src/modals/CameraScreen';
import TextInputModal from './src/modals/TextInputModal';
import GuardianRegisterScreen from './src/screens/GuardianRegisterScreen';
import GuardianManageScreen from './src/screens/GuardianManageScreen';
import SignUpScreen from './src/screens/SignUpScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {
    // 1. 알림 채널 생성
    PushNotification.createChannel(
      {
        channelId: 'medication-channel',
        channelName: '복약 알림',
        importance: 4,
        vibrate: true,
      },
      (created) => console.log(`알림 채널 생성됨: ${created}`)
    );
  
    // 2. 권한 체크 후 안내
    if (Platform.OS === 'android' && Platform.Version >= 31) {
      PushNotification.checkPermissions((permissions) => {
        if (!permissions.alert) {
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
        } else {
          console.log('✅ 알림 권한 이미 허용됨');
        }
      });
    }
  }, []);  

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="CameraScreen" component={CameraScreen} />
        <Stack.Screen name="TextInputModal" component={TextInputModal} />
        <Stack.Screen name="GuardianRegister" component={GuardianRegisterScreen} />
        <Stack.Screen name="GuardianManage" component={GuardianManageScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
