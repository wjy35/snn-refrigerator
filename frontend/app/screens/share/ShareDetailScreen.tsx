import React from 'react';
import { View, Text, Button } from 'react-native';


const ShareDetailScreen = ({navigation}:any) => {
  return (
    <View>
      <Text>ShareDetailScreen</Text>
      <Button
        title="Go to Details"
        onPress={ () => navigation.navigate('Details')}
      />
    </View>
  )
}

export default ShareDetailScreen;