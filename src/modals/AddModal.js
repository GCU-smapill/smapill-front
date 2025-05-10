// AddModal.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';  // ✅ 추가

const AddModal = ({ visible, onClose }) => {
  const navigation = useNavigation();
  const [isVisible, setIsVisible] = useState(visible);
  const slideAnim = useState(new Animated.Value(300))[0];

  useEffect(() => {
    if (visible) {
      setIsVisible(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 300,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setIsVisible(false));
    }
  }, [visible]);

  if (!isVisible) return null;

  return (
      <Modal
        transparent={true}
        animationType="fade"
        statusBarTranslucent
      >
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.modalBackground} />
        </TouchableWithoutFeedback>

        <Animated.View style={[styles.modalContainer, { transform: [{ translateY: slideAnim }] }]}>
          <Text style={styles.title}>복용기록 만들기</Text>

          <TouchableOpacity
            onPress={() => {
              onClose();
              navigation.navigate('TextInputModal');
            }}
            style={styles.optionButton}
          >
            <MaterialCommunityIcons name="lead-pencil" size={30} color="black" />
            <Text style={styles.optionText}>복약 스케쥴(직접 입력)</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              onClose();
              navigation.navigate('CameraScreen');
            }}
            style={styles.optionButton}
          >
            <MaterialCommunityIcons name="camera" size={30} color="black" />
            <Text style={styles.optionText}>복약 스케쥴(처방전 사진)</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>닫기</Text>
          </TouchableOpacity>
        </Animated.View>
      </Modal>
  );
};

export default AddModal;

const styles = StyleSheet.create({
  container: { flex: 1 },
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
    width: '100%',
    marginTop: 5,
    marginBottom: 15,
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
