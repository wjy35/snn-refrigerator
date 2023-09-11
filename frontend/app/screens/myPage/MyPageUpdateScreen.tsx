import React from 'react';
import { View, Text, Button } from 'react-native';


const MyPageUpdateScreen = ({navigation}:any) => {
  return (
    <View>
      <Text>MyPageUpdateScreen</Text>
      <Button
        title="Go to Details"
        onPress={ () => navigation.navigate('Details')}
      />
    </View>
  )
}

export default MyPageUpdateScreen;