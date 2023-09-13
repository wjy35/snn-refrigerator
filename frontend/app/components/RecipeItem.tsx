import React from 'react';
import { View, Text, Image } from 'react-native';
import {recipeStyles} from "@/styles/recipeStyles";

const RecipeItem = ({navigation}:any) => {
  return (
    <View style={recipeStyles.recipeItemContainer}>
      <View style={recipeStyles.recipeItemImage}>
        <Text>음식 사진</Text>
      </View>
      <View style={recipeStyles.recipeItemInfo}>
        <View style={recipeStyles.recipeItemTitleContainer}>
          <Text style={recipeStyles.recipeItemTitle}>음식 제목</Text>
        </View>
        <View style={recipeStyles.recipeItemUser}>
          <Text>작성자</Text>
        </View>
        <View>
          <Text>정보</Text>
        </View>
        <View style={recipeStyles.recipeItemPercent}>
          <Text>일치도</Text>
        </View>
      </View>
    </View>
  )
}

export default RecipeItem;
