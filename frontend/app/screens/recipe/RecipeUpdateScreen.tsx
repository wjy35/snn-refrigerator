import React from 'react';
import { View, Text, Button } from 'react-native';
import RecipeLayout from "@/screens/recipe/RecipeLayout";

const RecipeUpdateScreen = ({navigation}:any) => {
  return (
    <RecipeLayout title="레시피" optionTitle="완료">
      <Text>RecipeUpdateScreen</Text>
    </RecipeLayout>
  )
}

export default RecipeUpdateScreen;
