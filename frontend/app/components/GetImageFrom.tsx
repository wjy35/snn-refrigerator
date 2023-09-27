import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View, Image, PermissionsAndroid} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {styles} from "@/styles/styles";

interface props {
  getImage: Function;
}
const GetImageFrom = ({getImage}: props) => {
  const [image, setImage] = useState<any>();

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
    // image?.assets[0]?.uri && console.log(image.assets[0].uri)
    image && getImage(image);
  }, [image]);

  return (
    <>
      <View>
        <TouchableOpacity onPress={selectFile}>
          <Text>갤러리</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={requestCameraPermission}>
          <Text>카메라</Text>
        </TouchableOpacity>
        {image?.assets[0]?.uri && <Image source={{uri:image.assets[0].uri}} style={[styles.image]}/>}
      </View>
    </>
  );
};

export default GetImageFrom;
