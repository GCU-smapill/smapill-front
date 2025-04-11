import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import useStore from '../store/useStore';
import useScheduleStore from '../store/useScheduleStore';

import UserProfile from '../components/UserProfile';
import SettingOption from '../components/SettingOption';
import SettingsSection from '../components/SettingsSection';

const SettingsScreen = ({ navigation }) => {
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  const { updateMedicineSchedule } = useScheduleStore();

  const handleLogout = () => {
    setUser(null);
    navigation.replace('Login');
  };

  const deleteAllSchedule = () => {
    Alert.alert(
      '복용 기록 삭제',
      '복용 일정을 정말 모두 삭제하시겠어요?',
      [
        {
          text: '아니오',
          style: 'cancel',
        },
        {
          text: '예',
          style: 'destructive',
          onPress: () => {
            updateMedicineSchedule({});
            navigation.navigate('메인화면');
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBox}>
        <Text style={styles.topBoxText}>내정보</Text>
      </View>

      <View style={styles.userInfoContainer}>
        <UserProfile name={user?.name} />
      </View>

      <SettingsSection>
        <SettingOption label="복용 일정 전체 삭제" onPress={deleteAllSchedule} />
        <SettingOption label="로그아웃" onPress={handleLogout} danger />
      </SettingsSection>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  topBox: {
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderBottomColor: '#dee2e6',
    borderBottomWidth: 2,
  },
  topBoxText: {
    marginBottom: 10,
    marginTop: 10,
    fontSize: 21,
    fontWeight: '600',
  },
  userInfoContainer: {
    flex: 1.8,
    width: '100%',
    backgroundColor: 'white',
    borderBottomColor: '#dee2e6',
    borderBottomWidth: 2,
  },
});
