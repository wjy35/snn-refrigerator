import React, {useState} from 'react';
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
import * as KakaoLogin from '@react-native-seoul/kakao-login';
import memberApi from '@/apis/memberApi';
import {useDispatch} from "react-redux";
import {setHatesAction, setLocationsAction, setMemberIdAction} from "@/actions/userAction";
import {setHouseCodeAction} from "@/actions/houseAction";
import messaging from "@react-native-firebase/messaging";
import alarmApi from "@/apis/alarmApi";

interface props {
  accessToken: string;
}

const LogInScreen = ({navigation}: any) => {
  const dispatch = useDispatch();

  async function getKakaoId(token: string){
    try {
      const res = await memberApi.getKaKaoInfo(token);
      if (res.status === 200) {
        dispatch(setMemberIdAction(res.data.data.kakaoMemberInfo.id));
        const memberId = res.data.data.kakaoMemberInfo.id;
        const memberFcmToken = await messaging().getToken();
        dispatch(setMemberIdAction(memberId));
        const saveRes = await alarmApi.saveMemberFcmToken({memberId,memberFcmToken});
        if(saveRes.status === 200){
          // console.log("[Device Save Response]",saveRes);
          // console.log("[memberId]",memberId);
          // console.log("[memberFcmToken]",memberFcmToken);
        }
        return {
          email: res.data.data.kakaoMemberInfo.email,
          birthday: res.data.data.kakaoMemberInfo.birthday,
          id: res.data.data.kakaoMemberInfo.id,
        };
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function checkMemberExists(info: any){
    try {
      const res = await memberApi.memberDetail(info.id);
      if (res.status === 200) {
        dispatch(setLocationsAction(res.data.data.memberInfo.placeList));
        // console.log(res.data.data.placeList);
        dispatch(setHouseCodeAction(res.data.data.memberInfo.houseCode));
        dispatch(setHatesAction(res.data.data.memberInfo.hateIngredientList));
        navigation.replace('Home'); //회원 정보 다 저장한 후엔 홈 화면으로.
      }
    } catch (err) {
      if (err.response.status === 404) {
        navigation.replace('SignUp', {...info});
      }
    }
  }

  async function login() {
    try {
      KakaoLogin.login()
        .then(async result => {
          // await AsyncStorage.setItem('accessToken', result.accessToken);
          // await AsyncStorage.setItem('idToken', result.idToken);
          // await AsyncStorage.setItem('refreshToken', result.refreshToken);
          const privateInfo = await getKakaoId(result.accessToken);
          await checkMemberExists(privateInfo);
        })
        .catch(error => {
          if (error.code === 'E_CANCELLED_OPERATION') {
            console.log('Login Cancel', error.message);
          } else {
            console.log(`Login Fail(code:${error.code})`, error.message);
          }
        });
    } catch (e) {
      console.log(e.message);
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
          {/*<Button title='홈으로(test)' onPress={()=>navigation.replace('Home')}/>*/}
        </View>
      </ImageBackground>
    </View>
  );
};

export default LogInScreen;
