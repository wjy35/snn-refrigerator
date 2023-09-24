import React, {useEffect, useState} from 'react';
import {View, Text, Button, Pressable, Platform, PermissionsAndroid, Image} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {getStorage, ref, uploadBytes, listAll, getDownloadURL,} from "firebase/storage";
import {styles} from '@/styles/styles';
import MyFavoriteScreen from "@/screens/myPage/MyFavoriteScreen";

const imagePickerOption = {
  mediaType: 'photo',
  includeBase64: Platform.OS === 'android',
};
function CameraButton() {
    const [response, setResponse] = useState(null);
    const [imageFile, setImageFile] = useState("");
  // const [loading, setLoading] = useState(false);
  // 선택 사진 또는 촬영된 사진 정보
  const onPickImage = res => {
    if (res.didCancel || !res) {
      return;
    }
    console.log('PickImage', res);
    let asset = res.assets[0];
    console.log(asset.uri);
    setResponse(asset);
    setImageFile(asset.base64);
  };

  // 카메라 촬영

  const onLaunchCamera = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "App Camera Permission",
          message:"App needs access to your camera ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        launchCamera(imagePickerOption, onPickImage);
        console.log("Camera permission given");
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };
  // 갤러리에서 사진 선택
  const onLaunchImageLibrary = () => {
    launchImageLibrary(imagePickerOption, onPickImage);
  };

  useEffect(()=>{
    console.log('Image uri');
    console.log(response);
  }, [response]);

  return (
    <View>
      <Button title="Camera" onPress={onLaunchCamera}>
        사진촬영
      </Button>
      <Button title="Gallery" onPress={onLaunchImageLibrary}>
        이미지 갤러리에서 가져오기
      </Button>
      <Image source={{uri: response?.uri}} />
      <Text>{response?.uri}</Text>
    </View>
  );
}

export default CameraButton;
