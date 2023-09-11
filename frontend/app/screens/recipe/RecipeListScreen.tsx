import React from 'react';
import { View, Text, Button } from 'react-native';


const RecipeListScreen = ({navigation}:any) => {
  return (
    <View>
      <Text>RecipeListScreen</Text>
      <Button
        title="Go to Details"
        onPress={ () => navigation.navigate('Details')}
      />
    </View>
  )
}

export default RecipeListScreen;