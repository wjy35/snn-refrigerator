import React, {useState} from 'react';
import {View, Text, Button, ScrollView, ImageBackground} from 'react-native';
import BottomNavigator from 'components/BottomNavigator';
import {styles} from '@/styles/styles';
import RecipeList from '@/components/RecipeList';
import sampleApi from '@/apis/sampleApi';
import {homeScreenStyles} from "@/styles/homeScreenStyles";
import MyIngredientList from "@/components/MyIngredientList";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = ({navigation}:any) => {

  const [recipeList, setRecipeList] = useState([
    {title: 'title1', id: 1},
    {title: 'title2', id: 2},
    {title: 'title3', id: 3},
  ]);
  const recipe = [
    {
      recipeId:"123123",
      nickname:"독버섯 왕준영",
      title:"곽민규찜",
      imageUrl:"레시피 이미지",
      favoriteCount:19,
      neededIngredients:8,
      myIngredients:6,
      foodName:"김치찜",
      cookingTime:"120분",
      serving:2
    },
    {
      recipeId:"123124",
      nickname:"독버섯 왕준영",
      title:"곽민규찜",
      imageUrl:"레시피 이미지",
      favoriteCount:19,
      neededIngredients:12,
      myIngredients:6,
      foodName:"김치찜",
      cookingTime:"120분",
      serving:2
    },
    {
      recipeId:"123125",
      nickname:"독버섯 왕준영",
      title:"곽민규찜",
      imageUrl:"레시피 이미지",
      favoriteCount:19,
      neededIngredients:10,
      myIngredients:3,
      foodName:"김치찜",
      cookingTime:"120분",
      serving:2
    },
    {
      recipeId:"123126",
      nickname:"독버섯 왕준영",
      title:"곽민규찜",
      imageUrl:"레시피 이미지",
      favoriteCount:19,
      neededIngredients:7,
      myIngredients:6,
      foodName:"김치찜",
      cookingTime:"120분",
      serving:2
    },
  ];

  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('my-key');
      if (value !== null) {
        console.log(value);
      }
    } catch (e) {
      // error reading value
    }
  };

  const test = async () => {
    try {
      let res = await sampleApi.test();
      if (res.status === 200) {
        console.log(res)
      } else {
        console.log(res)
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <View style={styles.layout}>
      <ImageBackground source={require('@/assets/images/background1.png')} resizeMode="cover" style={styles.bg}>
        <ScrollView style={{width: '100%'}}>
          <View style={styles.container}>
            <View style={homeScreenStyles.homeMention}>
              <View style={{width: 230}}>
                <Text style={[styles.font, {fontSize: 30}]}>오늘은 어떤 음식을 만들어 볼까요?</Text>
              </View>
            </View>
            <View style={homeScreenStyles.homeRecipeContainer}>
              <View style={{margin: 10}}>
                <Text style={[styles.font, {fontSize: 20}]}>추천 레시피</Text>
              </View>
              <View style={homeScreenStyles.homeRecipeListContainer}>
                <RecipeList horizontal={true} recipeList={recipe} navigation={navigation} width={250}/>
              </View>
            </View>
            <View style={homeScreenStyles.ingredientContainer}>
              <View style={{margin: 10}}>
                <Text style={[styles.font, {fontSize: 20}]}>빨리 소비해야 해요</Text>
              </View>
              <View>
                <MyIngredientList/>
              </View>
            </View>
            {/*<Button onPress={test} title={'fdasfdsa'}></Button>*/}
            <View style={{height: 80}}></View>
          </View>
        </ScrollView>
        <BottomNavigator now='home'/>
      </ImageBackground>
    </View>
  );
};

export default HomeScreen;
