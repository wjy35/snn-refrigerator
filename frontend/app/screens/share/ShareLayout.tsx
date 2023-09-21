import React from 'react';
import {Dimensions, ImageBackground, Keyboard, TouchableWithoutFeedback, View} from 'react-native';
import {styles} from "@/styles/styles";
import BottomNavigator from "@/components/BottomNavigator";
import TopNavigator from "@/components/TopNavigator";
import MyHouseModal from "@/components/MyHouseModal";

interface props {
  children: any;
  title: string;
  optionTitle?: string;
  optionFunction?: Function;
}


const ShareLayout = ({children, title, optionTitle, optionFunction}: props) => {
  const screenDimensions = Dimensions.get('screen');

  function hideKeyboard(){
    Keyboard.dismiss();
  }

  return (
    <View style={[styles.layout, {width: screenDimensions.width, height: screenDimensions.height}]}>
      <TouchableWithoutFeedback onPress={hideKeyboard}>
        <View style={{width: screenDimensions.width, height: screenDimensions.height, position: 'relative'}}>
          <ImageBackground source={require('@/assets/images/background1.png')} resizeMode="cover" style={styles.bg}>
            <MyHouseModal/>
            <TopNavigator title={title} optionTitle={optionTitle} optionFunction={optionFunction}/>
            {children}
            <View style={{height: 80}}></View>
          </ImageBackground>
          <BottomNavigator now='share'/>
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

export default ShareLayout;
