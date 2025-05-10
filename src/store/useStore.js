import { create } from 'zustand';

const useStore = create((set) => ({
  // 모든 사용자 리스트
  users: [
  ],

  // 현재 로그인된 계정 (user or guardian)
  loggedInAccount: null,

  // 현재 관리 중인 사용자 (복약 일정용)
  currentUserId: 1,

  // 🔹 로그인 처리 (사용자 or 보호자)
  login: (account) => set({ loggedInAccount: account }),

  logout: () => set({ loggedInAccount: null }),

  // 🔹 사용자 전환
  setCurrentUser: (id) => set({ currentUserId: id }),

  // 🔹 사용자 추가 (객체 그대로 추가)
  addUser: (userObj) =>
    set((state) => ({
      users: [...state.users, userObj],
  })),


  // 🔹 보호자 등록 (로그인 후 등록)
  addGuardian: (userId, guardianInfo) =>
    set((state) => ({
      users: state.users.map(user =>
        user.id === userId
          ? { ...user, guardians: [...user.guardians, guardianInfo] }
          : user
      )
    })),

  // 🔹 보호자 수정
  updateGuardian: (userId, guardianId, updatedInfo) =>
    set((state) => ({
      users: state.users.map(user =>
        user.id === userId
          ? {
              ...user,
              guardians: user.guardians.map(g =>
                g.id === guardianId ? { ...g, ...updatedInfo } : g
              )
            }
          : user
      )
    })),

  // 🔹 보호자 삭제
  removeGuardian: (userId, guardianId) =>
    set((state) => ({
      users: state.users.map(user =>
        user.id === userId
          ? {
              ...user,
              guardians: user.guardians.filter(g => g.id !== guardianId)
            }
          : user
      )
    })),
}));

export default useStore;
