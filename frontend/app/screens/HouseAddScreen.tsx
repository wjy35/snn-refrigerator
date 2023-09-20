import React, {useState} from 'react';
import {View, Text, Button, ImageBackground} from 'react-native';
import BottomNavigator from "@/components/BottomNavigator";
import {styles} from "@/styles/styles";
import MyHouseModal from "@/components/MyHouseModal";
import ProgressPage from "@/components/ProgressPage";
import HouseAddIngredient from "@/pages/houseAdd/HouseAddIngredient";
import TopNavigator from "@/components/TopNavigator";
import HouseAddStorage from "@/pages/houseAdd/HouseAddStorage";
import HouseAddDate from "@/pages/houseAdd/HouseAddDate";


const HouseAddScreen = ({navigation}:any) => {
  const textList = ['재료 추가', '보관방법 설정', '소비기한 설정']
  const [ingredients, setIngredients] = useState<string[]>([
    '아스파라거스', '요플레', '베이컨', '몬트리올 시즈닝', '모짜렐라 치즈', '갈비만두', '아보카도'
  ]);


  return (
    <View style={styles.layout}>
      <ImageBackground source={require('@/assets/images/background1.png')} resizeMode="cover" style={styles.bg}>
        <MyHouseModal/>
        <TopNavigator title='내 냉장고 등록' optionTitle='다음'/>
        <ProgressPage>
          <HouseAddIngredient textList={textList} ingredients={ingredients}/>
          <HouseAddStorage textList={textList}/>
          <HouseAddDate textList={textList}/>
        </ProgressPage>
        <BottomNavigator now=''/>
      </ImageBackground>
    </View>
  )
}

export default HouseAddScreen;
