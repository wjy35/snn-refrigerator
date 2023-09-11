import React from 'react';
import { View, Text, Button } from 'react-native';


const ShareCreateScreen = ({navigation}:any) => {
  return (
    <View>
      <Text>ShareCreateScreen</Text>
      <Button
        title="Go to Details"
        onPress={ () => navigation.navigate('Details')}
      />
    </View>
  )
}

export default ShareCreateScreen;