import React from 'react';
import {View, Text, Button, ScrollView, ImageBackground} from 'react-native';
import BottomNavigator from "@/components/BottomNavigator";
import {styles} from "@/styles/styles";
import {homeScreenStyles} from "@/styles/homeScreenStyles";
import MyIngredientList from "@/components/MyIngredientList";

interface props {
  title?: string;
  optionTitle?: string;
  optionFunction?: Function;
}

const FridgeScreen = ({navigation}:any) => {
  return (
      <View style={styles.layout}>
        <ImageBackground source={require('@/assets/images/background1.png')} resizeMode="cover" style={styles.bg}>
          <ScrollView style={{width: '100%'}}>
            <View style={styles.container}>
              <View style={homeScreenStyles.ingredientContainer}>
                <View style={{margin: 10}}>
                  <Text style={[styles.font, {fontSize: 20}]}>내 식재료 목록</Text>
                </View>
                <View>
                  <MyIngredientList/>
                </View>
              </View>
              <View style={{height: 80}}></View>
            </View>
          </ScrollView>
          <BottomNavigator now='fridge'/>
        </ImageBackground>
      </View>
  )
}

export default FridgeScreen;
