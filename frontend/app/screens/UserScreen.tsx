import React from 'react';
import { View, Text, Button } from 'react-native';


const UserScreen = ({navigation}:any) => {
  return (
    <View>
      <Text>UserScreen</Text>
      <Button
        title="Go to Details"
        onPress={ () => navigation.navigate('Details')}
      />
    </View>
  )
}

export default UserScreen;