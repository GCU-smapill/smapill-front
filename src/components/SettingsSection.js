// components/SettingsSection.js
import React from 'react';
import { View, StyleSheet } from 'react-native';

const SettingsSection = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

export default SettingsSection;

const styles = StyleSheet.create({
  container: {
    flex: 7,
    width: '100%',
  },
});
