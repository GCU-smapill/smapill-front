import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserInfo } from '../apis/userAPi';

const useStore = create((set, get) => ({
  accessToken: null,
  loggedInAccount: null,
  currentUserInfo: null,
  users: [],

  // 🔹 accessToken 저장
  setToken: async (token) => {
    await AsyncStorage.setItem('accessToken', token);
    set({ accessToken: token });
  },

  // 🔹 앱 시작 시 토큰 로딩
  loadToken: async () => {
    const token = await AsyncStorage.getItem('accessToken');
    if (token) set({ accessToken: token });
    return token;
  },

  // 🔹 로그아웃
  logout: async () => {

    await AsyncStorage.removeItem('accessToken');
    set({
      accessToken: null,
      loggedInAccount: null,
      currentUserId: null,
      users: [],
    });
  },

  // 🔹 로그인 후 사용자 정보 + 복약 일정 로딩
  fetchAndSetUserInfo: async () => {
    const user = (await getUserInfo()).result; // { userId, name, createdAt }
    //const today = new Date().toISOString().split('T')[0];
    //const schedule = (await getSchedule(today)).result;

    const fullUser = {
      id: user.userId,
      name: user.name,
    };

    set({
      loggedInAccount: fullUser,
      users: [fullUser],
      currentUserId: fullUser.id,
    });
  },


}));

export default useStore;
