import React from 'react';
import { View, Text, Button } from 'react-native';
import MyPageLayout from "@/screens/myPage/MyPageLayout";

const MyFavoriteScreen = ({navigation}:any) => {
  return (
    <MyPageLayout title="즐겨찾기 레시피">
      <Text>MyFavoriteScreen</Text>
    </MyPageLayout>
  )
}

export default MyFavoriteScreen;
