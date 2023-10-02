import React, {useState} from 'react';
import {View, Text, Button, ImageBackground} from 'react-native';
import BottomNavigator from "@/components/BottomNavigator";
import {styles} from "@/styles/styles";
import ProgressPage from "@/components/ProgressPage";
import HouseAddIngredient from "@/pages/houseAdd/HouseAddIngredient";
import TopNavigator from "@/components/TopNavigator";
import HouseAddStorage from "@/pages/houseAdd/HouseAddStorage";
import HouseAddDate from "@/pages/houseAdd/HouseAddDate";
import houseApi from "@/apis/houseApi";
import axios from "axios";


const HouseAddScreen = ({navigation}:any) => {
  const textList = ['재료 추가', '보관방법 설정', '소비기한 설정']
  const [ingredients, setIngredients] = useState<any[]>([]);
  const [now, setNow] = useState<number>(0);

  function changeNow(newNum: number) {
    setNow(newNum);
  }

  function checkIngredient(item: any){
    return (
      ingredients.every((ingredient: any) => {
        if (ingredient.ingredientName !== item.ingredientName){
          return true;
        }
      })
    );
  }

  function onAddIngredient(item: any){
    checkIngredient(item) && setIngredients([...ingredients, {ingredientName: item.ingredientName, ingredientInfoId: item.ingredientInfoId, storageType: 0, lastDate: null}]);
  }

  function onChangeIngredients(){
    setIngredients([...ingredients]);
  }

  function deleteIngredient(idx: number){
    const _ingredients = [...ingredients];
    _ingredients.splice(idx, 1);
    setIngredients(_ingredients);
  }

  async function finishAdd(){
    try {
      const res = await houseApi.addIngredient({
        houseCode: '492f9401-c684-4966-936e-56f0941eaffe',
        ingredients: ingredients,
      });
      if (res.status === 200) {
        navigation.goBack();
      }
    } catch (err){
      console.log(err);
    }
  }
  return (
    <View style={styles.layout}>
      <ImageBackground source={require('@/assets/images/background1.png')} resizeMode="cover" style={styles.bg}>
        {
          now === 0 && (
            <TopNavigator title='내 냉장고 등록' optionTitle='등록' optionFunction={finishAdd}/>
          )
        }
        <ProgressPage>
          <HouseAddIngredient textList={textList} ingredients={ingredients} setNow={changeNow} now={now} addIngredient={onAddIngredient} deleteIngredient={deleteIngredient}/>
          <HouseAddStorage textList={textList} ingredients={ingredients} setNow={changeNow} now={now} onChange={onChangeIngredients}/>
          <HouseAddDate textList={textList} ingredients={ingredients} setNow={changeNow} now={now} onChange={onChangeIngredients}/>
        </ProgressPage>
        {
          now === 0 && (
            <>
              <View style={{height: 80}}></View>
              <BottomNavigator now=''/>
            </>
          )
        }
      </ImageBackground>
    </View>
  )
}

export default HouseAddScreen;
