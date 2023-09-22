import React from 'react';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import {recipeStyles} from "@/styles/recipeStyles";
import {useNavigation} from "@react-navigation/native";
import CircularPercent from "@/components/CircularPercent";
import RecipeInfo from "@/components/RecipeInfo";
import {starActive, starDisactive} from "@/assets/icons/icons";
import {SvgXml} from "react-native-svg";


interface props {
  item: any;
  navigation: any;
  width?: number;
}

const RecipeItem = ({item, navigation, width}:props) => {
  function toDetail() {
    navigation.navigate('RecipeDetail', {recipeId: item.recipeId})
  }

  return (
      <TouchableWithoutFeedback
          onPress={toDetail}
      >
        <View style={[recipeStyles.recipeItemContainer, {width: width}]}>
          <View style={recipeStyles.recipeItemImage}>
            <View style={recipeStyles.recipeFavoriteContainer}>
              <SvgXml
                  xml={starDisactive}
                  width={25}
                  height={25}
                  style={{position: 'relative'}}
              />
            </View>
            <Text>음식 사진</Text>
          </View>
          <View style={recipeStyles.recipeItemInfo}>
            <View style={recipeStyles.recipeItemTitleContainer}>
              <Text style={recipeStyles.recipeItemTitle}>{item.title}</Text>
            </View>
            <View style={recipeStyles.recipeItemUser}>
              <View style={{width: 20, height: 20, borderWidth: 1,}}>

              </View>
              <Text>{item.nickname}</Text>
            </View>
            <View style={recipeStyles.recipeItemInfoContainer}>
              <View>
                <RecipeInfo foodName={item.foodName} cookingTime={item.cookingTime} serving={item.serving}/>
              </View>
              <View style={recipeStyles.recipeItemPercent}>
                <CircularPercent total={item.neededIngredients} now={item.myIngredients}/>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
  )
}

export default RecipeItem;
