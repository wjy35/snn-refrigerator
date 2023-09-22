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
const LogInScreen = ({navigation}: any) => {
  async function goHome() {
    try {
      await AsyncStorage.setItem('my-key', 'testtoken');
    } catch (e) {
      console.log(e);
    }
    navigation.navigate('Home');
  }

  async function login() {
    try {
      KakaoLogin.login()
        .then(async result => {
          await AsyncStorage.setItem('accessToken', result.accessToken);
          await AsyncStorage.setItem('idToken', result.idToken);
          await AsyncStorage.setItem('refreshToken', result.refreshToken);
          console.log(result);
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
