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

var i = 0;

const MedicationReminderView = ({ time, date, medications, onToggleTaken, onDelete  }) => {
  return (
    <View style={styles.container}>
      {/* 상단 시간대 */}
      <View style={styles.topContainer}>
        <Text style={styles.timeText}>{getKoreanLabel(time)}</Text>
        {/*<MaterialCommunityIcons name="menu-open" style={styles.icon} />*/}
      </View>

      {/* 하단 약 리스트 */}
      <View style={styles.medicationsContainer}>
        {medications.map((medication, i) => (
          <View key={medication.id} style={{ alignItems: 'center' }}>
            <TouchableOpacity
              style={styles.medicationItem}
              onPress={() => onToggleTaken(date, time, medication.id)}
              onLongPress={() => onDelete(date, time, medication.id)}
            >
              <Text style={styles.pillName}>{medication.medicineName}</Text>
              <Text style={styles.pilldose}>{medication.dose}알 복용</Text>
              <MaterialCommunityIcons
                name={
                  medication.isTaken ? "check-circle" : "checkbox-blank-circle-outline"
                }
                style={[
                  styles.checkIcon,
                  { color: medication.isTaken ? "green" : "grey" },
                ]}
              />
            </TouchableOpacity>

            {medications.length - 1 !== i && (
              <View style={{ width: "100%", borderColor: "grey", borderWidth: 1 }} />
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "95%",
    marginVertical: 10,
    borderRadius: 20,
    overflow: "hidden",
  },
  topContainer: {
    width: "60%",
    borderTopRightRadius: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "orange",
    padding: 9,
  },
  timeText: { 
    textAlign:"center",
    fontSize: 26, 
    paddingBottom: 3,
    fontWeight:800, 
    color: "#fff"
  },
  icon: { 
    fontSize: 30, 
    color: "#fff" 
  },
  medicationsContainer: {
    backgroundColor: "#fff",
    borderColor:"orange",
    borderWidth: 4,
    borderRadius: 20,
    borderTopLeftRadius: 0,
    padding: 10,
  },
  medicationItem: {
    flexDirection: "row",
    alignItems: "center",
    height:70,
    padding: 10,
  },
  pillImage: { width: 40, height: 40, marginRight: 10 },
  pillName: { flex: 1.5, fontSize: 33, fontWeight: 600, paddingBottom:7 },
  pilldose:{ flex: 1, fontSize: 30, fontWeight: 600, paddingBottom:7 },
  checkIcon: { fontSize: 38 },
});

export default MedicationReminderView;