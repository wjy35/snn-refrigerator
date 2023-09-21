import React from 'react';
import {View, Text, Button, ImageBackground, TouchableWithoutFeedback, Image} from 'react-native';
import {styles} from '@/styles/styles';
import LoginSwiper from "@/components/LoginSwiper";
import MyHouseModal from "@/components/MyHouseModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
const LogInScreen = ({navigation}:any) => {

  async function goHome() {
    try {
      await AsyncStorage.setItem('my-key', 'testtoken');
    } catch (e) {
      console.log(e);
    }
    navigation.navigate('Home');
  }

  return (
    <View style={styles.layout}>
      <ImageBackground source={require('@/assets/images/background1.png')} resizeMode="cover" style={styles.bg}>
        <View style={{width: '100%', height: '80%'}}>
          <LoginSwiper/>
        </View>
        <View style={{marginTop: 30, width: '100%', height: 80, justifyContent: 'center', alignItems: 'center'}}>
          <TouchableWithoutFeedback onPress={goHome}>
            <Image
              source={require('@/assets/images/kakaologin2.png')}
              style={{width: '70%'}}
              resizeMode={'contain'}
            ></Image>
          </TouchableWithoutFeedback>
        </View>
      </ImageBackground>
    </View>
  );
};

export default LogInScreen;
