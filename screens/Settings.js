import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Settings = ({ navigation }) => (
  <View style={styles.container}>
    <Text>Settings Fragment</Text>
    <Button title="Logout" onPress={() => navigation.replace('Login')} />
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default Settings;
