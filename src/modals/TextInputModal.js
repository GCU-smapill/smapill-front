import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Calendar } from 'react-native-calendars';
import useScheduleStore from '../store/useScheduleStore';
import PushNotification from 'react-native-push-notification';

const timeSlotToHour = {
  wakeUp: 7,
  morning: 9,
  noon: 12,
  evening: 18,
  bedTime: 22,
};

const TextInputModal = ({ visible, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [medicineName, setMedicineName] = useState('');
  const [doseCount, setDoseCount] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedTimeOptions, setSelectedTimeOptions] = useState([]);

  const medicineSchedule = useScheduleStore((state) => state.medicineSchedule);
  const updateMedicineSchedule = useScheduleStore((state) => state.updateMedicineSchedule);

  const timeOptions = ['wakeUp', 'morning', 'noon', 'evening', 'bedTime'];

  const getKoreanLabel = (time) => {
    const labels = {
      wakeUp: '기상직후',
      morning: '아침',
      noon: '점심',
      evening: '저녁',
      bedTime: '취침전',
    };
    return labels[time] || '';
  };

  const formatDate = (date) => new Date(date).toISOString().split('T')[0];

  const getDatesBetween = (start, end) => {
    const dates = [];
    let currentDate = new Date(start);
    const finalDate = new Date(end);
    while (currentDate <= finalDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  };

  const scheduleLocalNotification = (dateObj, hour, title) => {
    const notifyDate = new Date(dateObj);
    notifyDate.setHours(hour);
    notifyDate.setMinutes(0);
    notifyDate.setSeconds(0);

    PushNotification.localNotificationSchedule({
      channelId: 'medicine-reminder',
      title: '복약 알림',
      message: `${title} 복약 시간입니다!`,
      date: notifyDate,
      allowWhileIdle: true,
    });
  };

  const handleSave = () => {
    if (!medicineName || selectedTimeOptions.length === 0 || !doseCount) {
      alert('모든 필드를 입력해주세요.');
      return;
    }
  
    const allDates = getDatesBetween(startDate, endDate);
    const newSchedule = { ...medicineSchedule };
  
    allDates.forEach((dateObj) => {
      const formattedDate = formatDate(dateObj);
      if (!newSchedule[formattedDate]) newSchedule[formattedDate] = {};
  
      selectedTimeOptions.forEach((time) => {
        if (!newSchedule[formattedDate][time]) newSchedule[formattedDate][time] = [];
  
        const medicineEntry = {
          id: new Date().getTime() + Math.random(),
          medicineName,
          isTaken: false,
          dose: doseCount,
        };
  
        newSchedule[formattedDate][time].push(medicineEntry);
  
        // 📌 1. 실제 알림 예약
        const notifyDate = new Date(dateObj);
        notifyDate.setHours(timeSlotToHour[time]);
        notifyDate.setMinutes(0);
        notifyDate.setSeconds(0);
  
        PushNotification.localNotificationSchedule({
          channelId: 'medicine-reminder',
          title: '복약 알림',
          message: `${medicineName} 복용할 시간입니다.`,
          date: notifyDate,
          allowWhileIdle: true,
        });
  
        // ✅ 2. 테스트용 즉시 알림 추가
        PushNotification.localNotification({
          channelId: 'medicine-reminder',
          title: '⏱ 테스트용 알림',
          message: `${medicineName} 복약 알림이 예약되었습니다!`, // 알림 확인용
        });
      });
    });
  
    updateMedicineSchedule(newSchedule);
    resetInputs();
    onClose();
  };

  const validateStep = () => {
    if (currentStep === 1 && medicineName.trim().length === 0) {
      return '약 이름을 입력해주세요.';
    }
  
    if (currentStep === 2) {
      const dose = Number(doseCount);
      if (!doseCount || isNaN(dose) || dose <= 0) {
        return '복용 횟수를 숫자로 입력해주세요.';
      }
    }
  
    if (currentStep === 5 && selectedTimeOptions.length === 0) {
      return '복용 시간을 하나 이상 선택해주세요.';
    }
  
    return null;
  };
  

  const resetInputs = () => {
    setMedicineName('');
    setDoseCount('');
    setStartDate(new Date());
    setEndDate(new Date());
    setSelectedTimeOptions([]);
    setCurrentStep(1);
  };

  const handleClose = () => {
    resetInputs();
    onClose();
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <Text style={styles.label}>1단계: 약 이름 입력</Text>
            <TextInput
              style={styles.input}
              placeholder="예: 감기약"
              value={medicineName}
              onChangeText={setMedicineName}
            />
          </>
        );
      case 2:
        return (
          <>
            <Text style={styles.label}>2단계: 복용량 입력 (알)</Text>
            <TextInput
              style={styles.input}
              placeholder="예: 3"
              keyboardType="numeric"
              value={doseCount}
              onChangeText={setDoseCount}
            />
          </>
        );
      case 3:
        return (
          <>
            <Text style={styles.label}>3단계: 시작일 설정</Text>
            <Calendar
              current={formatDate(startDate)}
              onDayPress={(day) => setStartDate(new Date(day.dateString))}
              markedDates={{
                [formatDate(startDate)]: {
                  selected: true,
                  selectedColor: 'orange',
                },
              }}
              theme={{
                todayTextColor: 'red',
                arrowColor: 'orange',
              }}
            />
          </>
        );
      case 4:
        return (
          <>
            <Text style={styles.label}>4단계: 종료일 설정</Text>
            <Calendar
              current={formatDate(endDate)}
              onDayPress={(day) => setEndDate(new Date(day.dateString))}
              markedDates={{
                [formatDate(endDate)]: {
                  selected: true,
                  selectedColor: 'orange',
                },
              }}
              theme={{
                todayTextColor: 'red',
                arrowColor: 'orange',
              }}
            />
          </>
        );
      case 5:
        return (
          <>
            <Text style={styles.label}>5단계: 복용 시간 선택</Text>
            <View style={{ alignItems: 'center' }}>
              {timeOptions.map((time) => (
                <TouchableOpacity
                  key={time}
                  style={[
                    styles.timeOption,
                    selectedTimeOptions.includes(time) && styles.timeOptionSelected,
                  ]}
                  onPress={() =>
                    setSelectedTimeOptions((prev) =>
                      prev.includes(time)
                        ? prev.filter((item) => item !== time)
                        : [...prev, time]
                    )
                  }
                >
                  <Text style={{ fontSize: 20, color: selectedTimeOptions.includes(time) ? '#fff' : '#000' }}>
                    {getKoreanLabel(time)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      >
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
          <ScrollView contentContainerStyle={styles.modalOverlay} keyboardShouldPersistTaps="handled">
            <View style={styles.modalContainer}>
              <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
                <MaterialCommunityIcons name="close" size={30} color="black" />
              </TouchableOpacity>

              <Text style={styles.title}>약 정보 입력 ({currentStep}/5)</Text>
              <View style={{ flex: 2 }}>{renderStep()}</View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    const error = validateStep();
                    if (error) {
                      alert(error);
                      return;
                    }
                    currentStep === 5 ? handleSave() : setCurrentStep(currentStep + 1);
                  }}
                >
                  <Text style={styles.buttonText}>{currentStep === 5 ? '저장' : '다음'}</Text>
                </TouchableOpacity>
                {currentStep > 1 && (
                  <TouchableOpacity
                    style={[styles.button, { backgroundColor: '#ccc' }]}
                    onPress={() => setCurrentStep(currentStep - 1)}
                  >
                    <Text style={[styles.buttonText, { color: '#000' }]}>이전</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default TextInputModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flexGrow: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  modalContainer: {
    width: '95%',
    minHeight: '60%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  label: {
    fontSize: 20,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 15,
    fontSize: 18,
    marginBottom: 10,
  },
  timeOption: {
    width: '80%',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#eee',
    borderRadius: 5,
    alignItems: 'center',
  },
  timeOptionSelected: {
    backgroundColor: 'orange',
  },
  buttonContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
