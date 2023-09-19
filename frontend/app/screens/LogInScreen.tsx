import React from 'react';
import {View, Text, Button, ImageBackground} from 'react-native';
import {styles} from '@/styles/styles';
import LoginSwiper from "@/components/LoginSwiper";
const LogInScreen = ({navigation}:any) => {

  function goHome() {
    navigation.navigate('Home')
  }

  return (
    <View style={styles.layout}>
      <ImageBackground source={require('@/assets/images/background1.png')} resizeMode="cover" style={styles.bg}>
        <View style={{width: '100%', height: 550}}>
          <LoginSwiper/>
        </View>
        <View style={{marginTop: 30}}>
          <Button onPress={goHome} title="카카오로그인"></Button>
        </View>
      </ImageBackground>
    </View>
  );
};

export default LogInScreen;
