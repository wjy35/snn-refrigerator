import React from 'react';
import { View, Text, Button } from 'react-native';


const SingleShareChatScreen = ({navigation}:any) => {
  return (
    <View>
      <Text>SingleShareChatScreen</Text>
      <Button
        title="Go to Details"
        onPress={ () => navigation.navigate('Details')}
      />
    </View>
  )
}

export default SingleShareChatScreen;