import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Button, ScrollView, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MedicationReminderView from '../components/MedicationReminderView'
import moment from 'moment';
import 'moment/locale/ko'

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

  // 날짜 선택 핸들러
  const handleDayPress = (day) => {
    setSelectedDate(day);
  };

  // 주간 탐색 핸들러
  const handleWeekChange = (direction) => {
    const newDate = moment(currentDate).add(direction, 'week').format('YYYY-MM-DD');
    setCurrentDate(newDate);
    setWeekDays(getWeekDays(newDate));
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
        <Text style={styles.userText}>사용자</Text>
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
          <MaterialCommunityIcons name={'comment-alert'} style={{fontSize:40, padding:5}}></MaterialCommunityIcons>
        </View>
        <View style={styles.todayPillContainer}>
          <ScrollView>
            <MedicationReminderView
              time={"08:00"}
              pillImage={require('../components/medicine1.jpg')}
              pillName={"고혈압약"}
              Taken={true}/>
            <MedicationReminderView
              time={"12:00"}
              pillImage={require('../components/medicine2.jpg')}
              pillName={"로콜서방정500밀리그람"}
              Taken={false}/>
            {/*<Text style={styles.selectedDateText}>
              선택된 날짜: {moment(selectedDate).format('YYYY-MM-DD')}
            </Text>*/}
          </ScrollView>
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
    paddingTop:5,
    flex:10,
    backgroundColor:"#e9ecef"
  },
  selectedDateText: { marginTop: 20, fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
});

export default Home;
