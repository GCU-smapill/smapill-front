import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import moment from 'moment';

const screenWidth = Dimensions.get('window').width;
const itemWidth = screenWidth / 8;

const DaySelector = ({ weekDays, selectedDate, onSelect, today }) => {
  return (
    <View style={styles.container}>
      {weekDays.map((item) => (
        <View key={item} style={{ width: itemWidth, alignContent:"center" }}>
          <TouchableOpacity
            style={[
              styles.dayContainer,
              item === selectedDate && styles.selectedDay,
              item === today && styles.todayHighlight,
            ]}
            onPress={() => onSelect(item)}
          >
            <View style={styles.dayDisplay}>
              <Text key={item} style={[styles.dayText, item === selectedDate && styles.selectedDayFont]}>{moment(item).format('ddd')}</Text>
            </View>
            <Text key={item} style={[styles.dateText, item === selectedDate && styles.selectedDayFont ]}>{moment(item).format('DD')}</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default DaySelector;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent:"center",
    gap: "5",
    backgroundColor: 'white',
  },
  dayDisplay: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 28,
    marginTop: 5,
  },
  dayContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: "28%",
    height: 63,
    backgroundColor: 'white',
    borderColor: '#D9D9D9',
  },
  selectedDay: { backgroundColor: 'orange' },
  selectedDayFont: { color: 'white' },
  todayHighlight: { borderColor: '#00adf5', borderWidth: 2 },
  dayText: { fontSize: 22 },
  dateText: { fontSize: 20, paddingBottom: 9 },
});
