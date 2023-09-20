import React from 'react';
import { View, Text, Button } from 'react-native';
import BottomNavigator from "@/components/BottomNavigator";
import {styles} from "@/styles/styles";
import TopNavigator from "@/components/TopNavigator";
import MyHouseModal from "@/components/MyHouseModal";

interface props {
  title: string;
  optionTitle?: string;
  optionFunction?: Function;
}

const UserScreen = ({title, optionTitle, optionFunction}: props) => {
  return (
    <View style={styles.layout}>
      <MyHouseModal/>
      <TopNavigator title={title} optionTitle={optionTitle} optionFunction={optionFunction}/>
      <Text>UserScreen</Text>
      <BottomNavigator now=''/>
    </View>
  )
}

export default UserScreen;
