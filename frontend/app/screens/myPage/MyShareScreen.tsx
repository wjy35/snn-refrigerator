import React from 'react';
import { View, Text, Button } from 'react-native';
import styles from "@/styles/styles";
import BottomNavigator from "@/components/BottomNavigator";
import MyPageLayout from "@/screens/myPage/MyPageLayout";

const MyShareScreen = ({navigation}:any) => {
  return (
    <MyPageLayout>
      <Text>MyShareScreen</Text>
    </MyPageLayout>
  )
}

export default MyShareScreen;
