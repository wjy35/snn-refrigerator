import React from 'react';
import { View, Text, Button } from 'react-native';


const RecipeUpdateScreen = ({navigation}:any) => {
  return (
    <View>
      <Text>RecipeUpdateScreen</Text>
      <Button
        title="Go to Details"
        onPress={ () => navigation.navigate('Details')}
      />
    </View>
  )
}

export default RecipeUpdateScreen;