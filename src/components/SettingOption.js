// components/SettingOption.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SettingOption = ({ label, onPress, danger = false }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.optionContainer}
    >
      <Text style={[styles.label, danger && { color: 'red' }]}>{label}</Text>
      <MaterialCommunityIcons name="chevron-right" style={styles.icon} />
    </TouchableOpacity>
  );
};

export default SettingOption;

const styles = StyleSheet.create({
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    backgroundColor: 'white',
    borderBottomColor: '#dee2e6',
    borderBottomWidth: 2,
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 20,
    color: 'black',
  },
  icon: {
    fontSize: 50,
    color: '#333',
  },
});
