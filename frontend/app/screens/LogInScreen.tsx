import React from 'react';
import {
  View,
  Text,
  Button,
  ImageBackground,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import {styles} from '@/styles/styles';
import LoginSwiper from '@/components/LoginSwiper';
import MyHouseModal from '@/components/MyHouseModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as KakaoLogin from '@react-native-seoul/kakao-login';
import memberApi from "@/apis/memberApi";
const LogInScreen = ({navigation}: any) => {
  async function getKaKaoInfo() {
    try {
      let accessToken = await AsyncStorage.getItem('accessToken');
      console.log(typeof accessToken);
      if (accessToken === null) {
        throw new Error('Access token is null');
      }
      accessToken = accessToken as string;
      console.log(accessToken);
      let res = await memberApi.getKaKaoInfo(accessToken);
      if (res.status === 200) {
        console.log(res);
      } else {
        console.log(res);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function login() {
    try {
      KakaoLogin.login()
        .then(async result => {
          await AsyncStorage.setItem('accessToken', result.accessToken);
          await AsyncStorage.setItem('idToken', result.idToken);
          await AsyncStorage.setItem('refreshToken', result.refreshToken);
          console.log(result);
          if (result.idToken === null){
            throw new Error('Access token is null');
          }
          //access Token을 백엔드에 요청 후 받아오기.
          //로그인 성공시 홈 화면으로 이동
          await getKaKaoInfo();
          navigation.navigate('Home');
        })
        .catch(error => {
          if (error.code === 'E_CANCELLED_OPERATION') {
            console.log('Login Cancel', error.message);
          } else {
            console.log(`Login Fail(code:${error.code})`, error.message);
          }
        });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <View style={styles.layout}>
      <ImageBackground
        source={require('@/assets/images/background1.png')}
        resizeMode="cover"
        style={styles.bg}>
        <View style={{width: '100%', height: '80%'}}>
          <LoginSwiper />
        </View>
        <View
          style={{
            marginTop: 30,
            width: '100%',
            height: 80,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableWithoutFeedback onPress={login}>
            <Image
              source={require('@/assets/images/kakaologin2.png')}
              style={{width: '70%'}}
              resizeMode={'contain'}
            />
          </TouchableWithoutFeedback>
        </View>
      </ImageBackground>
    </View>
  );
};

export default LogInScreen;
