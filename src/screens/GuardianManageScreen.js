import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getDependentInfo } from '../apis/userLinkAPI'; // 경로는 실제 위치에 맞게 수정
import { Alert } from 'react-native';
import { deleteUserLink } from '../apis/userLinkAPI'; // 실제 경로에 맞게 수정
import useUserStore from '../store/useUserStore';

const GuardianManageScreen = () => {
  const navigation = useNavigation();
  const [guardians, setGuardians] = useState([]);
  const [loading, setLoading] = useState(true);
  const removeUserById = useUserStore((state) => state.removeUserById);

  useEffect(() => {
    const fetchGuardians = async () => {
      try {
        const response = await getDependentInfo();
        const result = response.result;

        console.log("피보호자 정보 Array", result)

        if (result) {
          setGuardians(result);
        } else {
          setGuardians([]); // 안전한 fallback
        }
      } catch (error) {
        console.error('피보호자 정보 조회 실패:', error);
        setGuardians([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGuardians();
  }, []);

  const handleEdit = (guardian) => {
    Alert.alert("공사중!",`수정 기능은 추후 추가됩니다!`);
  };

  const handleDelete = async (guardian) => {
    Alert.alert(
      '보호자 삭제',
      `${guardian.name} 보호자를 정말 삭제하시겠습니까?`,
      [
        {
          text: '취소',
          style: 'cancel',
        },
        {
          text: '삭제',
          style: 'destructive',
          onPress: async () => {
            try {
              deleteUserLink({ dependentId: guardian.id });
              removeUserById(guardian.id)
              // 성공 시 로컬 상태에서 삭제
              setGuardians((prev) => prev.filter((g) => g.id !== guardian.id));
              Alert.alert('삭제 완료', `${guardian.name} 보호자가 삭제되었습니다.`);
            } catch (error) {
              console.error('삭제 실패:', error);
              Alert.alert('오류', '보호자 삭제에 실패했습니다.');
            }
          },
        },
      ]
    );
  };

  const renderGuardian = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.name}>👤  {item.name}</Text>
      <Text style={styles.phone}>📞  {item.phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")}</Text>
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

      {loading ? (
        <View style={styles.emptyState}>
          <ActivityIndicator size="large" color="orange" />
          <Text>불러오는 중...</Text>
        </View>
      ) : guardians.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>😕 등록된 보호자가 없습니다.</Text>
        </View>
      ) : (
        <FlatList
          data={guardians}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderGuardian}
          contentContainerStyle={styles.listContainer}
        />
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.replace('GuardianRegister')}
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
    fontSize: 20,
    fontWeight: '600',
    padding: 5,
    paddingTop: 0,
  },
  phone: {
    fontSize: 20,
    color: '#555',
    padding: 5,
    paddingTop: 0,
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
    fontSize: 18,
  },
  deleteButton: {},
  deleteText: {
    color: '#FF4D4F',
    fontSize: 18,
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
