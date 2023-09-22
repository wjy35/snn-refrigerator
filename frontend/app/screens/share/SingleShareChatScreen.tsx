import React from 'react';
import {View, Text, Button, ImageBackground, ScrollView} from 'react-native';
import {styles} from "@/styles/styles";
import TopNavigator from "@/components/TopNavigator";
import BottomChat from "@/components/BottomChat";


const SingleShareChatScreen = ({navigation}:any) => {
  return (
    <View style={[styles.layout]}>
      <ImageBackground source={require('@/assets/images/background1.png')} resizeMode="cover" style={styles.bg}>
        <TopNavigator title={'독버섯 김석주'}/>
        <View style={[{flex: 1, borderWidth: 1, flexDirection: 'column-reverse'}]}>
          {/*채팅 내용 넣기*/}
          {/*<FlatList*/}
          {/*/>*/}
        </View>
        <View style={{height: 80}}></View>
        <BottomChat/>
      </ImageBackground>
    </View>
  )
}

export default SingleShareChatScreen;
