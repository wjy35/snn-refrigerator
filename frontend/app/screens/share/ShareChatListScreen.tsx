import React, {useEffect, useState} from 'react';
import {View, Text, Button, ScrollView} from 'react-native';
import ShareLayout from "@/screens/share/ShareLayout";
import ShareChatItem from "@/components/ShareChatItem";
import houseApi from "@/apis/houseApi";
import chatRoomApi from "@/apis/chatRoomApi";
import SettingContainer from "@/components/SettingContainer";
import {it} from "@jest/globals";

const ShareChatListScreen = ({navigation}: any) => {


    const [chatRoomList, setchatRoomList] = useState<
        Array<{
            chatRoomId : number,
            profileImageUrl : string,
            locationName : string,
            thumbnailImageUrl : string,
            nickname : string,
            content : string,
            timestamp: number
        }>
    >([]);

    // TODO 민규형한테 리덕스에서 memberId 꺼내달라고 하기
    const memberId : number = 3029548333;

    useEffect(() => {

        const getChatRoomList = async() => {
            try{
                let res = await chatRoomApi.chatRoomList(memberId);
                setchatRoomList(res.data.data.chatRoomList);
            }catch (e){
                console.log(e);
            }
        }
        getChatRoomList();

    }, []);

    return (
        <ShareLayout title="나눔 채팅">
            <View>
                <ScrollView>
                    {
                        chatRoomList.map((item,index) => {
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
