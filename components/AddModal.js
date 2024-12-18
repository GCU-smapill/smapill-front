import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TextInputModal from './TextInputModal';
import CameraScreen from './CameraScreen'

const AddModal = ({ visible, onClose }) => {
  const [isVisible, setIsVisible] = useState(visible); // 실제 렌더링 여부
  const [textInputModalVisible, setTextInputModalVisible] = useState(false);
  const [cameraVisible, setCameraVisible] = useState(false); // 카메라 화면 상태
  const slideAnim = useState(new Animated.Value(300))[0]; // 슬라이드 애니메이션 초기 값

  // 모달 열릴 때와 닫힐 때 애니메이션 실행
  useEffect(() => {
    if (visible) {
      setIsVisible(true); // 모달을 보이게 설정
      Animated.timing(slideAnim, {
        toValue: 0, // 위로 슬라이드
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 300, // 아래로 슬라이드
        duration: 300,
        useNativeDriver: true,
      }).start(() => setIsVisible(false)); // 애니메이션 완료 후 모달 숨기기
    }
  }, [visible]);

  if (!isVisible) return null; // 모달을 언마운트하여 화면에서 제거

  return (
    <Modal transparent={true} animationType="fade">
      {/* 배경 터치 시 닫기 */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalBackground} />
      </TouchableWithoutFeedback>

      {/* 슬라이드 애니메이션 적용 */}
      <Animated.View
        style={[
          styles.modalContainer,
          { transform: [{ translateY: slideAnim }] },
        ]}
      >
        <Text style={styles.title}>복용기록 만들기</Text>

        <TouchableOpacity
          onPress={() => {
            setTextInputModalVisible(true)
            console.log('직접 입력')}
          }
          style={styles.optionButton}
        >
          <MaterialCommunityIcons name="lead-pencil" size={30} color="black" />
          <Text style={styles.optionText}>복약 스케쥴(직접 입력)</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setCameraVisible(true)
            console.log('처방전 사진 입력')}}
          style={styles.optionButton}
        >
          <MaterialCommunityIcons name="camera" size={30} color="black" />
          <Text style={styles.optionText}>복약 스케쥴(처방전 사진)</Text>
        </TouchableOpacity>

        {/* 닫기 버튼 */}
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>닫기</Text>
        </TouchableOpacity>
      </Animated.View>
      
      <TextInputModal
          visible={textInputModalVisible}
          onClose={() => {
            setTextInputModalVisible(false)
            onClose()
          }}
          onSave={(data) => {
            console.log(data);
          }}
        />

      {/* 카메라 화면 */}
      {cameraVisible && (
        <CameraScreen
          onClose={() => {
            setCameraVisible(false);
            onClose()
            console.log('카메라 닫기');
          }}
        />
      )}

    </Modal>
  );
};

export default AddModal;

// 스타일 설정
const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  optionText: {
    fontSize: 18,
    marginLeft: 10,
  },
  closeButton: {
    width:'100%',
    marginTop: 5,
    marginBottom : 15,
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
  },
  closeButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
});