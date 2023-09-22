import React from 'react';
import { View, Text, Button } from 'react-native';
import MyPageLayout from "@/screens/myPage/MyPageLayout";

const MyShareScreen = ({navigation}:any) => {
  return (
    <MyPageLayout title="내 나눔 내역">
      <Text>MyShareScreen</Text>
    </MyPageLayout>
  )
}

export default MyShareScreen;
