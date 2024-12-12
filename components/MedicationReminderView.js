import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const MedicationReminderView = ({ time, date, medications, onToggleTaken, onDelete  }) => {
  return (
    <View style={styles.container}>
      {/* 상단 시간대 */}
      <View style={styles.topContainer}>
        <Text style={styles.timeText}>{time}</Text>
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
                console.log(date)
                console.log(time)
                console.log(medication.id)}
            } // 복용 여부 토글
            onLongPress={() => {
                onDelete(date, time, medication.id); // 약 삭제
                console.log(`삭제됨: ${date}, ${time}, ${medication.id}`);
            }}
          >
            
            <Text style={styles.pillName}>{medication.medicineName}</Text>
            <Text style={styles.pillName}>{medication.dose}알 복용</Text>
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
    backgroundColor: "#4B778D",
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
  timeText: { fontSize: 24, color: "#fff" },
  icon: { fontSize: 30, color: "#fff" },
  medicationsContainer: {
    backgroundColor: "#fff",
    margin: 15,
  },
  medicationItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
  },
  pillImage: { width: 40, height: 40, marginRight: 10 },
  pillName: { flex: 1, fontSize: 25 },
  checkIcon: { fontSize: 30 },
});

export default MedicationReminderView;
