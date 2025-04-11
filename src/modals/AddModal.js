// components/AddModal.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
  KeyboardAvoidingView
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import TextInputModal from './TextInputModal';
import CameraScreen from './CameraScreen';

const AddModal = ({ visible, onClose }) => {
  const [isVisible, setIsVisible] = useState(visible);
  const [textInputModalVisible, setTextInputModalVisible] = useState(false);
  const [cameraVisible, setCameraVisible] = useState(false);
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
    <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
    >
    <Modal transparent={true} animationType="fade">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalBackground} />
      </TouchableWithoutFeedback>

      <Animated.View style={[styles.modalContainer, { transform: [{ translateY: slideAnim }] }]}>
        <Text style={styles.title}>복용기록 만들기</Text>

        <TouchableOpacity
          onPress={() => {
            setTextInputModalVisible(true);
          }}
          style={styles.optionButton}
        >
          <MaterialCommunityIcons name="lead-pencil" size={30} color="black" />
          <Text style={styles.optionText}>복약 스케쥴(직접 입력)</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setCameraVisible(true);
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

      <TextInputModal
        visible={textInputModalVisible}
        onClose={() => {
          setTextInputModalVisible(false);
          onClose();
        }}
      />

      {cameraVisible && (
        <CameraScreen
          onClose={() => {
            setCameraVisible(false);
            onClose();
          }}
        />
      )}
    </Modal>
    </KeyboardAvoidingView>
  );
};

export default AddModal;

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
