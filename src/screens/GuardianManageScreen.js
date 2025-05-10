import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import useStore from '../store/useStore';
import { useNavigation } from '@react-navigation/native';

const GuardianManageScreen = () => {
  const navigation = useNavigation();
  const { users, currentUserId } = useStore();
  const currentUser = users.find(u => u.id === currentUserId);

  const guardians = currentUser?.guardians || [];

  const handleEdit = (guardian) => {
    alert(`${guardian.name} 수정 기능은 추후 추가됩니다!`);
  };

  const handleDelete = (guardian) => {
    alert(`${guardian.name} 삭제 기능은 추후 추가됩니다!`);
  };

  const renderGuardian = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.name}>👤 {item.name}</Text>
      <Text style={styles.phone}>📞 {item.phone}</Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(item)}>
          <Text style={styles.editText}>✏️ 수정</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item)}>
          <Text style={styles.deleteText}>❌ 삭제</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>보호자 관리</Text>
      <Text style={styles.subtitle}>등록된 보호자를 확인하고 관리하세요.</Text>

      {guardians.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>😕 등록된 보호자가 없습니다.</Text>
        </View>
      ) : (
        <FlatList
          data={guardians}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderGuardian}
          contentContainerStyle={styles.listContainer}
        />
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('GuardianRegister')}
      >
        <Text style={styles.addButtonText}>+ 보호자 추가하기</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GuardianManageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 100,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
  },
  phone: {
    fontSize: 16,
    color: '#555',
    marginVertical: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  editButton: {
    marginRight: 15,
  },
  editText: {
    color: '#007BFF',
    fontSize: 16,
  },
  deleteButton: {},
  deleteText: {
    color: '#FF4D4F',
    fontSize: 16,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: '#FF9131',
    padding: 13,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'thin',
  },
});
