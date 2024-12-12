import React, { createContext, useState } from 'react';

// Context 생성
export const MedicineContext = createContext();

export const MedicineProvider = ({ children }) => {
    const [medicineSchedule, setMedicineSchedule] = useState({}); // 빈 객체로 초기화
  
    // 복약 스케줄 업데이트 (기존 데이터 유지)
    const updateMedicineSchedule = (newData) => {
      setMedicineSchedule((prevSchedule) => {
        const updatedSchedule = { ...prevSchedule }; // 이전 스케줄 복사
  
        Object.keys(newData).forEach((date) => {
          // 날짜 키가 없으면 새로 추가
          if (!updatedSchedule[date]) updatedSchedule[date] = {};
  
          // 시간대별 데이터 업데이트
          Object.keys(newData[date]).forEach((time) => {
            if (!updatedSchedule[date][time]) updatedSchedule[date][time] = [];
            updatedSchedule[date][time] = [
              ...updatedSchedule[date][time],
              ...newData[date][time],
            ];
          });
        });
  
        return updatedSchedule; // 업데이트된 스케줄 반환
      });
    };
  
    return (
      <MedicineContext.Provider value={{ medicineSchedule, updateMedicineSchedule }}>
        {children}
      </MedicineContext.Provider>
    );
  };
  