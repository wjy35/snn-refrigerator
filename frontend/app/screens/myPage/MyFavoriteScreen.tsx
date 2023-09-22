import React from 'react';
import { View, Text, Button } from 'react-native';
import MyPageLayout from "@/screens/myPage/MyPageLayout";
import RecipeList from "@/components/RecipeList";

const MyFavoriteScreen = ({navigation}:any) => {
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
    <MyPageLayout title="즐겨찾기 레시피">
      <RecipeList horizontal={false} recipeList={recipe} navigation={navigation}/>
    </MyPageLayout>
  )
}

export default MyFavoriteScreen;
