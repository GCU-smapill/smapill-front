import React, { useState, useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Modal, TextInput, ActivityIndicator, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Login from './screens/Login';
import Home from './screens/Home';
import Add from './screens/Add';
import Settings from './screens/Settings';
import { StatusBar } from 'expo-status-bar';
import TextInputModal from './components/TextInputModal';
import { MedicineContext } from './context/MedicineContext';
import { MedicineProvider } from './context/MedicineContext';
import AddModal from './components/AddModal';
import { RecoilRoot } from 'recoil';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// 아이콘 컴포넌트
const TabIcon = ({ name, color, size }) => (
  <MaterialCommunityIcons name={name} color={color} size={size} />
);

// 빈 컴포넌트 (추가 탭에 사용)
const EmptyScreen = () => null;

// 커스텀 추가 버튼
const CustomAddButton = ({ onPress }) => (
  <TouchableOpacity style={styles.customAddButton} onPress={onPress}>
    <MaterialCommunityIcons name="plus" size={50} color="white" />
  </TouchableOpacity>
);

// 메인 탭 Navigator
const MainTabs = () => {
  const [addModalVisible, setAddModalVisible] = useState(false);
  
  return(
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor='orange'
      />
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            height: 100, // 전체 탭 바 높이
            backgroundColor: '#fff',
            borderTopWidth: 0.5,
            borderTopColor: '#ddd',
          },
          tabBarItemStyle: { height: 70 }, // 모든 탭 아이템의 높이 설정
          tabBarActiveTintColor: 'orange',
          tabBarInactiveTintColor: 'black',
          tabBarLabelStyle: {
            fontSize: 15,
            fontWeight: '500',
          },
          headerShown: false,
        }}
      >
        {/* 메인화면 */}
      <Tab.Screen
        name="메인화면"
        component={Home}
        options={{
          tabBarIconStyle:{
            width:50,
            height:50
          },
          tabBarIcon: ({ color, size }) => <TabIcon name="home" color={color} size={45} />,
        }}
      />

      {/* 추가 버튼 */}
      <Tab.Screen
        name="추가"
        component={EmptyScreen}
        options={{
          tabBarButton: () => (
            <CustomAddButton
              onPress={() => {
                setAddModalVisible(true);
                console.log('추가 버튼 클릭!');
              }}
            />
          ),
        }}
      />

      {/* 설정 */}
      <Tab.Screen
        name="설정"
        component={Settings}
        options={{
          tabBarIconStyle:{
            width:50,
            height:50
          },
          tabBarIcon: ({ color, size }) => <TabIcon name="cog" color={color} size={40} />,
        }}
      />
    </Tab.Navigator>
    
    <AddModal
      visible={addModalVisible}
      onRequestClose={() => setAddModalVisible(false)}
      onClose={() => {
        setAddModalVisible(false)
      }}
    />
  </>)
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태
  const [loading, setLoading] = useState(true); // 초기 로딩 상태

  useEffect(() => {
    // 예시: AsyncStorage 또는 SecureStore에서 로그인 토큰 확인
    const checkLoginStatus = async () => {
      try {
        const token = null; // 예시: 저장된 토큰 불러오기
        if (token) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.log('자동 로그인 확인 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  if (loading) {
    // 초기 로딩 상태 표시
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#FF9131" />
      </View>
    );
  }

  return (
    <RecoilRoot>
      <MedicineProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </MedicineProvider>
    </RecoilRoot>
  );
}

const styles = StyleSheet.create({
  customAddButton: {
    marginLeft:"25%",
    backgroundColor: 'orange',
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 0, // 탭 바 위로 올림
    elevation: 5, // 그림자 효과
    position: 'absolute',
    top: 3, // 탭 바 위에 위치하도록 조정
    zIndex: 10, // 다른 탭 항목보다 위로
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  closeButton: {
    backgroundColor: 'orange',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: 'orange',
    padding: 15,
    borderRadius: 10,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

