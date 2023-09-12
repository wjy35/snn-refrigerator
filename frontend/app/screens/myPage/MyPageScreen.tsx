import React from 'react';
import { View, Text, Button } from 'react-native';
import MyPageLayout from "./MyPageLayout";


const MyPageScreen = ({navigation}:any) => {
  return (
    <MyPageLayout>
      <Text>MyPageScreen</Text>
    </MyPageLayout>
  )
}

export default MyPageScreen;
