// components/MedicationList.js
import React from 'react';
import { View, ScrollView, Text, StyleSheet, Alert } from 'react-native';
import MedicationReminderView from './MedicationReminderView';
import useScheduleStore from '../store/useScheduleStore';

const MedicationList = ({ selectedDate }) => {
  const medicineSchedule = useScheduleStore((state) => state.medicineSchedule);
  const updateMedicineSchedule = useScheduleStore((state) => state.updateMedicineSchedule);

  const handleToggleTaken = (date, timeSlot, id) => {
    const updated = JSON.parse(JSON.stringify(medicineSchedule)); // 깊은 복사

    if (updated[date]?.[timeSlot]) {
      updated[date][timeSlot] = updated[date][timeSlot].map((m) =>
        m.id === id ? { ...m, isTaken: !m.isTaken } : m
      );
      updateMedicineSchedule(updated); // 완전 덮어쓰기
      console.log('토글 완료:', updated[date][timeSlot]);
    }
  };

  const confirmDelete = (date, timeSlot, id) => {
    Alert.alert('삭제 확인', '이 약을 삭제할까요?', [
      { text: '아니오', style: 'cancel' },
      {
        text: '예',
        style: 'destructive',
        onPress: () => {
          const updated = JSON.parse(JSON.stringify(medicineSchedule));

          if (!updated[date] || !updated[date][timeSlot]) return;

          updated[date][timeSlot] = updated[date][timeSlot].filter((m) => m.id !== id);

          if (updated[date][timeSlot].length === 0) delete updated[date][timeSlot];
          if (Object.keys(updated[date]).length === 0) delete updated[date];

          updateMedicineSchedule(updated);
          console.log('삭제 후 스케줄:', updated);
        },
      },
    ]);
  };

  const data = medicineSchedule[selectedDate];

  if (!data) {
    return (
      <View style={styles.noDataContainer}>
        <Text style={styles.noDataText}>이 날은 복용할 약이 없습니다.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {Object.keys(data).map((time) => (
        <MedicationReminderView
          key={time}
          date={selectedDate}
          time={time}
          medications={data[time]}
          onToggleTaken={handleToggleTaken}
          onDelete={confirmDelete}
        />
      ))}
    </ScrollView>
  );
};

export default MedicationList;

const styles = StyleSheet.create({
  scrollContainer: { paddingVertical: 10, alignItems: 'center' },
  noDataContainer: { marginTop: 100, alignItems: 'center' },
  noDataText: { fontSize: 20, color: '#555' },
});
