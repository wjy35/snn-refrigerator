import React, {useState} from 'react';
import {View, Text, Image, ScrollView, FlatList} from 'react-native';
import {recipeStyles} from "@/styles/recipeStyles";
import {styles} from "@/styles/styles";
import RecipeItem from "@/components/RecipeItem";
import {useFocusEffect} from "@react-navigation/native";

interface props {
  horizontal: boolean;
  recipeList: any[];
  navigation: any;
  width?: number;
  height?: number;
}

const RecipeList = ({horizontal, recipeList, navigation, width=350, height=130}:props) => {
  return (
    <View style={recipeStyles.recipeListContainer}>
      <FlatList
        data={recipeList}
        renderItem={(item) => <RecipeItem item={item.item} navigation={navigation} width={width} height={height}/>}
        keyExtractor={(item) => String(item.recipeId)}
        horizontal={horizontal}
        contentContainerStyle={{alignItems: 'center'}}
      />
    </View>
  )
}

export default RecipeList;
