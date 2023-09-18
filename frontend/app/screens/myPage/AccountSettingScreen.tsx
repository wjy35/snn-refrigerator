import React from 'react';
import { View, Text, Button } from 'react-native';
import MyPageLayout from "@/screens/myPage/MyPageLayout";

const AccountSettingScreen = ({navigation}:any) => {
  return (
    <MyPageLayout title="계정 설정">
      <Text>AccountSettingScreen</Text>
    </MyPageLayout>
  )
}

export default AccountSettingScreen;
