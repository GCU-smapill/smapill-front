import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
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
import { useNavigation } from '@react-navigation/native';

const timeSlotToHour = {
  wakeUp: 7,
  morning: 9,
  noon: 12,
  evening: 18,
  bedTime: 22,
};

const TextInputModal = () => {
  const navigation = useNavigation();
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

        PushNotification.localNotificationSchedule({
          channelId: 'medicine-reminder',
          title: '복약 알림',
          message: `${medicineName} 복용할 시간입니다.`,
          date: new Date(dateObj.setHours(timeSlotToHour[time], 0, 0)),
          allowWhileIdle: true,
        });
      });
    });

    updateMedicineSchedule(newSchedule);
    navigation.goBack();
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
                [formatDate(startDate)]: { selected: true, selectedColor: 'orange' },
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
                [formatDate(endDate)]: { selected: true, selectedColor: 'orange' },
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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, backgroundColor: '#fff' }}
    >
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <ScrollView contentContainerStyle={styles.pageContainer} keyboardShouldPersistTaps="handled">
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialCommunityIcons name="arrow-left" size={30} color="black" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>복약 정보 입력</Text>
          </View>

          <Text style={styles.stepTitle}>Step {currentStep} / 5</Text>
          {renderStep()}

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
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default TextInputModal;

const styles = StyleSheet.create({
  pageContainer: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
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
    marginTop: 30,
  },
  button: {
    backgroundColor: 'orange',
    padding: 12,
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
