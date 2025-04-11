import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const getKoreanLabel = (time) => {
  if (time === 'wakeUp') return '기상직후 (07:00)';
  if (time === 'morning') return '아침 (08:00)';
  if (time === 'noon') return '점심 (12:00)';
  if (time === 'evening') return '저녁 (19:00)';
  if (time === 'bedTime') return '취침전 (21:00)';
  return ''; // 예외 처리
};

const MedicationReminderView = ({ time, date, medications, onToggleTaken, onDelete  }) => {
  return (
    <View style={styles.container}>
      {/* 상단 시간대 */}
      <View style={styles.topContainer}>
        <Text style={styles.timeText}>{getKoreanLabel(time)}</Text>
        <MaterialCommunityIcons name="menu-open" style={styles.icon} />
      </View>

      {/* 하단 약 리스트 */}
      <View style={styles.medicationsContainer}>
        {medications.map((medication) => (
          <TouchableOpacity
            key={medication.id}
            style={styles.medicationItem}
            onPress={() => {
                onToggleTaken(date, time, medication.id)
              }
            } // 복용 여부 토글
            onLongPress={() => {
                onDelete(date, time, medication.id); // 약 삭제
            }}
          >
            
            <Text style={styles.pillName}>{medication.medicineName}</Text>
            <Text style={styles.pilldose}>{medication.dose}알 복용</Text>
            <MaterialCommunityIcons
              name={
                medication.isTaken ? "check-circle" : "check-circle-outline"
              }
              style={[
                styles.checkIcon,
                { color: medication.isTaken ? "green" : "grey" },
              ]}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "95%",
    backgroundColor: "white",
    marginVertical: 10,
    borderRadius: 8,
    overflow: "hidden",
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "orange",
    padding: 10,
  },
  timeText: { fontSize: 24, fontWeight:500, color: "#fff",paddingLeft:"1%" },
  icon: { fontSize: 30, color: "#fff" },
  medicationsContainer: {
    backgroundColor: "#fff",
    margin: 10,
  },
  medicationItem: {
    flexDirection: "row",
    alignItems: "center",
    height:70,
    marginTop:-1,
    padding: 10,
    borderColor: "grey",
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  pillImage: { width: 40, height: 40, marginRight: 10 },
  pillName: { flex: 2, fontSize: 20 },
  pilldose:{ flex: 1, fontSize: 25 },
  checkIcon: { fontSize: 30 },
});

export default MedicationReminderView;