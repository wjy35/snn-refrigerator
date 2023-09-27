import React, {useEffect, useState} from 'react';
import {View, Text, Button, ScrollView, ImageBackground} from 'react-native';
import BottomNavigator from 'components/BottomNavigator';
import {styles} from '@/styles/styles';

const FixScreen = ({navigation}:any) => {
  return (
    <View style={styles.layout}>
      <ImageBackground source={require('@/assets/images/background1.png')} resizeMode="cover" style={styles.bg}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={[styles.font, {fontSize: 50}]}>공사중입니다</Text>
        </View>
        <BottomNavigator now=''/>
      </ImageBackground>
    </View>
  );
};

export default FixScreen;
