import React from 'react';
import { StyleSheet, Modal, View, Pressable, Text } from "react-native";

function CameraImageModal({visible, onClose, onLaunchCamera, onLaunchImageLibrary}){
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}>
      <Pressable style={ModalStyles.background} onPress={onClose}>
        <View style={ModalStyles.whiteBox}>
          <Pressable
            style={ModalStyles.actionButton}
            android_ripple={{color: "#eee"}}
            onPress={() => {
              onClose();
            }} >
            <Text style={ModalStyles.text}>기본 이미지 선택하기</Text>
          </Pressable>
          <Pressable
            style={ModalStyles.actionButton}
            android_ripple={{color: "#eee"}}
            onPress={() => {
              onLaunchCamera();
              onClose();
            }} >
            <Text style={ModalStyles.text}>카메라로 촬영하기</Text>
          </Pressable>
          <Pressable
            style={ModalStyles.actionButton}
            android_ripple={{color: "#eee"}}
            onPress={() => {
              onLaunchImageLibrary();
              onClose();
            }} >
            <Text style={ModalStyles.text}>사진 선택하기</Text>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  )
}

const ModalStyles = StyleSheet.create({
  background: {
    backgroundColor: "rgba(0,0,0,0,6)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  whiteBox: {
    width: 300,
    backgroundColor: "white",
    borderRadius: 4,
    elevation: 2,
  },
  actionButton: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontSize: 26,
  },
});

export default CameraImageModal;
