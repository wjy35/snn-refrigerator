import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, Button, ImageBackground, ScrollView, FlatList} from 'react-native';
import {styles} from "@/styles/styles";
import TopNavigator from "@/components/TopNavigator";
import BottomChat from "@/components/BottomChat";
import {useSelector} from "react-redux";
import {RootState} from "@/reducers/reducers";
import chatApi from "@/apis/chatApi";
import {useFocusEffect, useRoute} from "@react-navigation/native";
import * as Stomp from "webstomp-client";
import {Client} from "webstomp-client";
import SingleChatContent from "@/components/SingleChatContent";


const SingleShareChatScreen = ({navigation}: any) => {
    const [chatList, setChatList] = useState<
        Array<{
            memberId: number,
            content: string,
            timestamp: number,
        }>
    >([]);
    const [client, setClient] = useState<Client>();
    const route = useRoute();
    const chatRoomId = route.params.chatRoomId;
    const receiveMemberId = route.params.receiveMemberId;
    const {memberId} = useSelector((state: RootState) => state.userReducer);
    useEffect(() => {
        const getChatList = async () => {
            try {
                let res = await chatApi.chatList(chatRoomId);
                if (res.status === 200) {
                    console.log("res", res);
                    setChatList(res.data.data.chatList);
                }
            } catch (e) {
                console.log(e);
            }
        }
        getChatList();
    }, []);

    function onToggle(currentChat) {
        setChatList((prevChatList:any[])=>{
            prevChatList.shift();
            const newChatList = [...prevChatList];
            newChatList.push(currentChat);
            return newChatList;
        });
    };

    useFocusEffect(
        useCallback(() => {
            const stompClient = Stomp.client("ws://a502.store/chat/endpoint");
            setClient(stompClient);
            stompClient.isBinary = true;
            stompClient.connect(
                {
                    memberId: memberId
                },
                () => {
                    stompClient.subscribe(
                        `/topic/${memberId}/${chatRoomId}`,
                        (res) => {
                            let currentChat = JSON.parse(res.body);
                            onToggle(currentChat);
                        });
                },
                (error) => {
                    console.log(error)
                    // ToDo socket연결 실패 오류를 출력
                });


            return () => {
                stompClient.disconnect(() => {
                    console.log("disconnect")
                })
            }
        }, []));

    function sendMessage(text: string) {
        if (!text) return;
        const chatPayload = {
            "chatRoomId": `${chatRoomId}`,
            "sendMemberId": `${memberId}`,
            "receiveMemberId": `${receiveMemberId}`,
            "content":`${text}`
        };
        client.send(`/`,JSON.stringify(chatPayload));
    }

    return (
        <View style={[styles.layout]}>
            <ImageBackground source={require('@/assets/images/background1.png')} resizeMode="cover" style={styles.bg}>
                <TopNavigator title={'독버섯 김석주'}/>
                <View
                  style={[{flex: 1, borderWidth: 1, flexDirection: 'column-reverse'}]}
                >
                    <FlatList
                      inverted={true}
                      data={chatList}
                      windowSize={4}
                      initialNumToRender={10}
                      renderItem={(item) => <SingleChatContent item={item.item} memberId={memberId}/>}
                      keyExtractor={(item) => String(item.timestamp)+String(item.memberId)}
                      onEndReachedThreshold={0.1}
                      contentContainerStyle={{paddingHorizontal: 10}}
                    />
                </View>
                <View style={{height: 80}}></View>
                <BottomChat onSubmit={sendMessage}/>
            </ImageBackground>
        </View>
    )
}

export default SingleShareChatScreen;
