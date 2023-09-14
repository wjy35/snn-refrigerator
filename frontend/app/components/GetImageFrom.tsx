import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View, Image, PermissionsAndroid} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {styles} from "@/styles/styles";

const GetImageFrom = () => {
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

  const cameraFile = () => {
    const requestCameraPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
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
            console.log(err);
          });
        } else {
          console.log("Camera permission denied");
        }
      } catch (err) {
        console.log(err);
      }
    };
    requestCameraPermission().catch((err) => {console.log(err)});
  }

  return (
    <>
      <View>
        <TouchableOpacity onPress={selectFile}>
          <Text>갤러리</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={cameraFile}>
          <Text>카메라</Text>
        </TouchableOpacity>
        {image?.assets[0]?.uri && <Image source={{uri:image.assets[0].uri}} style={[styles.image]}/>}
      </View>
    </>
  );
};

export default GetImageFrom;
