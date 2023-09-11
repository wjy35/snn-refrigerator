import React from 'react';
import { View, Text, Button } from 'react-native';


const AccountSettingScreen = ({navigation}:any) => {
  return (
    <View>
      <Text>AccountSettingScreen</Text>
      <Button
        title="Go to Details"
        onPress={ () => navigation.navigate('Details')}
      />
    </View>
  )
}

export default AccountSettingScreen;