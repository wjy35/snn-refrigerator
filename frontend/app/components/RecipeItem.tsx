import React from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import {recipeStyles} from "@/styles/recipeStyles";
import {useNavigation} from "@react-navigation/native";


interface props {
  item: any;
  navigation: any;
}

const RecipeItem = ({item, navigation}:props) => {
  function toDetail() {
    navigation.navigate('RecipeDetail', {recipeId: item.id})
  }

  return (
    <TouchableWithoutFeedback
      onPress={toDetail}
    >
      <View style={recipeStyles.recipeItemContainer}>
        <View style={recipeStyles.recipeItemImage}>
          <Text>음식 사진</Text>
        </View>
        <View style={recipeStyles.recipeItemInfo}>
          <View style={recipeStyles.recipeItemTitleContainer}>
            <Text style={recipeStyles.recipeItemTitle}>{item.title}</Text>
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
    </TouchableWithoutFeedback>
  )
}

export default RecipeItem;
