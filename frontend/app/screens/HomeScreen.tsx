import React from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import BottomNavigator from 'components/BottomNavigator';
import {styles} from '@/styles/styles';
import RecipeList from '@/components/RecipeList';
import Progressbar from '@/components/Progressbar';
import sampleApi from '@/apis/sampleApi';
import {homeScreenStyles} from "@/styles/homeScreenStyles";

const HomeScreen = ({navigation}:any) => {
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
    <View style={styles.container}>
      <ScrollView style={{width: '96%'}}>
        <View style={styles.container}>
          <View style={homeScreenStyles.homeMention}>
            <View style={{width: 230}}>
              <Text style={[styles.font, {fontSize: 30}]}>오늘은 어떤 음식을 만들어 볼까요?</Text>
            </View>
          </View>
          <View style={homeScreenStyles.homeRecipeContainer}>
            <Text style={styles.font}>추천 레시피</Text>
            <View style={homeScreenStyles.homeRecipeListContainer}>
              <RecipeList horizontal={true} recipeList={[]} navigation={navigation}/>
            </View>
          </View>
          <View style={homeScreenStyles.ingredientContainer}>
            <Text style={styles.font}>빨리 소비해야 해요</Text>
            <View>
              <Text>냉장고 재고</Text>
            </View>
          </View>
          {/*<Button onPress={test} title={'fdasfdsa'}></Button>*/}
          <View style={{height: 80, borderWidth: 1,}}>
            <Text>네비게이션 용</Text>
          </View>
        </View>
      </ScrollView>
      <BottomNavigator now='home'/>
    </View>
  );
};

export default HomeScreen;
