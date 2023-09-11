import React from 'react';
import { View, Text, Button } from 'react-native';


const MyFavoriteScreen = ({navigation}:any) => {
  return (
    <View>
      <Text>MyFavoriteScreen</Text>
      <Button
        title="Go to Details"
        onPress={ () => navigation.navigate('Details')}
      />
    </View>
  )
}

export default MyFavoriteScreen;