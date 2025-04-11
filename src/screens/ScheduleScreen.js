// screens/ScheduleScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import moment from 'moment';
import 'moment/locale/ko';

import UserSwitcher from '../components/UserSwitcher';
import DaySelector from '../components/DaySelector';
import WeekNavigator from '../components/WeekNavigator';
import MedicationList from '../components/MedicationList';
import useStore from '../store/useStore';

moment.locale('ko');

const getWeekDays = (date) => {
  const startOfWeek = moment(date).startOf('isoWeek');
  return Array.from({ length: 7 }).map((_, index) =>
    startOfWeek.clone().add(index, 'days').format('YYYY-MM-DD')
  );
};

const ScheduleScreen = () => {
  const today = moment().format('YYYY-MM-DD');
  const [selectedDate, setSelectedDate] = useState(today);
  const [currentDate, setCurrentDate] = useState(today);
  const [weekDays, setWeekDays] = useState(getWeekDays(today));
  const user = useStore(state => state.user);

  const handleWeekChange = (direction) => {
    const newDate = moment(currentDate).add(direction, 'week').format('YYYY-MM-DD');
    setCurrentDate(newDate);
    setWeekDays(getWeekDays(newDate));
  };

  return (
    <View style={styles.container}>
      <UserSwitcher />
      <View style={styles.header}>
        <Text style={styles.headerText}>{user?.name ?? '로딩중'}님의 복약 일정</Text>
      </View>
      <WeekNavigator currentDate={currentDate} onWeekChange={handleWeekChange} />
      <DaySelector
        weekDays={weekDays}
        selectedDate={selectedDate}
        onSelect={setSelectedDate}
        today={today}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>오늘 드셔야 할 약이에요!</Text>
      </View>
      <MedicationList selectedDate={selectedDate} />
    </View>
  );
};

export default ScheduleScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { padding: 16, backgroundColor: 'white', borderBottomWidth: 1, borderColor: '#ddd' },
  headerText: { fontSize: 22, fontWeight: '600' },
  infoContainer: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  infoText: { fontSize: 18, fontWeight: '500' },
});
