import React, {useEffect, useState} from 'react';
import {View, Text, Button, Platform, PermissionsAndroid} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {styles} from '@/styles/styles';
import MyFavoriteScreen from '@/screens/myPage/MyFavoriteScreen';
import ingredientExtractionApi from '@/apis/ingredientExtractionApi';

const imagePickerOption = {
  mediaType: 'photo',
  includeBase64: Platform.OS === 'android',
};
function CameraButton() {
  const [response, setResponse] = useState(null);
  const [imageFile, setImageFile] = useState('');
  const [extractText, setExtractText] = useState('');
  const [apiResponse, setApiResponse] = useState('');
  const [ingredientList, setIngredientList] = useState([]);
  // const [loading, setLoading] = useState(false);
  // 선택 사진 또는 촬영된 사진 정보
  const onPickImage = res => {
    if (res.didCancel || !res) {
      return;
    }
    //console.log('PickImage', res);
    // console.log('!');
    setResponse(res);
    setImageFile(res.assets[0].base64);
  };

  // 카메라 촬영

  const onLaunchCamera = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        launchCamera(imagePickerOption, onPickImage);
        // console.log('Camera permission given');
      } else {
        // console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  // 갤러리에서 사진 선택
  const onLaunchImageLibrary = () => {
    launchImageLibrary(imagePickerOption, onPickImage);
  };

  useEffect(() => {
    if(imageFile !== ''){
      callGoogleVIsionApi(imageFile);
    }
  }, [imageFile]);

  const callGoogleVIsionApi = async (base64: String) => {
    let url: string =
      'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyC6QBRMhadBvm7vfy00XFPpWuoGK1WboXA';
    // console.log(url);
    // console.log(base64.substring(0, 20));
    await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        requests: [
          {
            image: {
              content: base64,
            },
            features: [{type: 'TEXT_DETECTION', maxResults: 50}],
          },
        ],
      }),
    })
      .then(res => res.json())
      .then(data => {
        let res = data.responses[0].fullTextAnnotation.text;
        res.replace(/\n|\r|\s*/g, '');
        setExtractText(res);
      })
      .catch(err => console.log('error : ', err));
  };

  useEffect(() => {
    async function getIngredient() {
      if (extractText !== '') {
        try {
          // console.log('Trying to send');
          let extractResponse = await ingredientExtractionApi.extraction(
            extractText,
          );
          setIngredientList(extractResponse.data.data.data);
          // console.log(extractResponse.data.data.data);
        } catch (e) {
          console.log('err', e);
        }
      }
    }
    getIngredient();
  }, [extractText]);
  //   내부 스토리지에서 화면으로 파일을 못 보여줌. 밑의 주석 참조
  return (
    <View>
      <Button title="Camera" onPress={onLaunchCamera}>
        사진촬영
      </Button>
      <Button title="Gallery" onPress={onLaunchImageLibrary}>
        이미지 갤러리에서 가져오기
      </Button>
      {/*  <Image source={{uri:response?.uri}}>*/}
      <Text>
        {ingredientList.map((ingredient, idx) => (
          <Text>
            'id' : {ingredient.ingredient.id} 'name': {ingredient.ingredient.name}
          </Text>
        ))}
      </Text>
    </View>
  );
}
export default CameraButton;
