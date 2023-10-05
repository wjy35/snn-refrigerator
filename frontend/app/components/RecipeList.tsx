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
  callNextPage?: Function;
}

const RecipeList = ({horizontal, recipeList, navigation, callNextPage}:props) => {
  return (
    <View style={recipeStyles.recipeListContainer}>
      <FlatList
        data={recipeList}
        windowSize={2}
        renderItem={(item) => <RecipeItem item={item.item} navigation={navigation}/>}
        keyExtractor={(item) => String(item.recipeId)}
        horizontal={horizontal}
        onEndReached={()=>{
          callNextPage&&callNextPage();
        }}
        onEndReachedThreshold={0.1}
        contentContainerStyle={{alignItems: 'center'}}
      />
    </View>
  )
}

export default RecipeList;
