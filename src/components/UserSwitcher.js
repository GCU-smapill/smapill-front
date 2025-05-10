import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import useStore from '../store/useStore';

const UserSwitcher = ({ onPress }) => {
  const loggedInAccount = useStore(state => state.loggedInAccount);
  const users = useStore(state => state.users);
  const currentUserId = useStore(state => state.currentUserId);

  // 🔹 현재 복약 대상 유저 판별
  const currentUser = 
    loggedInAccount?.id === currentUserId
      ? loggedInAccount
      : users.find(u => u.id === currentUserId);

  return (
    <View style={{ width: "100%" }}>
      <TouchableOpacity onPress={onPress} style={styles.userBox}>
        <View style={styles.userIcon}>
          <Image
            source={require('../assets/default_user.jpg')}
            style={{ width: 38, height: 38, borderRadius: 999 }}
          />
        </View>
        <Text style={styles.userName}>{currentUser?.name ?? '로딩중'}</Text>
        <MaterialCommunityIcons name={'chevron-down'} style={styles.chevronIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  userBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "center",
    margin: 10,
    padding: 5,
    backgroundColor: "white",
    alignSelf: "flex-start",
    borderRadius: 15,
  },
  userIcon: {
    paddingRight: 6,
  },
  userName: {
    textAlign: 'center',
    fontSize: 24,
    color: 'grey',
  },
  chevronIcon: {
    paddingTop: 2,
    fontSize: 40,
    color: "grey"
  }
});

export default UserSwitcher;
