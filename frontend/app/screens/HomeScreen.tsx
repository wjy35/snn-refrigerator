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
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/reducers/reducers";
import {setChangedAction, setHouseIngredientsAction} from "@/actions/houseAction";
import houseApi from "@/apis/houseApi";

const HomeScreen = ({navigation}:any) => {
  const [recipeList, setRecipeList] = useState([]);
  const { memberId } = useSelector((state:RootState) => state.userReducer)

  const { houseCode, changed } = useSelector((state:RootState) => state.houseReducer);
  const houseIngredients = useSelector((state:RootState) => state.houseReducer.houseIngredients)
  const dispatch = useDispatch();

  function setChanged(bool: boolean){
    dispatch(setChangedAction(bool))
  }

  const getIngredients = async() => {
    try{
      let res = await houseApi.houseIngredientList(houseCode);
      // console.log(res);
      if(res.status===200){
        // console.log(res.data.data.ingredients);
        res.data.data.ingredients.sort((a: { lastDate: string | number | Date; }, b: { lastDate: string | number | Date; })=>{
          // @ts-ignore
          return new Date(a.lastDate) - new Date(b.lastDate)
        })
        dispatch(setHouseIngredientsAction(res.data.data.ingredients));
        // setIngredients(res.data.data.ingredients);
      }else{
        console.log(res.data.message);
      }
    }catch (e){
      console.log(e);
    }
  }

  useEffect(() => {
    if(changed) getIngredients();
    setChanged(false);
  }, [changed]);

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
        console.log(memberId);
        console.log('HomeScreen.tsx', err);
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
                <MyIngredientList types={[0,2]} maxDate={7} houseIngredients={houseIngredients}/>
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
