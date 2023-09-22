import React from 'react';
import { View, Text, Button } from 'react-native';
import MyPageLayout from "@/screens/myPage/MyPageLayout";

const AlarmSettingScreen = ({navigation}:any) => {
  return (
    <MyPageLayout title="알림 설정">
      <Text>AlarmSettingScreen</Text>
    </MyPageLayout>
  )
}

export default AlarmSettingScreen;
