import React, {useState} from 'react';
import {View, Text, Button, ImageBackground} from 'react-native';
import BottomNavigator from "@/components/BottomNavigator";
import {styles} from "@/styles/styles";
import ProgressPage from "@/components/ProgressPage";
import HouseAddIngredient from "@/pages/houseAdd/HouseAddIngredient";
import TopNavigator from "@/components/TopNavigator";
import HouseAddStorage from "@/pages/houseAdd/HouseAddStorage";
import HouseAddDate from "@/pages/houseAdd/HouseAddDate";


const HouseAddScreen = ({navigation}:any) => {
  const textList = ['재료 추가', '보관방법 설정', '소비기한 설정']
  const [ingredients, setIngredients] = useState<any[]>([
    {ingredientInfo: 0, ingredientName: '아스파라거스', storageType: 1, lastDate: '2024-09-13'},
    {ingredientInfo: 0, ingredientName: '요플레', storageType: 1, lastDate: '2024-09-13'},
    {ingredientInfo: 0, ingredientName: '베이컨', storageType: 2, lastDate: '2024-09-13'},
    {ingredientInfo: 0, ingredientName: '몬트리올 시즈닝', storageType: 2, lastDate: '2024-09-13'},
    {ingredientInfo: 0, ingredientName: '모짜렐라 치즈', storageType: 0, lastDate: '2024-09-13'},
    {ingredientInfo: 0, ingredientName: '갈비만두', storageType: 0, lastDate: '2024-09-13'},
    {ingredientInfo: 0, ingredientName: '아보카도', storageType: 0, lastDate: '2024-09-13'},
  ]);
  const [now, setNow] = useState<number>(0);

  function changeNow(newNum: number) {
    setNow(newNum)
  }

  return (
    <View style={styles.layout}>
      <ImageBackground source={require('@/assets/images/background1.png')} resizeMode="cover" style={styles.bg}>
        {
          now === 0 && (
            <TopNavigator title='내 냉장고 등록' optionTitle='다음'/>
          )
        }
        <ProgressPage>
          <HouseAddIngredient textList={textList} ingredients={ingredients} setNow={changeNow} now={now}/>
          <HouseAddStorage textList={textList} ingredients={ingredients} setNow={changeNow} now={now}/>
          <HouseAddDate textList={textList} ingredients={ingredients} setNow={changeNow} now={now}/>
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
