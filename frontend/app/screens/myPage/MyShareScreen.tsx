import React from 'react';
import { View, Text, Button } from 'react-native';


const MyShareScreen = ({navigation}:any) => {
  return (
    <View>
      <Text>MyShareScreen</Text>
      <Button
        title="Go to Details"
        onPress={ () => navigation.navigate('Details')}
      />
    </View>
  )
}

export default MyShareScreen;