import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, Button, ImageBackground, ScrollView, FlatList, ToastAndroid} from 'react-native';
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
import ShareItem from "@/components/ShareItem";
import BasicBadge from "@/components/BasicBadge";
import {ALERT_COLOR, MAIN_COLOR} from "@/assets/colors/colors";
import shareStatusApi from "@/apis/shareStatusApi";
import chatRoomApi from "@/apis/chatRoomApi";



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
    const nickname = route.params.nickname;

    const {memberId} = useSelector((state: RootState) => state.userReducer);
    const [shareStatus,setShareStatus] = useState<number>();

    const getShareStatus = async () => {
        try{
            let res = await shareStatusApi.shareStatus({chatRoomId,memberId});
            if (res.status === 200){
                console.log("res", res);
                setShareStatus(res.data.data.shareStatus);
            }
        }catch (e){
            console.log(e);
        }
    }

    const updateShareStatus = async (shareStatus) => {
        try{
            let res = await shareStatusApi.updateShareStatus({chatRoomId,memberId,shareStatus});
            if (res.status === 200){
                const chatPayload = {
                    "chatRoomId": `${chatRoomId}`,
                    "sendMemberId": `${memberId}`,
                    "receiveMemberId": `${receiveMemberId}`,
                    "content":""
                };
                client.send(`/`,JSON.stringify(chatPayload));
            }
        }catch (e){
            console.log(e);
        }
    }


    useEffect(() => {
        const getChatList = async () => {
            try {
                let res = await chatApi.chatList(chatRoomId);
                if (res.status === 200) {
                    // console.log("res", res);
                    setChatList(res.data.data.chatList.reverse());
                }
            } catch (e) {
                console.log(e);
            }
        }
        getShareStatus();
        getChatList();
    }, []);

    function onToggle(currentChat) {
        setChatList((prevChatList:any[])=>{
            prevChatList.pop();
            const newChatList = [...prevChatList];
            newChatList.unshift(currentChat);
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
                            console.log("@@@@@@@2CheckPoint",currentChat);
                            if(currentChat.content){
                                onToggle(currentChat);
                            }else{
                                getShareStatus();
                            }
                        });
                },
                (error) => {
                    console.log(error)
                    // ToDo socket연결 실패 오류를 출력
                });


            return () => {
                stompClient.disconnect(() => {
                    // console.log("disconnect")
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
                <TopNavigator title={nickname}/>
                <View style={{borderWidth: 1, width: '100%'}}>
                    <View>
                        {/*<ShareItem item={shareDetail}/>*/}
                    </View>
                    {
                        shareStatus === 0 && (
                            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                <View style={{paddingHorizontal: 5}}>
                                    <Text style={[styles.font, {fontSize: 14}]}>나눔 확정 0/2</Text>
                                </View>
                                <View>
                                    <BasicBadge color={MAIN_COLOR} fill={false} name={'확정'} onPress={()=>{
                                        updateShareStatus(true);
                                    }}/>
                                </View>
                                <View>
                                    <BasicBadge color={ALERT_COLOR} fill={false} name={'거절'} onPress={()=>{}}/>
                                </View>
                            </View>
                        )
                    }
                    {
                        shareStatus === 1 && (
                        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            <View style={{paddingHorizontal: 5}}>
                                <Text style={[styles.font, {fontSize: 16}]}>나눔 확정 1/2</Text>
                            </View>
                            <View>
                                <BasicBadge color={ALERT_COLOR} fill={false} name={'취소'} onPress={()=>{
                                    updateShareStatus(false);
                                }}/>
                            </View>
                        </View>
                      )
                    }
                    {
                        shareStatus === 2 && (
                            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                <View style={{paddingHorizontal: 5}}>
                                    <Text style={[styles.font, {fontSize: 16}]}>나눔 확정 1/2</Text>
                                </View>
                                <View>
                                    <BasicBadge color={MAIN_COLOR} fill={false} name={'확정'} onPress={()=>{updateShareStatus(true)}}/>
                                </View>
                                <View>
                                    <BasicBadge color={ALERT_COLOR} fill={false} name={'거절'} onPress={()=>{}}/>
                                </View>
                            </View>
                        )
                    }
                    {
                        shareStatus === 3 && (
                            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                <View style={{paddingHorizontal: 5}}>
                                    <Text style={[styles.font, {fontSize: 14}]}>나눔 확정 완료</Text>
                                </View>
                            </View>
                        )
                    }
                </View>
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
