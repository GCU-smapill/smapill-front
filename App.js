import React, {useEffect, useState} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [loginResult, setLoginResult] = useState('로딩 중...');

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  // ✅ 로그인 요청 함수
  const login = async () => {
    try {
      const response = await fetch('http://172.25.85.122:8080/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'jinsung@naver.com',
          password: '*1234qweR*',
        }),
      });

      if (!response.ok) {
        setLoginResult(`로그인 실패: ${response.status}`);
        return;
      }

      const data = await response.json();
      // 응답값을 문자열로 변환해서 보여줌
      setLoginResult(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('로그인 중 오류:', error);
      setLoginResult('에러 발생: ' + error);
    }
  };

  // 컴포넌트가 처음 렌더링될 때 로그인 요청
  useEffect(() => {
    login();
  }, []);

  return (
    <View style={[backgroundStyle, styles.container]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Text style={styles.title}>안드로이드에서 프론트,백엔드 연동 테스트입니다.</Text>
      <Text style={styles.responseText}>{loginResult}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  responseText: {
    fontSize: 16,
    color: '#333',
  },
});

export default App;
