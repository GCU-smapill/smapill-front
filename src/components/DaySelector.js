import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import moment from 'moment';

const screenWidth = Dimensions.get('window').width;
const itemWidth = screenWidth / 7;

const DaySelector = ({ weekDays, selectedDate, onSelect, today }) => {
  return (
    <View style={styles.container}>
      {weekDays.map((item) => (
        <View key={item} style={{ width: itemWidth }}>
          <View style={styles.dayDisplay}>
            <Text style={styles.dayText}>{moment(item).format('ddd')}</Text>
          </View>
          <TouchableOpacity
            style={[
              styles.dayContainer,
              item === selectedDate && styles.selectedDay,
              item === today && styles.todayHighlight,
            ]}
            onPress={() => onSelect(item)}
          >
            <Text style={styles.dateText}>{moment(item).format('DD')}</Text>
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
    backgroundColor: 'white',
  },
  dayDisplay: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
  dayContainer: {
    justifyContent: 'center',
    borderColor: "gray",
    borderWidth: 1,
    alignItems: 'center',
    height: 50,
    backgroundColor: 'white',
    borderColor: '#D9D9D9',
  },
  selectedDay: { backgroundColor: '#00adf5' },
  todayHighlight: { borderColor: 'orange', borderWidth: 2 },
  dayText: { fontSize: 22 },
  dateText: { fontSize: 24 },
});
