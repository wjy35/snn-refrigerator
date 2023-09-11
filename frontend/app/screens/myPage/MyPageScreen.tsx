import React from 'react';
import { View, Text, Button } from 'react-native';


const MyPageScreen = ({navigation}:any) => {
  return (
    <View>
      <Text>MyPageScreen</Text>
      <Button
        title="Go to Details"
        onPress={ () => navigation.navigate('Details')}
      />
    </View>
  )
}

export default MyPageScreen;