import React from 'react';
import { View, Text, Button } from 'react-native';


const ShareChatListScreen = ({navigation}:any) => {
  return (
    <View>
      <Text>ShareChatListScreen</Text>
      <Button
        title="Go to Details"
        onPress={ () => navigation.navigate('Details')}
      />
    </View>
  )
}

export default ShareChatListScreen;