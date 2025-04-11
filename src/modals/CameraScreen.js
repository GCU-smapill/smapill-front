import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import useScheduleStore from '../store/useScheduleStore';
import useAuthStore from '../store/useAuthStore';
import { captureRef } from 'react-native-view-shot';

const CameraScreen = ({ onClose }) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [cameraPosition, setCameraPosition] = useState('back');
  const cameraRef = useRef(null);

  const { updateMedicineSchedule } = useScheduleStore();
  const token = useAuthStore((state) => state.token);
  const devices = useCameraDevices();
  const device = devices[cameraPosition];

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
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
      const photo = await cameraRef.current.takePhoto({
        flash: 'off',
      });

      const fileUri = `file://${photo.path}`;
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
      if (uploadData.message !== null) {
        Alert.alert('업로드 성공', '사진이 성공적으로 업로드되었습니다.');
      } else {
        Alert.alert('업로드 실패', uploadData.message);
      }

      const ocrResponse = await fetch('http://134.185.109.176:5000/download', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const ocrData = await ocrResponse.json();

      const newSchedule = {};
      ocrData.forEach((medicine) => {
        const allDates = getDatesBetween(medicine.dates[0], medicine.dates[1]);

        allDates.forEach((date) => {
          if (!newSchedule[date]) newSchedule[date] = {};
          medicine.timeOptions.forEach((time) => {
            if (!newSchedule[date][time]) newSchedule[date][time] = [];
            newSchedule[date][time].push({
              id: new Date().getTime() + Math.random(),
              medicineName: medicine.medicineName,
              isTaken: false,
              dose: medicine.dose,
            });
          });
        });
      });

      updateMedicineSchedule(newSchedule);
      onClose();
    } catch (err) {
      console.error(err);
      Alert.alert('오류 발생', '사진 촬영 또는 업로드 중 문제가 발생했습니다.');
    }
  };

  if (!device || !hasPermission) {
    return <View style={styles.container}><Text>카메라 권한 또는 장치가 준비되지 않았습니다.</Text></View>;
  }

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo={true}
      />
      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => setCameraPosition(prev => prev === 'back' ? 'front' : 'back')}
        >
          <MaterialCommunityIcons name="rotate-3d-variant" style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.captureButton} onPress={handleCapture}>
          <MaterialCommunityIcons name="checkbox-blank-circle-outline" style={{ fontSize: 70 }} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlButton} onPress={onClose}>
          <MaterialCommunityIcons name="window-close" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black' },
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
