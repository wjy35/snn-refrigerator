import React from 'react';
import { View, Text, Button } from 'react-native';
import BottomNavigator from 'components/BottomNavigator';

const LogInScreen = ({navigation}:any) => {
  return (
    <View>
      <Text>LogInScreen</Text>
      <Button
        title="Go to Details"
        onPress={ () => navigation.navigate('Details')}
      />
      <BottomNavigator now='login'/>
    </View>
  );
};

export default LogInScreen;
