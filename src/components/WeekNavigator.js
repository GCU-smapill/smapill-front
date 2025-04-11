// components/WeekNavigator.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';

const WeekNavigator = ({ currentDate, onWeekChange }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onWeekChange(-1)}>
        <MaterialCommunityIcons name="chevron-left" size={40} />
      </TouchableOpacity>
      <Text style={styles.text}>
        {moment(currentDate).startOf('isoWeek').format('YYYY-MM-DD')} ~{' '}
        {moment(currentDate).endOf('isoWeek').format('YYYY-MM-DD')}
      </Text>
      <TouchableOpacity onPress={() => onWeekChange(1)}>
        <MaterialCommunityIcons name="chevron-right" size={40} />
      </TouchableOpacity>
    </View>
  );
};

export default WeekNavigator;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
  },
  text: {
    fontSize: 23,
    fontWeight: 'bold',
  },
});
