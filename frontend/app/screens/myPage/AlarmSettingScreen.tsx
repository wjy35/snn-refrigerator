import React from 'react';
import { View, Text, Button } from 'react-native';


const AlarmSettingScreen = ({navigation}:any) => {
  return (
    <View>
      <Text>AlarmSettingScreen</Text>
      <Button
        title="Go to Details"
        onPress={ () => navigation.navigate('Details')}
      />
    </View>
  )
}

export default AlarmSettingScreen;