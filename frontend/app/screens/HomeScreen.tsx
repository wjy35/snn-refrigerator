import React, {useEffect, useState} from 'react';
import {View, Text, Button, ScrollView, ImageBackground} from 'react-native';
import BottomNavigator from 'components/BottomNavigator';
import {styles} from '@/styles/styles';
import RecipeList from '@/components/RecipeList';
import sampleApi from '@/apis/sampleApi';
import {homeScreenStyles} from "@/styles/homeScreenStyles";
import MyIngredientList from "@/components/MyIngredientList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import recipeRecommendApi from "@/apis/recipeRecommendApi";
import {useSelector} from "react-redux";
import {RootState} from "@/reducers/reducers";

const HomeScreen = ({navigation}:any) => {

  const [recipeList, setRecipeList] = useState([]);
  const { memberId } = useSelector((state:RootState) => state.userReducer)

  useEffect(() => {
    const getRecipe = async () => {
      try {
        let res = await recipeRecommendApi.getRecommendList({
          memberId: memberId,
        });
        if (res.status === 200) {
          setRecipeList(res.data.data.recipe);
        }
      } catch (err) {
        console.log('여기서 나는거임home');
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
