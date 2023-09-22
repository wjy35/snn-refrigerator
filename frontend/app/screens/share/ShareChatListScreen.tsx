import React from 'react';
import {View, Text, Button, ScrollView} from 'react-native';
import ShareLayout from "@/screens/share/ShareLayout";
import ShareChatItem from "@/components/ShareChatItem";

const ShareChatListScreen = ({navigation}:any) => {
  return (
    <ShareLayout title="나눔 채팅">
      <View>
        <ScrollView>
          <ShareChatItem title={'fdsa'}/>
        </ScrollView>
      </View>
    </ShareLayout>
  )
}

export default ShareChatListScreen;
