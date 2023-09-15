import React from 'react';
import { View, Text, Button } from 'react-native';
import {styles} from "@/styles/styles";
import ShareLayout from "@/screens/share/ShareLayout";

const ShareListScreen = ({navigation}:any) => {
  return (
    <ShareLayout>
      <Text>ShareListScreen</Text>
      <Button
        title="나눔글 생성"
        onPress={ () => navigation.navigate('ShareCreate')}
      />
      <Button
        title="나눔글 상세"
        onPress={ () => navigation.navigate('ShareDetail')}
      />
      <Button
        title="나눔채팅목록"
        onPress={ () => navigation.navigate('ShareChatList')}
      />
      <Button
        title="개별나눔채팅"
        onPress={ () => navigation.navigate('SingleShareChat')}
      />
    </ShareLayout>
  );
};

export default ShareListScreen;
