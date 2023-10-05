import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, Button, ScrollView} from 'react-native';
import ShareLayout from "@/screens/share/ShareLayout";
import ShareChatItem from "@/components/ShareChatItem";
import chatRoomApi from "@/apis/chatRoomApi";
import * as Stomp from "webstomp-client";
import {useFocusEffect} from "@react-navigation/native";
import {RootState} from "@/reducers/reducers";
import {useSelector} from "react-redux";

const ShareChatListScreen = ({navigation}: any) => {
  const [chatRoomList, setchatRoomList] = useState<
    Array<{
      chatRoomId: number,
      profileImageUrl: string,
      locationName: string,
      thumbnailImageUrl: string,
      nickname: string,
      content: string,
      timestamp: number,
      receiveMemberId:number
    }>
  >([]);

  // const { memberId } = useSelector((state:RootState) => state.userReducer);
  const memberId = 3029548333

  useEffect(() => {
    const getChatRoomList = async () => {
      try {
        let res = await chatRoomApi.chatRoomList(memberId);
        if(res.status === 200){
            setchatRoomList(res.data.data.chatRoomList);
        }
      } catch (e) {
        console.log(e);
      }
    }
    getChatRoomList();

  }, []);

  function onToggle(currentChat){
    console.log("current",currentChat)
    setchatRoomList((prevChatRoomList:any[])=>{
      const newChatRoomList = [];
      prevChatRoomList.map((chatRoom) =>{
        chatRoom.chatRoomId === currentChat.chatRoomId ?
          newChatRoomList.push({...chatRoom, content: currentChat.content}):newChatRoomList.push(chatRoom)
      });
      return newChatRoomList;
    }
    );
  };

  useFocusEffect(
    useCallback(() => {
      const client = Stomp.client("ws://a502.store/chat/endpoint");
      client.isBinary=true;
      client.connect(
        {
            memberId:memberId
        },
        () => {
          client.subscribe(
            `/topic/${memberId}`,
            (res)=>{
            let currentChat = JSON.parse(res.body);
            onToggle(currentChat);
          })
        },
        (error) => {
          console.log(error)
          // ToDo socket연결 실패 오류를 출력
        });
          return ()=>{
            client.disconnect(()=>{
                console.log("disconnect")
            })
          }
      }, []))

  return (
    <ShareLayout title="나눔 채팅">
      <View>
        <ScrollView>
          {
            chatRoomList.map((item, index) => {
              return (
                <React.Fragment key={`chatRoom${index}`}>
                  <ShareChatItem
                    index={index}
                    chatRoomId={item.chatRoomId}
                    content={item.content}
                    profileImageUrl={item.profileImageUrl}
                    locationName={item.locationName}
                    thumbnailImageUrl={item.thumbnailImageUrl}
                    timestamp={item.timestamp}
                    nickname={item.nickname}
                    receiveMemberId={item.receiveMemberId}
                  />
                </React.Fragment>
              )
            })
          }
        </ScrollView>
      </View>
    </ShareLayout>
  )
}

export default ShareChatListScreen;
