import React from 'react';
import { View, Text, Button } from 'react-native';


const ShareListScreen = ({navigation}:any) => {
  return (
    <View>
      <Text>ShareListScreen</Text>
      <Button
        title="Go to Details"
        onPress={ () => navigation.navigate('Details')}
      />
    </View>
  )
}

export default ShareListScreen;