import React, { useState, useContext, useEffect  } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Modal, TextInput, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { UserContext } from './context/UserContext'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Login from './screens/Login';
import Home from './screens/Home';
import Add from './screens/Add';
import Settings from './screens/Settings';
import { StatusBar } from 'expo-status-bar';
import InputModal from './components/InputModal';
import { MedicineContext } from './context/MedicineContext';
import { MedicineProvider } from './context/MedicineContext';


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
const MainTabs = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { MedicineSchedule } = useContext(MedicineContext);
  const [inputValue, setInputValue] = useState({});
  const [medicineData, setMedicineData] = useState(null);
  
  return(
    <>
    <UserContext.Provider value={"김진성"}>
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
                setModalVisible(true);
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

     {/* 모달 창 */}
     <InputModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={(data) => {
        }}
      />
    </UserContext.Provider>
  </>)
};

export default function App() {
  return (
    <MedicineProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </MedicineProvider>
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

