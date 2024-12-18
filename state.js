import { atom } from 'recoil';

// userInfo 전역 상태 (Atom)
export const userState = atom({
  key: 'userState', // 상태의 고유 키
  default: {},    // 초기 상태 (user 정보 없음)
});

// 두 번째 상태 변수
export const medicationScheduleState = atom({
    key: 'medicationScheduleState', 
    default: {}, 
  });

  export const tokenState = atom({
    key: 'tokenState', 
    default: "", 
  });