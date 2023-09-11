import React from 'react';
import { View, Text, Button } from 'react-native';


const RecipeCreateScreen = ({navigation}:any) => {
  return (
    <View>
      <Text>RecipeCreateScreen</Text>
      <Button
        title="Go to Details"
        onPress={ () => navigation.navigate('Details')}
      />
    </View>
  )
}

export default RecipeCreateScreen;