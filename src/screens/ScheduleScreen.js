import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import moment from 'moment';
import 'moment/locale/ko';

import UserSwitcher from '../components/UserSwitcher';
import UserSelectDropdown from '../modals/UserSelectDropdown';
import DaySelector from '../components/DaySelector';
import WeekNavigator from '../components/WeekNavigator';
import MedicationList from '../components/MedicationList';
import useStore from '../store/useStore';

moment.locale('ko');

const ScheduleScreen = () => {
  const today = moment().format('YYYY-MM-DD');
  const [selectedDate, setSelectedDate] = useState(today);
  const [currentDate, setCurrentDate] = useState(today);
  const [weekDays, setWeekDays] = useState(getWeekDays(today));
  const [isUserModalVisible, setUserModalVisible] = useState(false);

  // ✅ Zustand 상태 가져오기
  const loggedInAccount = useStore(state => state.loggedInAccount);
  const users = useStore(state => state.users);
  const currentUserId = useStore(state => state.currentUserId);

  // 🔹 현재 복약 대상 유저 결정
  const currentUser = 
    loggedInAccount?.id === currentUserId
      ? loggedInAccount
      : users.find(u => u.id === currentUserId);

  const handleWeekChange = (direction) => {
    const newDate = moment(currentDate).add(direction, 'week').format('YYYY-MM-DD');
    setCurrentDate(newDate);
    setWeekDays(getWeekDays(newDate));
  };

  return (
    <View style={styles.container}>
      <>
        <UserSwitcher onPress={() => setUserModalVisible(true)} />
        {isUserModalVisible && (
          <>
            <TouchableWithoutFeedback onPress={() => setUserModalVisible(false)}>
              <View style={styles.overlay} />
            </TouchableWithoutFeedback>
            <UserSelectDropdown onClose={() => setUserModalVisible(false)} />
          </>
        )}
      </>

      <View style={styles.header}>
        <Text style={styles.headerText}>
          {currentUser?.name ?? '로딩중'}님의 복약 일정
        </Text>
      </View>

      <WeekNavigator currentDate={currentDate} onWeekChange={handleWeekChange} />
      <DaySelector
        weekDays={weekDays}
        selectedDate={selectedDate}
        onSelect={setSelectedDate}
        today={today}
      />
      <MedicationList selectedDate={selectedDate} />
    </View>
  );
};

export default ScheduleScreen;

const getWeekDays = (date) => {
  const startOfWeek = moment(date).startOf('isoWeek');
  return Array.from({ length: 7 }).map((_, index) =>
    startOfWeek.clone().add(index, 'days').format('YYYY-MM-DD')
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 99,
  },
  header: {
    padding: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: '#ddd' },
  headerText: { fontSize: 22, fontWeight: '600' },
});
