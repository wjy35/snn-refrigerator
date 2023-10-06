import React, {useEffect, useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  PermissionsAndroid,
  TouchableWithoutFeedback,
  Alert,
  Linking
} from 'react-native';
import {styles} from "@/styles/styles";
import {MAIN_COLOR} from "@/assets/colors/colors";
import {SvgXml} from "react-native-svg";
import {closeBlackIcon} from "@/assets/icons/icons";
import RNFS from 'react-native-fs';
import AudioRecord from 'react-native-audio-record';

interface props {
  setIsVisible: Function;
  getIngredient: Function;
}
const GetSpeechFrom = ({setIsVisible, getIngredient}: props) => {
  const [image, setImage] = useState<any>();
  const [isRecording, setIsRecording] = useState(false);
  const [extractText, setExtractText] = useState('');

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
          // console.log(result);
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
      setIsRecording(true);
    });
  };

  const stopRecording = async () => {
    if (!isRecording) {
      return;
    }
    try {
      const result = await AudioRecord.stop();
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
          return res.json();
        })
        .then(data => {
          let speechData: string = data.results[0]?.alternatives[0]?.transcript;
          if (!speechData) return;
          speechData.replace(' ', '');
          getIngredient(speechData);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const closeModal = () =>{
    setIsVisible();
  };

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
          <TouchableWithoutFeedback onPress={startRecording}>
            <View style={{height: 60, marginHorizontal: 12, marginTop: 20, borderWidth: 1, padding: 10, borderRadius: 16, justifyContent: 'center'}}>
              <Text style={[styles.font]}>음성 녹화 시작하기</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={stopRecording}>
            <View style={{height: 60, marginHorizontal: 12, marginTop: 5, borderWidth: 1, padding: 10, borderRadius: 16, justifyContent: 'center'}}>
              <Text style={[styles.font]}>음성 녹화 종료하기</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </>
  );
};
export default GetSpeechFrom;
