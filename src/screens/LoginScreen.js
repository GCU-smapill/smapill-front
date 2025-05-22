// src/screens/LoginScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import LoginForm from '../components/LoginForm';

const { width, height } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
  const onSuccess = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'MainTabs' }],
    });
  };

  const onSignUp = () => {
    navigation.navigate('SignUp')
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.inner} keyboardShouldPersistTaps="handled">
          <View style={styles.container}>
            <View style={styles.bgOrange}>
              <View style={{ width: '100%', height: '100%', alignItems: 'center' }}>
                <Image
                  source={require('../assets/icon.png')}
                  style={{ marginTop: '17%', width: 90, height: 90, borderRadius: 30 }}
                />
                <Text style={{ fontSize: 25, color: 'white' }}>smapill</Text>
                <View style={styles.loginContainer}>
                  <Text style={styles.descriptionTop}>스마필에 오신 것을 환영합니다.</Text>
                  <Text style={styles.descriptionBottom}>스마트한 건강관리, 스마필과 함께</Text>
                  <LoginForm onSuccess={{onSuccess,onSignUp}} />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    width: `${width}`,
    height: `${height}`,
  },
  bgOrange: {
    width: '100%',
    height: '60%',
    marginTop: -10,
    borderRadius: 10,
    backgroundColor: '#FF9131',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginContainer: {
    width: '90%',
    height: '90%',
    marginTop: '5%',
    borderRadius: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  descriptionTop: { fontSize: 20, fontWeight: '600', marginTop: -35 },
  descriptionBottom: { fontSize: 20, fontWeight: '500', color: 'grey', marginBottom: 50 },
});

export default LoginScreen;
