import React, {useEffect, useState} from 'react';
import {View, Text, Button, ScrollView, ImageBackground} from 'react-native';
import BottomNavigator from 'components/BottomNavigator';
import {styles} from '@/styles/styles';
import RecipeList from '@/components/RecipeList';
import sampleApi from '@/apis/sampleApi';
import {homeScreenStyles} from "@/styles/homeScreenStyles";
import MyIngredientList from "@/components/MyIngredientList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import recipeApi from "@/apis/recipeApi";
import {useSelector} from "react-redux";
import {RootState} from "@/reducers/reducers";

const HomeScreen = ({navigation}:any) => {

  const [recipeList, setRecipeList] = useState([]);
  let memberId = "3029548333"
  // const { memberId } = useSelector((state:RootState) => state.houseReducer)

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

  useEffect(() => {
    const getRecipe = async () => {
      try {
        let res = await recipeApi.searchRecipe({
          memberId: memberId,
          contain: [],
          remove: [],
          n: 1000,
          keyword: '',
          page:1,
          size:3,
        });
        console.log(res);
        if (res.status === 200) {
          setRecipeList(res.data.data.recipe);
        } else {
          console.log(res.data.data.recipe);
        }
      } catch (err) {
        console.log(err);
      }
    }

    getRecipe();
  }, []);

  return (
    <View style={styles.layout}>
      <ImageBackground source={require('@/assets/images/background1.png')} resizeMode="cover" style={styles.bg}>
        <ScrollView style={{width: '100%'}}>
          <View style={styles.container}>
            <View style={homeScreenStyles.homeMention}>
              <Text style={[styles.font, styles.headerFont]}>오늘은 어떤 음식을</Text>
              <Text style={[styles.font, styles.headerFont]}>만들어 볼까요?</Text>
            </View>
            <View style={homeScreenStyles.homeRecipeContainer}>
              <View style={{margin: 10}}>
                <Text style={[styles.font, {fontSize: 20}]}>추천 레시피</Text>
              </View>
              <View style={homeScreenStyles.homeRecipeListContainer}>
                <RecipeList horizontal={true} recipeList={recipeList} navigation={navigation} width={250}/>
              </View>
            </View>
            <View style={homeScreenStyles.ingredientContainer}>
              <View style={{margin: 10}}>
                <Text style={[styles.font, {fontSize: 20}]}>빨리 소비해야 해요</Text>
              </View>
              <View>
                <MyIngredientList types={[0,2]} maxDate={7}/>
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
