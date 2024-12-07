import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Login from './screens/Login';
import Home from './screens/Home';
import Add from './screens/Add';
import Settings from './screens/Settings';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabIcon = ({name, size, color}) => {
  return <MaterialCommunityIcons name={name} size={size} color={color} />
};


const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;

        // 각 탭에 아이콘 설정
        if (route.name === '홈') {
          iconName = 'home'; // 원하는 아이콘 이름
        } else if (route.name === '추가') {
          iconName = 'plus-circle-outline'; // Add 화면의 아이콘
        } else if (route.name === '설정') {
          iconName = 'cog'; // Settings 화면의 아이콘
        }

        // 아이콘 렌더링
        return <TabIcon name={iconName} color={color} size={size} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: 'tomato', // 활성 탭 색상
      inactiveTintColor: 'gray', // 비활성 탭 색상
      showLabel: false, // 탭 이름 숨김 (옵션)
    }}
  >
    <Tab.Screen name="홈" component={Home} options={{ headerShown: false }} />
    <Tab.Screen name="추가" component={Add} options={{ headerShown: false }}/>
    <Tab.Screen name="설정" component={Settings} options={{ headerShown: false }} />
  </Tab.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
