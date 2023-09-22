import React from 'react';
import { View, Text, Button } from 'react-native';
import ShareLayout from "@/screens/share/ShareLayout";

const ShareCreateScreen = ({navigation}:any) => {
  return (
    <ShareLayout title="나눔글 쓰기" optionTitle="등록">
      <Text>ShareCreateScreen</Text>
    </ShareLayout>
  )
}

export default ShareCreateScreen;
