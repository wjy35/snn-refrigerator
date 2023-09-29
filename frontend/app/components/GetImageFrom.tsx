import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View, Image, PermissionsAndroid, TouchableWithoutFeedback} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {styles} from "@/styles/styles";
import {MAIN_COLOR} from "@/assets/colors/colors";
import {SvgXml} from "react-native-svg";
import {closeBlackIcon} from "@/assets/icons/icons";

interface props {
  getImage: Function;
  setIsVisible: Function;
}
const GetImageFrom = ({getImage, setIsVisible}: props) => {
  const [image, setImage] = useState<any>();

  const closeModal = () =>{
    setIsVisible();
  }

  const selectFile = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 1,
      },
      (res) => {
        if (res.didCancel) return;
        setImage(res);
      }
    ).catch((err) => {
      console.log(err);
    });
  };


  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: '카메라 권한',
          message: '카메라 권한이 필요합니다',
          buttonNegative: '취소',
          buttonPositive: '확인',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        launchCamera(
          {
            mediaType: 'photo',
          },
          (res) => {
            if (res.didCancel) return;
            setImage(res);
          }
        ).catch((err) => {
          console.warn(err);
        });
      } else {
        // Todo: 카메라 권한을 거부하면 어플에서 재요청이 불가능 > 설정하라고 alert를 해야함
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    if (image) {
      getImage(image);
      closeModal();
    }
  }, [image]);

  return (
    <>
      <View style={{position: 'absolute', bottom: 0, left: 0, right: 0, width: '100%', height: 200, backgroundColor: 'white', zIndex: 101, borderWidth: 3, borderTopLeftRadius: 16, borderTopRightRadius: 16, borderColor: MAIN_COLOR, borderBottomWidth: 0}}>
        <View style={{flex: 1}}>
          <View style={{paddingTop: 10, paddingRight: 10, width: '100%', alignItems: 'flex-end'}}>
            <TouchableWithoutFeedback onPress={closeModal}>
              <SvgXml
                xml={closeBlackIcon}
                width={15}
                height={15}
              />
            </TouchableWithoutFeedback>
          </View>
          <TouchableWithoutFeedback onPress={selectFile}>
            <View style={{height: 60, marginHorizontal: 12, marginTop: 20, borderWidth: 1, padding: 10, borderRadius: 16, justifyContent: 'center'}}>
              <Text style={[styles.font]}>갤러리에서 등록하기</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={requestCameraPermission}>
            <View style={{height: 60, marginHorizontal: 12, marginTop: 5, borderWidth: 1, padding: 10, borderRadius: 16, justifyContent: 'center'}}>
              <Text style={[styles.font]}>카메라로 등록하기</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </>
  );
};
export default GetImageFrom;
