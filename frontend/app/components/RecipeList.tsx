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
}

const RecipeList = ({horizontal, recipeList, navigation}:props) => {

  return (
    <View style={recipeStyles.recipeListContainer}>
      <FlatList
        data={recipeList}
        renderItem={(item) => <RecipeItem item={item.item} navigation={navigation}/>}
        keyExtractor={(item) => String(item.id)}
        horizontal={horizontal}
        scrollEnabled={true}
      />
    </View>
  )
}

export default RecipeList;
