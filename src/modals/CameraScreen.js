import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  Linking,
} from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import useScheduleStore from '../store/useScheduleStore';
import useAuthStore from '../store/useAuthStore';

const CameraScreen = () => {
  const navigation = useNavigation();   // ✅ 네비게이션 훅 추가
  const [hasPermission, setHasPermission] = useState(false);
  const cameraRef = useRef(null);

  const token = useAuthStore((state) => state.token);
  const device = useCameraDevice('back');

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.getCameraPermissionStatus();
      if (cameraStatus !== 'granted') {
        await Camera.requestCameraPermission();
      }
      const finalStatus = await Camera.getCameraPermissionStatus();
      console.log('📸 Final camera status:', finalStatus);
      setHasPermission(finalStatus === 'granted');
    })();
  }, []);

  const getDatesBetween = (start, end) => {
    const dates = [];
    let currentDate = new Date(start);
    const finalDate = new Date(end);
    while (currentDate <= finalDate) {
      dates.push(new Date(currentDate).toLocaleDateString());
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  };

  const handleCapture = async () => {
    try {
      if (!cameraRef.current) {
        Alert.alert('오류', '카메라가 아직 초기화되지 않았습니다.');
        return;
      }

      const photo = await cameraRef.current.takePhoto({ flash: 'off' });
      const fileUri = Platform.OS === 'android' ? `file://${photo.path}` : photo.path;

      const formData = new FormData();
      formData.append('file', {
        uri: fileUri,
        name: `photo_${Date.now()}.png`,
        type: 'image/png',
      });

      
      const uploadResponse = await fetch('http://134.185.109.176:5000/upload', {
        method: 'POST',
        body: formData,
      });

      const uploadData = await uploadResponse.json();
      if (uploadData.message === null) {
        Alert.alert('업로드 실패', uploadData.message);
      }

      const ocrResponse = await fetch('http://134.185.109.176:5000/download', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const Data = await ocrResponse.json();
      
      navigation.navigate('CameraInputModal', {
        ocrData : Data
      });
    } catch (err) {
      console.error(err);
      Alert.alert('오류 발생', '사진 촬영 또는 업로드 중 문제가 발생했습니다.');
    }
  };

  if (!hasPermission) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>
          카메라 권한이 없습니다. 설정에서 허용해주세요.
        </Text>
        <TouchableOpacity
          onPress={() => Linking.openSettings()}
          style={styles.permissionButton}
        >
          <Text style={{ color: 'white' }}>설정 열기</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!device) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>카메라 장치를 찾는 중입니다...</Text>
      </View>
    );
  }

  return (
    <View style={styles.fullscreen}>
      <Camera
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo={true}
      />

      <View style={styles.controls}>
        {/* 카메라 전환 버튼 - 현재 기능은 미구현 */}
        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => Alert.alert('준비 중', '카메라 전환 기능은 아직 구현되지 않았습니다.')}
        >
          <MaterialCommunityIcons name="rotate-3d-variant" style={styles.icon} />
        </TouchableOpacity>

        {/* 촬영 버튼 */}
        <TouchableOpacity style={styles.captureButton} onPress={handleCapture}>
          <MaterialCommunityIcons
            name="checkbox-blank-circle-outline"
            style={{ fontSize: 70 }}
          />
        </TouchableOpacity>

        {/* 종료 버튼 */}
        <TouchableOpacity style={styles.controlButton} onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="window-close" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
    backgroundColor: 'black',
    position: 'relative',
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  permissionText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  permissionButton: {
    padding: 10,
    backgroundColor: 'orange',
    borderRadius: 10,
  },
  controls: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  controlButton: {
    width: 60,
    height: 60,
    backgroundColor: 'white',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    width: 80,
    height: 80,
    backgroundColor: 'white',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 40,
    color: 'black',
  },
});
