// store/useScheduleStore.js
import { create } from 'zustand';

const useScheduleStore = create((set) => ({
  medicineSchedule: {},

  // ✅ 완전 덮어쓰기 방식으로 수정
  updateMedicineSchedule: (newSchedule) =>
    set({ medicineSchedule: newSchedule }),

  // ✨ 옵션: 병합 방식도 제공하고 싶다면 따로 추가 가능
  mergeMedicineSchedule: (partialSchedule) =>
    set((state) => ({
      medicineSchedule: {
        ...state.medicineSchedule,
        ...partialSchedule,
      },
    })),
}));

export default useScheduleStore;
