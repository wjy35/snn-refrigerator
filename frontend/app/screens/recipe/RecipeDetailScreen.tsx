import React from 'react';
import { View, Text, Button } from 'react-native';


const RecipeDetailScreen = ({navigation}:any) => {
  return (
    <View>
      <Text>RecipeDetailScreen</Text>
      <Button
        title="Go to Details"
        onPress={ () => navigation.navigate('Details')}
      />
    </View>
  )
}

export default RecipeDetailScreen;