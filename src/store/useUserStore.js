import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserInfo } from '../apis/userAPi';
import { getDependentInfo } from '../apis/userLinkAPI';

const useUserStore = create((set, get) => ({
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
      currentUserName : null,
      users: [],
    });
  },

  // store/useUserStore.js (혹은 ts)
  removeUserById: (id) =>
    set((state) => ({
      users: state.users.filter((user) => user.id !== id),
  })),

  setCurrentUser: (id) =>
    set({ currentUserId: id }),

  setCurrentUserName: (name) =>
    set({ currentUserName: name }),

  // 🔹 로그인 후 사용자 정보 + 복약 일정 로딩
  fetchAndSetUserInfo: async () => {
    const user = (await getUserInfo()).result; // { userId, name, createdAt }
    //const today = new Date().toISOString().split('T')[0];
    //const schedule = (await getSchedule(today)).result;

    const fullUser = {
      id: user.id,         // 내부 용도 id
      userId: user.userId,     // 백엔드 기준 ID
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
    };

    set({
      loggedInAccount: fullUser,
      users: [fullUser],
      currentUserId: fullUser.id,
      currentUserName: fullUser.name
    });
  },

  fetchGuardianUserInfo: async () => {
    try {
      const dependentList = (await getDependentInfo()).result;

      // 현재 users 배열 가져오기
      const currentUsers = get().users;

      // 중복 제거: id 기준으로 새로운 유저만 추출
      const newUsers = dependentList.filter(dep => 
        !currentUsers.some(user => user.id === dep.id)
      );

      // 필요한 경우 email을 빈 문자열로 맞춤
      const normalizedUsers = newUsers.map(dep => ({
        id: dep.id,
        userId: dep.userId,
        name: dep.name,
        email: dep.email, // 또는 null
        phoneNumber: dep.phoneNumber,
      }));

      console.log("피보호자", dependentList)

      // users 배열에 병합
      set({
        users: [...currentUsers, ...normalizedUsers],
      });
    } catch (error) {
      console.error('피보호자 정보 로딩 실패:', error);
    }
  }

}));

export default useUserStore;
