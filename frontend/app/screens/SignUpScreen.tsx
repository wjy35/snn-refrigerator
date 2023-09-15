import React from 'react';
import { View, Text, Button } from 'react-native';


const SignUpScreen = ({navigation}:any) => {
  return (
    <View>
      <Text>SignUpScreen</Text>
      <Button
        title="Go to Details"
        onPress={ () => navigation.navigate('Details')}
      />
    </View>
  )
}

export default SignUpScreen;