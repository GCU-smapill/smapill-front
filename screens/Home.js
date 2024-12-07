import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Button, ScrollView } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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
        <Text style={styles.userText}>사용자</Text>
      </View>
      <View style={styles.homeContents}>
        <View style={styles.weekNavigator}>
          <Button title="← 이전 주" onPress={() => handleWeekChange(-1)} />
          <Text style={styles.weekTitle}>
            {moment(currentDate).startOf('isoWeek').format('YYYY-MM-DD')} ~{' '}
            {moment(currentDate).endOf('isoWeek').format('YYYY-MM-DD')}
          </Text>
          <Button title="다음 주 →" onPress={() => handleWeekChange(1)} />
        </View>
        <FlatList
          justifyContent={"center"}
          horizontal
          height={50}
          data={weekDays}
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
          <Text style={styles.descriptionText}>오늘 드셔야 할 약</Text>
          <MaterialCommunityIcons name={'comment-alert'} style={{fontSize:40, padding:5}}></MaterialCommunityIcons>
        </View>
        <View style={styles.todayPillContainer}>
          <ScrollView>
            <Text>zz</Text>
            <Text style={styles.selectedDateText}>
              선택된 날짜: {moment(selectedDate).format('YYYY-MM-DD')}
            </Text>
          </ScrollView>
        </View>
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' },
  userInfo: { marginTop: 50, width: '100%', height: '7%', backgroundColor: 'teal', justifyContent: 'center' },
  userText: { textAlign: 'center', fontSize: 24, color: 'white' },
  homeContents: { flex: 1, width: '100%' },
  calendarContainer:{},
  weekNavigator: { flexDirection: 'row', justifyContent: 'space-between', alignItems:"center" , padding: 10, backgroundColor: '#ddd' },
  weekTitle: { fontSize: 16, textAlign: 'center', fontWeight: 'bold' },
  dayDisplay:{
    justifyContent:'center',
    alignItems: 'center',
    width:50,
    height:40,
    backgroundColor: 'white',
    borderColor: '#ccc',
  },
  dayContainer: {
    justifyContent:'center',
    alignItems: 'center',
    width:50,
    height:50,
    backgroundColor: 'white',
    borderColor: '#ccc',
  },
  selectedDay: { backgroundColor: '#00adf5' },
  todayHighlight: { borderColor: '#ff6347', borderWidth: 2 },
  dayText: { fontSize: 20, fontWeight: 'light' },
  dateText: { fontSize: 20 },
  todayPillDescriptionContainer:{
    height:50,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"white",
    borderBottomWidth:1,
    borderColor:"grey"
  },
  descriptionText:{
    fontSize: 20
  },
  todayPillContainer:{
    flex:10,
    backgroundColor:"red"
  },
  selectedDateText: { marginTop: 20, fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
});

export default Home;
