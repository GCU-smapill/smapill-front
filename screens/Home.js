import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, ScrollView, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MedicationReminderView from '../components/MedicationReminderView'
import moment from 'moment';
import 'moment/locale/ko'
import { UserContext } from '../context/UserContext';
import { MedicineContext } from '../context/MedicineContext';
import * as Notifications from 'expo-notifications';

moment.locale('ko')

// 주간 날짜 계산 함수
const getWeekDays = (date) => {
  const startOfWeek = moment(date).startOf('isoWeek');
  return Array.from({ length: 7 }).map((_, index) =>
    startOfWeek.clone().add(index, 'days').format('YYYY-MM-DD')
  );
};

const Home = () => {
  const today = moment().format('YYYY-MM-DD'); // 오늘 날짜
  const [selectedDate, setSelectedDate] = useState(today);
  const [currentDate, setCurrentDate] = useState(today);
  const [weekDays, setWeekDays] = useState(getWeekDays(currentDate));
  const user = useContext(UserContext); // 유저 이름 콘텍스트
  const {medicineSchedule, updateMedicineSchedule } = useContext(MedicineContext)

  useEffect(() => {
    (async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('알림 권한이 거부되었습니다!');
      }
    })();
  }, []);

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  const sendNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: '알림 제목 테스트',
        body: '알림 내용 테스트',
        sound: true,
      },
      trigger: null
    });
  };

  // 날짜 선택 핸들러
  const handleDayPress = (day) => {
    console.log(day)
    setSelectedDate(day);
  };

  // 주간 탐색 핸들러
  const handleWeekChange = (direction) => {
    const newDate = moment(currentDate).add(direction, 'week').format('YYYY-MM-DD');
    setCurrentDate(newDate);
    setWeekDays(getWeekDays(newDate));
  };

  const handleToggleTaken = (selectedDate, timeSlot, individualId) => {
    console.log("이전 스케줄:", medicineSchedule);
    console.log("선택된 날짜:", selectedDate);
    console.log("시간대:", timeSlot);
    console.log("약 ID:", individualId);
  
    // 새로운 스케줄 객체를 생성
    const updatedSchedule = medicineSchedule;
  
    if (updatedSchedule[selectedDate] && updatedSchedule[selectedDate][timeSlot]) {
      
      updatedSchedule[selectedDate][timeSlot] = updatedSchedule[selectedDate][timeSlot].map(
        (medication) =>
          medication.id === individualId
            ? { ...medication, isTaken: !medication.isTaken } // 복용 여부 토글
            : medication
      );
    } else {
      console.warn("해당 날짜 또는 시간대가 존재하지 않습니다.");
      return;
    }
  
    // 상태 업데이트 - 기존 상태와 새로운 스케줄을 병합
    updateMedicineSchedule((prevSchedule) => ({
      ...prevSchedule,
      ...updatedSchedule,
    }));
  
    console.log("최종 업데이트된 스케줄:", updatedSchedule);
  };
  
  const confirmDelete = (date, time, medicationId) => {
    Alert.alert(
      "삭제 확인", // 타이틀
      "이 약을 삭제할까요?", // 메시지
      [
        { text: "아니오", style: "cancel" }, // 취소 버튼
        { 
          text: "예", 
          style: "destructive", 
          onPress: () => handleDeleteMedication(date, time, medicationId) // 예를 누르면 삭제 함수 호출
        }
      ],
      { cancelable: true } // 바깥 화면 터치 시 닫기
    );
  };

  const handleDeleteMedication = (date, timeSlot, id) => {
    
    const updatedSchedule = medicineSchedule;
    
      if (updatedSchedule[date] && updatedSchedule[date][timeSlot]) {
        // 해당 시간대에서 특정 ID의 약 제거
        updatedSchedule[date][timeSlot] = updatedSchedule[date][timeSlot].filter(
          (medication) => medication.id !== id
        );
  
        // 시간대가 비어있으면 해당 시간대 삭제
        if (updatedSchedule[date][timeSlot].length === 0) {
          delete updatedSchedule[date][timeSlot];
        }
  
        // 날짜가 비어있으면 해당 날짜 삭제
        if (Object.keys(updatedSchedule[date]).length === 0) {
          delete updatedSchedule[date];
        }
      }
      
      // 상태 업데이트 - 기존 상태와 새로운 스케줄을 병합
      updateMedicineSchedule((prevSchedule) => ({
        ...prevSchedule,
        ...updatedSchedule,
      }));
      
      // 상태 업데이트
      return updatedSchedule;
  }
    
  const renderMedicationViews = () => {
    // 선택된 날짜의 약 데이터 가져오기
    const selectedDateString = new Date(selectedDate).toLocaleDateString();
    const dailyData = medicineSchedule[selectedDateString];
  
    // 데이터가 없으면 메시지 반환
    if (!dailyData) {
      return (
        <View style={styles.noDateContainer}>
          <Text style={styles.noDataText}>이 날은 복용할 약이 없습니다.</Text>
          <TouchableOpacity onPress={sendNotification}>
            <Text style={{ fontSize: 18, color: '#007AFF', marginTop: 20 }}>알림 테스트 보내기</Text>
          </TouchableOpacity>
        </View>
      );
    }

    // 시간대별로 MedicationReminderView 생성
    return (
      <ScrollView
            contentContainerStyle={styles.scrollViewContent} 
          >
      {Object.keys(dailyData).map((time) => (
          <MedicationReminderView
          key={time} // 고유 키
          date={selectedDateString}
          time={time} // 시간대 전달
          medications={dailyData[time]} // 같은 시간대의 약 리스트 전달
          onToggleTaken={handleToggleTaken}
          onDelete={confirmDelete}
        />
      ))}
      </ScrollView>
    )
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <View style={{paddingLeft:20, paddingRight:10}}>
          <Image
            source={require('../default_user.jpg')}
            style={{
              width:38,
              height:38,
              borderRadius:"50%",
            }}/>
        </View>
        <Text style={styles.userText}>{user}</Text>
        <MaterialCommunityIcons name={'chevron-down'} style={{marginLeft:-1,paddingTop:2, fontSize:40, color:"grey"}}/>
      </View>
      <View style={styles.homeContents}>
        <View style={styles.weekNavigator}>
          <TouchableOpacity onPress={() => handleWeekChange(-1)}>
            <MaterialCommunityIcons
              name='chevron-left'
              style={{fontSize:50}}/>
          </TouchableOpacity>
          <Text style={styles.weekTitle}>
            {moment(currentDate).startOf('isoWeek').format('YYYY-MM-DD')} ~{' '}
            {moment(currentDate).endOf('isoWeek').format('YYYY-MM-DD')}
          </Text>
          <TouchableOpacity title="다음 주 >" onPress={() => handleWeekChange(1)}>
             <MaterialCommunityIcons
              name='chevron-right'
              style={{fontSize:50}}/>
          </TouchableOpacity>
        </View>
        <FlatList
          justifyContent={"center"}
          horizontal
          height={50}
          data={weekDays}
          backgroundColor={'white'}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <View>
              <View style={styles.dayDisplay}>
                <Text style={styles.dayText}>{moment(item).format('ddd')}</Text>
              </View>
              <TouchableOpacity
                style={[
                  styles.dayContainer,
                  item === selectedDate && styles.selectedDay,
                  item === today && styles.todayHighlight, // 오늘 강조
                ]}
                onPress={() => handleDayPress(item)}
              >
                <Text style={styles.dateText}>{moment(item).format('DD')}</Text>
              </TouchableOpacity>
            </View>
          )}
        />
        <View style={styles.todayPillDescriptionContainer}>
        
          <Text style={styles.descriptionText}>오늘 드셔야 할 약이에요!</Text>
        </View>
        <View style={styles.todayPillContainer}>
            {renderMedicationViews()}
        </View>
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' },
  userInfo: { marginTop: 50, width: '100%', height: '7%', flexDirection:"row", backgroundColor: 'white', justifyContent: 'flex-start', alignItems:'center', borderBottomColor:"grey", borderBottomWidth:1 },
  userText: { textAlign: 'center', fontSize: 24, color: 'grey' },
  homeContents: { flex: 1, width: '100%' },
  calendarContainer:{},
  weekNavigator: { flexDirection: 'row', justifyContent: 'space-between', alignItems:"center" , padding: 1, backgroundColor: 'white' },
  weekTitle: { fontSize: 22, textAlign: 'center', fontWeight: 'bold' },
  dayDisplay:{
    justifyContent:'center',
    alignItems: 'center',
    width:50,
    height:40,
    backgroundColor: 'white',
    borderColor: '#D9D9D9',
  },
  dayContainer: {
    justifyContent:'center',
    alignItems: 'center',
    width:50,
    height:50,
    backgroundColor: 'white',
    borderColor: '#D9D9D9',
  },
  selectedDay: { backgroundColor: '#00adf5' },
  todayHighlight: { borderColor: 'orange', borderWidth: 2 },
  dayText: { fontSize: 20, fontWeight: 'light' },
  dateText: { fontSize: 20 },
  todayPillDescriptionContainer:{
    height:70,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"white",
    borderTopWidth:2,
    borderBottomWidth:2,
    borderColor:"#D9D9D9"
  },
  descriptionText:{
    fontSize: 25,
    fontWeight: 600,
  },
  todayPillContainer:{
    flex:10,
    backgroundColor:"#e9ecef"
  },
  scrollViewContent: {
    flexGrow: 1,           // ScrollView가 최소한으로 높이를 채우도록 설정
    justifyContent: 'flex-start', // 수직 중앙 정렬
    alignItems: 'center',    // 수평 중앙 정렬
  },  
  noDateContainer:{
    marginTop:100,
    alignItems:"center",
  },
  noDataText:{
    fontSize:30
  },
  selectedDateText: { marginTop: 20, fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
});

export default Home;
