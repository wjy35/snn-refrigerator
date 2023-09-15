import React from 'react';
import { View, Text, Button } from 'react-native';
import BottomNavigator from '@/components/BottomNavigator';
import {styles} from '@/styles/styles';
const LogInScreen = ({navigation}:any) => {
  return (
    <View style={styles.container}>
      <Text>LogInScreen</Text>
      <BottomNavigator now='login'/>
    </View>
  );
};

export default LogInScreen;
