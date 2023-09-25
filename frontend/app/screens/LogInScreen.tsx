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

interface props {
  accessToken: string;
}

const LogInScreen = ({navigation}: any) => {
  const [accessToken, setAccessToken] = useState<string>('');
  const [refreshToken, setRefreshToken] = useState<string>('');
  const [birthday, setBirthday] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [profileImageUrl, setProfileImageUrl] = useState<string>('');
  const [memberId, setMemberId] = useState<bigint>(BigInt(-1));
  const [email, setEmail] = useState<string>('');

  async function getKakaoId(token: string){
    let res = await memberApi.getKaKaoInfo(token);
    let memberInfo = res.data.data.kakaoMemberInfo;
    setMemberId(memberInfo.id); // 이것은 회원가입을 할 때도 들고 있어야 하고 홈화면으로 갈때도 들고 있어야 함.
    return memberInfo.id;
  }

  async function checkMemberExists(memberId : bigint){
    let memberInfoResponse = await memberApi.memberDetail(memberId);
    if (memberInfoResponse.status === 200) {
      let memberInfo = memberInfoResponse.data.data.memberInfo;
      setNickname(memberInfo.nickname);
      setBirthday(memberInfo.birthday);
      setProfileImageUrl(memberInfo.profileImageUrl);
      setEmail(memberInfo.email);
      navigation.navigate('Home'); //회원 정보 다 저장한 후엔 홈 화면으로.
    } else {
      navigation.navigate('Signup'); //아니라면 회원가입.
    }
  }

  async function login() {
    try {
      KakaoLogin.login()
        .then(async result => {
          // await AsyncStorage.setItem('accessToken', result.accessToken);
          // await AsyncStorage.setItem('idToken', result.idToken);
          // await AsyncStorage.setItem('refreshToken', result.refreshToken);
          // console.log(result);
          // if (result.idToken === null) {
          //   throw new Error('Access token is null');
          // }
          //access Token을 백엔드에 요청 후 받아오기.
          //카카오 로그인 성공시 유저 memberId가 있으면 정보를 받아오고 아니라면 회원 가입.

          let id = await getKakaoId(result.accessToken);
          await checkMemberExists(memberId);
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
          <Button title='홈으로(test)' onPress={()=>navigation.navigate('Home')}/>
        </View>
      </ImageBackground>
    </View>
  );
};

export default LogInScreen;
