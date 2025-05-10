import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, StyleSheet } from 'react-native';
import useStore from '../store/useStore';

const UserSelectDropdown = ({ onClose }) => {
  const loggedInAccount = useStore(state => state.loggedInAccount);
  const users = useStore(state => state.users);
  const currentUserId = useStore(state => state.currentUserId);
  const setCurrentUser = useStore(state => state.setCurrentUser);
  const addUser = useStore(state => state.addUser);

  const [newUserName, setNewUserName] = useState('');

  // 🔹 보호자인 경우만 사용자 목록 표시
  if (!loggedInAccount) return null;

  const handleUserChange = (id) => {
    setCurrentUser(id);
    onClose();
  };

  const handleAddUser = () => {
    if (newUserName.trim()) {
      addUser(newUserName.trim());
      setNewUserName('');
      onClose();
    }
  };

  return (
    <View style={styles.dropdown}>
      <Text style={styles.title}>관리할 사용자 선택</Text>
      
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.userItem,
              item.id === currentUserId && styles.userItemActive,
            ]}
            onPress={() => handleUserChange(item.id)}
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text>등록된 사용자가 없습니다.</Text>}
      />

      <TextInput
        placeholder="새 사용자 이름"
        value={newUserName}
        onChangeText={setNewUserName}
        style={styles.input}
      />
      <TouchableOpacity onPress={handleAddUser} style={styles.addButton}>
        <Text style={{ color: 'white' }}>사용자 추가</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
        <Text style={{ color: 'gray' }}>닫기</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserSelectDropdown;

const styles = StyleSheet.create({
  dropdown: {
    position: 'absolute',
    top: 65,
    left: 10,
    width: 220,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    zIndex: 100,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  userItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  userItemActive: {
    backgroundColor: '#e0ffe0',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 6,
    borderRadius: 6,
    marginTop: 10,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 8,
    borderRadius: 6,
    marginTop: 10,
    alignItems: 'center',
  },
  cancelButton: {
    alignItems: 'center',
    marginTop: 5,
  },
});
