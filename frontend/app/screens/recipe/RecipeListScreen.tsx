import React from 'react';
import { View, Text, Button } from 'react-native';
import RecipeLayout from "@/screens/recipe/RecipeLayout";

const RecipeListScreen = ({navigation}:any) => {
  return (
    <RecipeLayout>
      <Text>RecipeListScreen</Text>
      <Button
        title="레시피 등록"
        onPress={ () => navigation.navigate('RecipeCreate')}
      />
      <Button
        title="레시피 상세"
        onPress={ () => navigation.navigate('RecipeDetail')}
      />
      <Button
        title="레시피 수정"
        onPress={ () => navigation.navigate('RecipeUpdate')}
      />
    </RecipeLayout>
  )
}

export default RecipeListScreen;
