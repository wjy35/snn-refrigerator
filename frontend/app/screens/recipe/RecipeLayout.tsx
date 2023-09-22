import React, {useState} from 'react';
import {ImageBackground, ScrollView, Text, View} from 'react-native';
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

const RecipeLayout = ({children, title, optionTitle, optionFunction}: props) => {

  return (
    <View style={styles.layout}>
      <ImageBackground source={require('@/assets/images/background1.png')} resizeMode="cover" style={styles.bg}>
        <MyHouseModal/>
        <TopNavigator title={title} optionTitle={optionTitle} optionFunction={optionFunction}/>
        {children}
        <View style={{height: 80}}></View>
        <BottomNavigator now='recipe'/>
      </ImageBackground>
    </View>
  )
}

export default RecipeLayout;
