import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import useUserStore from '../store/useUserStore';
import UserSwitcher from '../components/UserSwitcher';

const HomeScreen = () => {
  const loggedInAccount = useUserStore(state => state.loggedInAccount);

  useEffect(() => {
    console.log('📦 loggedInAccount 상태:', loggedInAccount);
  }, [loggedInAccount]);

  if (!loggedInAccount) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FF9131" />
        <Text style={styles.loadingText}>로그인 정보를 불러오는 중...</Text>
      </View>
    );
  }

  return (
    <View style={{ padding: 20 }}>
      <UserSwitcher />
      <Text style={{ fontSize: 20 }}>홈 화면</Text>
      <Text>{loggedInAccount.name} 님, 환영합니다!</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
});
