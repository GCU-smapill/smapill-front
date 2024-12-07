import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Add = ({ navigation }) => (
  <View style={styles.container}>
    <Text>Add Fragment</Text>
    <Button title="Add Something" onPress={() => alert('Item Added!')} />
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default Add;
