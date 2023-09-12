import React from 'react';
import { View, Text, Button } from 'react-native';
import BottomNavigator from "@/components/BottomNavigator";
import styles from "@/styles/styles";


const UserScreen = ({navigation}:any) => {
  return (
    <View style={styles.container}>
      <Text>UserScreen</Text>
      <BottomNavigator now=''/>
    </View>
  )
}

export default UserScreen;
