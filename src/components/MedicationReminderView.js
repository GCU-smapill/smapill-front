import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import useUserStore from "../store/useUserStore";



// 시간대에 따른 한국어 라벨 반환
const getKoreanLabel = (time) => {
  switch (time) {
    case 'UPON_WAKING':
      return '기상직후 (07:00)';
    case 'MORNING':
      return '아침 (08:00)';
    case 'AFTERNOON':
      return '점심 (12:00)';
    case 'EVENING':
      return '저녁 (19:00)';
    case 'BEFORE_BED':
      return '취침전 (21:00)';
    case 'ANYTIME':
      return '하루 언제든';
    default:
      return '알 수 없음';
  }
};

const MedicationReminderView = ({ time, date, medications, onToggleTaken, onDelete }) => {
  const currentUserId = useUserStore((state) => state.currentUserId); // ✅ 현재 유저 ID 사용
  
  return (
    <View style={styles.container}>
      {/* 상단 시간대 */}
      <View style={styles.topContainer}>
        <Text style={styles.timeText}>{getKoreanLabel(time)}</Text>
      </View>

      {/* 하단 약 리스트 */}
      <View style={styles.medicationsContainer}>
        {medications.map((medication, i) => (
          <View key={medication.scheduleId} style={styles.medicationWrapper}>
            <TouchableOpacity
              style={styles.medicationItem}
              onPress={() => onToggleTaken(medication.scheduleId,currentUserId, !medication.isTaken)}
              onLongPress={() => onDelete(medication.scheduleId,currentUserId)}
            >
              <View style={styles.medicationLeft}>
                <MaterialCommunityIcons name="pill" style={styles.pillIcon} />
                <Text style={styles.pillName}>{medication.name}</Text>
              </View>

              <View style={styles.medicationRight}>
                <Text style={styles.pillDose}>{medication.dosage}알 복용</Text>
                <MaterialCommunityIcons
                  name={medication.isTaken ? "check-circle" : "checkbox-blank-circle-outline"}
                  style={[
                    styles.checkIcon,
                    { color: medication.isTaken ? "green" : "grey" },
                  ]}
                />
              </View>
            </TouchableOpacity>

            {/* 구분선 */}
            {medications.length - 1 !== i && (
              <View style={styles.separator} />
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "orange",
    padding: 9,
  },
  timeText: {
    textAlign: "center",
    fontSize: 26,
    paddingBottom: 3,
    fontWeight: "800",
    color: "#fff",
  },
  medicationsContainer: {
    backgroundColor: "#fff",
    borderColor: "orange",
    borderWidth: 4,
    borderRadius: 20,
    borderTopLeftRadius: 0,
    padding: 5,
  },
  medicationWrapper: {
    alignItems: 'center',
  },
  medicationItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 70,
    padding: 10,
  },
  medicationLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  medicationRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  pillIcon: {
    fontSize: 45,
    paddingRight: 7,
  },
  pillName: {
    fontSize: 33,
    fontWeight: "500",
    paddingBottom: 10,
  },
  pillDose: {
    fontSize: 30,
    fontWeight: "600",
    paddingBottom: 7,
    paddingRight: 7,
  },
  checkIcon: {
    fontSize: 38,
  },
  separator: {
    width: "100%",
    borderColor: "grey",
    borderWidth: 1,
  },
});

export default MedicationReminderView;
