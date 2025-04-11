// components/UserSwitcher.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, StyleSheet, FlatList, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import useStore from '../store/useStore';

const UserSwitcher = () => {
  const { users, currentUserId, setCurrentUser, addUser } = useStore();
  const currentUser = users.find(u => u.id === currentUserId);

  const [modalVisible, setModalVisible] = useState(false);
  const [newUserName, setNewUserName] = useState('');

  const handleUserChange = (id) => {
    setCurrentUser(id);
    setModalVisible(false);
  };

  const handleAddUser = () => {
    if (newUserName.trim()) {
      addUser(newUserName.trim());
      setNewUserName('');
      setModalVisible(false);
    }
  };

  return (
    <View style={{width:"100%"}}>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.userBox}>
        <View style={styles.userIcon}>
            <Image
                source={require('../assets/default_user.jpg')}
                alt='userImage'
                style={{
                    width: 38,
                    height: 38,
                    borderRadius: 999,
                  }} />
        </View>
        <Text style={styles.userName}>{currentUser?.name}</Text>
        <MaterialCommunityIcons name={'chevron-down'} style={{paddingTop:2, fontSize:40, color:"grey"}}/>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>사용자 선택</Text>

            <FlatList
              data={users}
              keyExtractor={item => item.id.toString()}
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

            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelButton}>
              <Text style={{ color: 'gray' }}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  userBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:"center",
    margin: 10,
    padding: 5,
    paddingRight: 0,
    backgroundColor:"white",
    alignSelf:"flex-start",
    borderRadius: 15,
  },
  userIcon: {
    paddingRight: 6,
  },
  userName: {
    textAlign: 'center',
    fontSize: 24,
    color: 'grey',
  },
  modalOverlay: {
    display: "absolute",
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  userItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  userItemActive: {
    backgroundColor: '#e0ffe0',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginVertical: 10,
    borderRadius: 6,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    alignItems: 'center',
    borderRadius: 6,
    marginBottom: 10,
  },
  cancelButton: {
    alignItems: 'center',
  },
});

export default UserSwitcher;
