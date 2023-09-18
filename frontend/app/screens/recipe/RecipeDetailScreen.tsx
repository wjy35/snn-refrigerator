import React from 'react';
import { View, Text, Button } from 'react-native';
import RecipeLayout from '@/screens/recipe/RecipeLayout';
import {useFocusEffect} from "@react-navigation/native";

const RecipeDetailScreen = ({recipeId}:any) => {

  useFocusEffect(() => {
    // console.log(recipeId);
    console.log('gdgd')
  })

  return (
    <RecipeLayout title="레시피" optionTitle="수정">
      <Text>RecipeDetailScreen</Text>
    </RecipeLayout>
  )
}

export default RecipeDetailScreen;
