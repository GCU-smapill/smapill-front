import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MedicineContext } from '../context/MedicineContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Calendar } from 'react-native-calendars';

const InputModal = ({ visible, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1); // 현재 단계
  const [medicineName, setMedicineName] = useState('');
  const [doseCount, setDoseCount] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [selectedTimeOptions, setSelectedTimeOptions] = useState([]);
  const { medicineSchedule, updateMedicineSchedule } = useContext(MedicineContext);

  const timeOptions = ['wakeUp', 'morning', 'noon', 'evening', 'bedTime'];
  const timeOptions1 = ['기상직후', '아침', '점심', '저녁', '취침전'];

  const getKoreanLabel = (time) => {
    if (time === 'wakeUp') return '기상직후';
    if (time === 'morning') return '아침';
    if (time === 'noon') return '점심';
    if (time === 'evening') return '저녁';
    if (time === 'bedTime') return '취침전';
    return ''; // 예외 처리
  };

  const getDatesBetween = (start, end) => {
    const dates = [];
    let currentDate = new Date(start);
    const finalDate = new Date(end);

    while (currentDate <= finalDate) {
      dates.push(new Date(currentDate).toLocaleDateString());
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  };

  // 단계별 UI 검증
  const validateStep = () => {
    if (currentStep === 1 && !medicineName) return '약 이름을 입력해주세요.';
    if (currentStep === 2 && (!doseCount || isNaN(doseCount) || doseCount <= 0)) {
      return '복용 횟수를 숫자로 입력해주세요.';
    }
    if (currentStep === 5 && selectedTimeOptions.length === 0) {
      return '복용 시간을 하나 이상 선택해주세요.';
    }
    return null;
  };

  // 저장 버튼
  const handleSave = () => {
    if (!medicineName || selectedTimeOptions.length === 0 || !doseCount) {
        alert('모든 필드를 입력해주세요.');
        return;
    }

    const allDates = getDatesBetween(startDate, endDate);
    const newSchedule = {};

    allDates.forEach((date) => {
        newSchedule[date] = {};

        selectedTimeOptions.forEach((time) => {
        if (!newSchedule[date][time]) {
            newSchedule[date][time] = [];
        }

        
        newSchedule[date][time].push({
        id: new Date().getTime(),
        medicineName: medicineName,
        isTaken: false,
        dose: doseCount,
        });
        
        });
    });

    // Context 업데이트
    updateMedicineSchedule(newSchedule);
    console.log('업데이트된 복약 스케줄:', JSON.stringify(medicineSchedule, null, 2));
    resetInputs(); // 입력 필드 초기화
    onClose(); // 모달 닫기
  };
  
  const handleClose = () => {
    resetInputs();
    onClose(); // 모달을 닫는 외부 함수 호출
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss(); // 키보드를 내리는 함수
  };


  const resetInputs = () => {
    setMedicineName('');
    setDoseCount('');
    setStartDate(new Date());
    setEndDate(new Date());
    setSelectedTimeOptions([]);
    setCurrentStep(1);
  };

  // 단계별 UI 렌더링
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
                    current={startDate.toISOString().split('T')[0]} // 현재 날짜 설정
                    onDayPress={(day) => setStartDate(new Date(day.dateString))} // 날짜 선택 시 업데이트
                    markedDates={{
                    [startDate.toISOString().split('T')[0]]: {
                        selected: true,
                        selectedColor: 'orange',
                    },
                    }}
                    theme={{
                    todayTextColor: 'red',
                    arrowColor: 'orange',
                    selectedDayBackgroundColor: 'orange',
                    selectedDayTextColor: '#ffffff',
                    }}
                />
              </>
            );
          
          case 4:
            return (
              <>
                <Text style={styles.label}>4단계: 종료일 설정</Text>
                <Calendar
                    current={startDate.toISOString().split('T')[0]} // 현재 날짜 설정
                    onDayPress={(day) => setEndDate(new Date(day.dateString))} // 날짜 선택 시 업데이트
                    markedDates={{
                    [endDate.toISOString().split('T')[0]]: {
                        selected: true,
                        selectedColor: 'orange',
                    },
                    }}
                    theme={{
                    todayTextColor: 'red',
                    arrowColor: 'orange',
                    selectedDayBackgroundColor: 'orange',
                    selectedDayTextColor: '#ffffff',
                    }}
                />
              </>
            );
          
      case 5:
        return (
          <>
            <Text style={styles.label}>5단계: 복용 시간 선택</Text>
            <View style={{justifyContent:"center", alignItems:"center", width:"100%", height:"100%", flex:1, flexDirection:"column"}}>
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
                    <Text style={{ fontSize: 25, color: selectedTimeOptions.includes(time) ? 'white' : 'black' }}>
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
    <Modal transparent={true} visible={visible} animationType="none">
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
                        <MaterialCommunityIcons name="close" size={30} color="black" />
                    </TouchableOpacity>

                    <Text style={styles.title}>약 정보 입력 ({currentStep}/5)</Text>
                    <View style={{flex:2}}>
                        {renderStep()}
                    </View>
                    
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
                        }}>
                            <Text style={styles.buttonText}>{currentStep === 5 ? '저장' : '다음'}</Text>
                        </TouchableOpacity>
                            {currentStep > 1 && (
                            <TouchableOpacity style={styles.button} onPress={() => setCurrentStep(currentStep - 1)}>
                                <Text style={styles.buttonText}>이전</Text>
                            </TouchableOpacity>
                            )}
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    </Modal>
  );
};

export default InputModal;

// 스타일 설정
const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '95%',
    height:'60%',
    marginBottom:60,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
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
    marginBottom: 15,
    width: '100%',
    height:'20%',
    fontSize:25
  },
  datePickerButton: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginVertical: 5,
    alignItems: 'center',
  },
  timeOption: {
    padding: 10,
    width:"80%",
    height:"15%",
    marginVertical: 5,
    backgroundColor: '#ddd',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent:"center"
  },
  timeOptionSelected: {
    backgroundColor: 'orange',
  },
  buttonContainer: {
    flexDirection:"row-reverse",
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 5,
    width: '45%',
    height:'50',
    alignItems: 'center',
    justifyContent:'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize:25
  },
});
