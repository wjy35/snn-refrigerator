import React, {useState, useEffect} from 'react';
import {View, Button, PermissionsAndroid, Platform, Linking, Alert} from 'react-native';
import {styles} from '@/styles/styles';
import AudioRecord from 'react-native-audio-record';
import RNFS from 'react-native-fs';
import ingredientExtractionApi from '@/apis/ingredientExtractionApi';

function STT() {
  const [isRecording, setIsRecording] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [extractText, setExtractText] = useState('');
  const [ingredientList, setIngredientList] = useState([]);

  const openSettings = () => {
    Linking.openSettings();
  };

  const askForPermission = async () => {
    try {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,
      ]).then(result => {
        if (
          result['android.permission.READ_MEDIA_AUDIO'] &&
          result['android.permission.RECORD_AUDIO'] === 'granted'
        ) {
          setPermissionGranted(true);
        } else if (
          result['android.permission.READ_MEDIA_AUDIO'] ||
          result['android.permission.RECORD_AUDIO'] === 'never_ask_again'
        ) {
          Alert.alert(
            'Storage Permission Required',
            'App needs access to your storage to read files. Please go to app settings and grant permission.',
            [
              {text: 'Cancel', style: 'cancel'},
              {text: 'Open Settings', onPress: openSettings},
            ],
          );
          throw new Error('Go to settings.');
        } else {
          throw new Error('Could not get permissions.');
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
  const startRecording = async () => {
    if(isRecording){
      return;
    }
    await askForPermission().then(async () => {
      const options = {
        sampleRate: 44100,  // default 44100
        channels: 1,        // 1 or 2, default 1
        bitsPerSample: 16,  // 8 or 16, default 16
        audioSource: 6,     // android only (see below)
        wavFile: 'test.wav' // default 'audio.wav'
      };
      AudioRecord.init(options);
      AudioRecord.start();
      console.log('start');
      setIsRecording(true);
    });
  };


  const stopRecording = async () => {
    if(!isRecording){
      return;
    }
    try{
      const result = await AudioRecord.stop();
      console.log('stopResult: ', result);
      const content = await RNFS.readFile(result, 'base64');
      let url: string =
        'https://speech.googleapis.com/v1/speech:recognize?key=AIzaSyDGj0_W2O-kfEaWX6uEdDf8UrqY8wjG-yk';

      const requestConfig= {
        encoding: 'LINEAR16',
        sampleRateHertz: 44100,
        languageCode: 'ko-KR',
      };

      const requestAudio = {
        content: content,
      };

      const request = {
        config: requestConfig,
        audio: requestAudio,
      };

      setIsRecording(false);

      await fetch(url, {
        method: 'POST',
        body: JSON.stringify(request),
      })
        .then(res => {
          console.log(res);
          return res.json();
        })
        .then(data => {
          let speechData: string = data.results[0].alternatives[0].transcript;
          speechData.replace(' ', '');
          setExtractText(speechData);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    async function getIngredient() {
      if (extractText !== '') {
        try {
          console.log('Trying to send');
          let extractResponse = await ingredientExtractionApi.extraction(
            extractText,
          );
          setIngredientList(extractResponse.data.data.data);
          console.log(extractResponse.data.data.data);
        } catch (e) {
          console.log('err', e);
        }
      }
    }
    getIngredient();
  }, [extractText]);

  return(
    <View style = {styles.layout}>
      <Button title = 'Start' onPress = {startRecording}/>
      <Button title = 'Stop' onPress = {stopRecording}/>
    </View>
  );
}

export default STT;
