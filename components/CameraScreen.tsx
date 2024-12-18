import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Camera, CameraType, CameraView } from 'expo-camera';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { MedicineContext } from '../context/MedicineContext';
import { tokenState } from '../state';
import {useSetRecoilState} from 'recoil'

const CameraScreen = ({ onClose }) => {
  const [hasPermission, setHasPermission] = useState(null); // 카메라 권한 상태
  const [cameraRef, setCameraRef] = useState(null); // 카메라 참조
  const [type, setType] = useState<CameraType>('back'); // 카메라 타입 (전면/후면)
  const [photoUri, setPhotoUri] = useState('');
  const { medicineSchedule ,updateMedicineSchedule } = useContext(MedicineContext);

  const ServerResponse = async () => {
    // 서버 응답 
    const userResponse = await fetch('http://134.185.109.176:5000/download', {
      method: 'GET',
      headers: { Authorization: `Bearer ${tokenState}` },
    });

    const OCRResponse = await userResponse.json();

    return OCRResponse
  };

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

  const handleTakePicture = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();
      setPhotoUri(photo.uri);

      try {
        // FormData 객체 생성
        const formData = new FormData();
        formData.append('file', {
          uri: photo.uri,
          name: `photo_${Date.now()}.png`, // 파일 이름
          type: 'image/png', // 파일 MIME 타입
        });
  
        // 서버에 사진 업로드
        const response = await fetch('http://134.185.109.176:5000/upload', {
          method: 'POST',
          body: formData,
        });
  
        // 서버 응답 확인
        const responseData = await response.json();
        console.log('서버 응답:', responseData);
  
        // 업로드 성공 처리
        if (responseData.message !== null) {
          Alert.alert('업로드 성공', '사진이 서버에 성공적으로 업로드되었습니다.');
        } else {
          Alert.alert('업로드 실패', responseData.message || '사진 업로드 중 오류가 발생했습니다.');
        }
      } catch (error) {
        console.error('업로드 오류:', error);
        Alert.alert('업로드 실패', '서버에 사진을 업로드할 수 없습니다.');
      }

      // 서버 응답을 가정하고 Context 업데이트
      const serverResponse = ServerResponse();

      const newSchedule = {};

      // 서버에서 받아온 각 약품에 대해 처리
      serverResponse.forEach((medicine) => {
        // 약품의 시작일과 종료일 사이의 모든 날짜 구하기
        const allDates = getDatesBetween(medicine.dates[0], medicine.dates[1]);

        allDates.forEach((date) => {
          if (!newSchedule[date]) {
            newSchedule[date] = {}; // 해당 날짜의 시간대 초기화
          }

          // 각 시간대에 약품 추가
          medicine.timeOptions.forEach((time) => {
            if (!newSchedule[date][time]) {
              newSchedule[date][time] = []; // 시간대에 약품 배열 초기화
            }

            newSchedule[date][time].push({
              id: new Date().getTime() + Math.random(), // 고유 ID 생성
              medicineName: medicine.medicineName,
              isTaken: false,
              dose: medicine.dose,
            });
          });
        });
      });

      // Context 업데이트
      updateMedicineSchedule(newSchedule);
      console.log('업데이트된 복약 스케줄:', JSON.stringify(medicineSchedule, null, 2));
    }
  };

  // 카메라 권한 요청
  useEffect(() => {
    const getCameraPermission = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getCameraPermission();
  }, []);

  if (hasPermission === null) {
    return <View><Text>권한 요청 중...</Text></View>;
  }

  if (hasPermission === false) {
    return <View><Text>카메라 권한이 필요합니다.</Text></View>;
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={type}
        ref={(ref) => setCameraRef(ref)}>
        <View style={styles.buttonContainer}>
          {/* 버튼 컨테이너 */}
          <View style={styles.buttonBox}>
            {/* 카메라 전환 버튼 */}
            <TouchableOpacity
              style={styles.changeToggleButton}
              onPress={() => {
                console.log(type)
                setType(
                  type === 'back' ? 'front' : 'back'
                );
              }}
            >
              <MaterialCommunityIcons name='rotate-3d-variant' style={styles.text}/>
            </TouchableOpacity>

            {/* 사진 찍기 버튼 */}
            <TouchableOpacity
              style={styles.takePhotoButton}
              onPress={async () => {
                if (cameraRef) {
                  handleTakePicture()
                  onClose(); // 사진 촬영 후 화면 닫기
                }
              }}
            >
              <MaterialCommunityIcons name='checkbox-blank-circle-outline' style={{fontSize:70}}/>
            </TouchableOpacity>

            {/* 닫기 버튼 */}
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <MaterialCommunityIcons name='window-close' style={styles.text}/>
            </TouchableOpacity>
          </View>
        </View>
      </CameraView>
    </View>
  );
};

export default CameraScreen;

// 스타일 정의
const styles = StyleSheet.create({
  container: {
    width:'100%',
    height:'100%'
  },
  camera: {
    flex:1
  },
  buttonContainer: {
    position:"absolute",
    bottom:0,
    height:120,
    width:"100%",
    backgroundColor:"",
    flexDirection:"row"
  },
  buttonBox: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    alignItems:"center",
    margin: 40,
    marginBottom:60
  },
  changeToggleButton:{
    width:60,
    height:60,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor: '#fff',
    borderRadius: "50%",
  },
  takePhotoButton: {
    width:80,
    height:80,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor: '#fff',
    borderRadius: "50%",
  },
  closeButton:{
    width:60,
    height:60,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor: '#fff',
    borderRadius: "50%",
  },
  text: {
    fontSize: 40,
    color: 'black',
  },
});
