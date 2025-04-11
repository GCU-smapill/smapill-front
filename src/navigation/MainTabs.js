import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import ScheduleScreen from '../screens/ScheduleScreen';
import SettingsScreen from '../screens/SettingsScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AddModal from '../modals/AddModal';

const Tab = createBottomTabNavigator();

const TabIcon = ({ name, color, size }) => (
  <MaterialCommunityIcons name={name} color={color} size={size} />
);

const MainTabs = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  return (
    <>
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
                  onPress={openModal}
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

      <AddModal visible={isModalVisible} onClose={closeModal} />
    </>
  );
};

const styles = StyleSheet.create({
  middleWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    paddingTop: '6%',
  },
  customButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MainTabs;