import React from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import useUserStore from '../store/useUserStore';
import useScheduleStore from '../store/useScheduleStore';

import UserProfile from '../components/UserProfile';
import SettingOption from '../components/SettingOption';
import SettingsSection from '../components/SettingsSection';
import { deleteAllSchedule } from '../apis/scheduleAPI';

const SettingsScreen = ({ navigation }) => {
  const loggedInAccount = useUserStore((state) => state.loggedInAccount);
  const logout = useUserStore((state) => state.logout);
  const currentUserName = useUserStore((state) => state.currentUserName)
  const currentUserId = useUserStore((state) => state.currentUserId)

  const handleLogout = () => {
     Alert.alert(
      '로그아웃',
      `정말로 로그아웃 하시겠습니까?`,
      [
        { text: '아니오', style: 'cancel' },
        {
          text: '예',
          style: 'destructive',
          onPress: async () => {
            logout();
            navigation.replace('Login');
          },
        },
      ],
      { cancelable: true }
    );
  };

  const deleteAllScheduleFunction = () => {
    const userId = currentUserId

    console.log(currentUserName)

    Alert.alert(
      '복용 기록 삭제',
      `${currentUserName}님의 복용 일정을 정말 모두 삭제하시겠어요?`,
      [
        { text: '아니오', style: 'cancel' },
        {
          text: '예',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteAllSchedule({userId : userId}); // ✅ API 호출 완료 대기
              console.log('🗑️ 전체 복용 일정 삭제 완료');
              navigation.replace('MainTabs');
            } catch (error) {
              console.error('❌ 전체 복용 일정 삭제 실패:', error);
              Alert.alert('삭제 실패', '전체 복용 일정을 삭제하는 데 실패했어요.');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.userInfoContainer}>
        <UserProfile name={loggedInAccount?.name} />
      </View>

      <SettingsSection>
        <SettingOption label="복용 일정 전체 삭제" onPress={deleteAllScheduleFunction} />
        <SettingOption label="보호자 관리" onPress={() => navigation.navigate('GuardianManage')} />
        <SettingOption label="로그아웃" onPress={handleLogout} danger />
      </SettingsSection>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  userInfoContainer: {
    flex: 2,
    width: '100%',
    backgroundColor: 'white',
    borderBottomColor: '#dee2e6',
    borderBottomWidth: 2,
  },
});
