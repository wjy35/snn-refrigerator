import React from 'react';
import { View, Text, Button } from 'react-native';
import MyPageLayout from "@/screens/myPage/MyPageLayout";

const MyPageUpdateScreen = ({navigation}:any) => {
  return (
    <MyPageLayout title="마이페이지">
      <Text>MyPageUpdateScreen</Text>
    </MyPageLayout>
  )
}

export default MyPageUpdateScreen;
