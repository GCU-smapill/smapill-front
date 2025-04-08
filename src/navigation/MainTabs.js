// app/navigation/MainTabs.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import ScheduleScreen from '../screens/ScheduleScreen';
import HomeScreen from '../screens/HomeScreen'; // 원래 위치 변경
import SettingsScreen from '../screens/SettingsScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const TabIcon = ({ name, color, size }) => (
    <MaterialCommunityIcons name={name} color={color} size={size} />
);

const MainTabs = ({ navigation }) => {
  return (
    <Tab.Navigator
        screenOptions={{
        tabBarStyle: {
          height: 85,
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#ddd',
        },
        tabBarItemStyle: { height: 70 },
        tabBarActiveTintColor: 'orange',
        tabBarInactiveTintColor: 'black',
        tabBarLabelStyle: {
          fontSize: 15,
          fontWeight: '500',
        },
        headerShown: false,
      }}
    >
        <Tab.Screen
          name="메인화면"
          component={ScheduleScreen}
          options={{
            tabBarIconStyle: { width: 50, height: 50 },
            tabBarIcon: ({ color, size }) => <TabIcon name="home" color={color} size={45} />,
          }}
        />
        <Tab.Screen
        name="AddButton"
        component={() => null}
        options={{
            tabBarButton: (props) => (
            <View style={styles.middleWrapper}>
                <TouchableOpacity
                {...props}
                style={styles.customButton}
                onPress={() => {
                    navigation.navigate('Schedule');
                }}
                >
                <Text style={{ fontSize: 24, color: 'white' }}>＋</Text>
                </TouchableOpacity>
            </View>
            ),
        }}
        />
        <Tab.Screen
          name="설정"
          component={SettingsScreen}
          options={{
            tabBarIconStyle: { width: 50, height: 50 },
            tabBarIcon: ({ color, size }) => <TabIcon name="cog" color={color} size={45} />,
          }}
        />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
    middleWrapper: {
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      width: '100%',
      height: '100%',
      paddingTop:"6%",
    },
    customButton: {
      width: 70,
      height: 70,
      borderRadius: "50%",
      backgroundColor: 'orange',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  

export default MainTabs;
