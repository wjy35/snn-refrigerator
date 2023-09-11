import React from 'react';
import { View, Text, Button } from 'react-native';
import BottomNavigator from 'components/BottomNavigator';

const HomeScreen = ({navigation}:any) => {
  return (
    <View>
      <Text>HomeScreen</Text>
      <Button
        title="Go to Details"
        onPress={ () => navigation.navigate('Details')}
      />
      <BottomNavigator/>
    </View>
  );
};

export default HomeScreen;
