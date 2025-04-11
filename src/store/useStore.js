// store/useStore.js
import { create } from 'zustand';

const useStore = create((set) => ({
  users: [
    { id: 1, name: '김진성' },
    { id: 2, name: '엄마' },
  ],
  currentUserId: 1,
  user: null, // 로그인된 유저 정보

  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),

  setCurrentUser: (id) => set({ currentUserId: id }),

  addUser: (name) =>
    set((state) => {
      const newId = Date.now();
      const newUser = { id: newId, name };
      return {
        users: [...state.users, newUser],
        currentUserId: newId,
        user: newUser, // 추가와 동시에 로그인 상태로 만들기
      };
    }),
}));

export default useStore;