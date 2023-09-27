import React from 'react';
import {View, Text, Button, ScrollView} from 'react-native';
import BottomNavigator from "@/components/BottomNavigator";
import {styles} from "@/styles/styles";
import TopNavigator from "@/components/TopNavigator";
import {useNavigation} from "@react-navigation/native";
import RecipeItem from "@/components/RecipeItem";

interface props {
  title?: string;
  optionTitle?: string;
  optionFunction?: Function;
}

const UserScreen = ({title='독버섯 김석주', optionTitle, optionFunction}: props) => {
  const navigation = useNavigation();
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

  return (
    <View style={styles.layout}>
      {/*<MyHouseModal/>*/}
      <TopNavigator title={title} optionTitle={optionTitle} optionFunction={optionFunction}/>
      <View style={[{width: '100%', flex: 1}]}>
        <ScrollView style={{}}>
          <View style={{width: '100%', borderWidth: 1, height: 150, flexDirection: 'row', padding: 10}}>
            <View style={{flex: 1, borderWidth: 1}}>
              <Text>사진</Text>
            </View>
            <View style={{flex: 1, borderWidth: 1}}>
              <View style={{flex: 1}}>
                <Text>팔로워</Text>
              </View>
              <View style={{flex: 1}}>
                <Text>나눔</Text>
              </View>
            </View>
          </View>
          {
            recipe.map((item)=>{
              return (
                <React.Fragment key={`recipe${item.recipeId}`}>
                  <RecipeItem item={item} navigation={navigation} width='90%' height={180}/>
                </React.Fragment>
              )
            })
          }
        </ScrollView>
        {/*<RecipeList horizontal={false} recipeList={recipe} navigation={navigation}/>*/}
      </View>
      <View style={{height: 80}}></View>
      <BottomNavigator now=''/>
    </View>
  )
}

export default UserScreen;
