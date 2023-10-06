import React, {useEffect, useState} from 'react';
import {View, Text, Button, ScrollView, Image, TouchableWithoutFeedback} from 'react-native';
import ShareLayout from "@/screens/share/ShareLayout";
import {styles} from "@/styles/styles";
import {MAIN_COLOR, TEXT_COLOR} from "@/assets/colors/colors";
import ShareIngredientItem from "@/components/ShareIngredientItem";
import BasicBadge from "@/components/BasicBadge";
import {useRoute} from "@react-navigation/native";
import shareApi from "@/apis/shareApi";
import memberApi from "@/apis/memberApi";
import {useSelector} from "react-redux";
import {RootState} from "@/reducers/reducers";

const ShareDetailScreen = ({navigation}:any) => {
  const profileImageUrl = ''
  const route = useRoute();
  const [shareDetail, setShareDetail] = useState<any>();
  const userProfileImageUrl = route?.params?.userProfileImageUrl;
  const [shareUserId, setShareUserId] = useState(0);
  const {memberId} = useSelector((state: RootState) => state.userReducer)

  async function getDetail(){
    if (!route?.params?.sharePostId) return
    try {
      const res = await shareApi.getShareDetail({sharePostId: route.params.sharePostId});
      if (res.status === 200) {
        setShareDetail(res.data.data.response);
        await getUserId(res.data.data.response.nickname);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function getUserId(nickname: string){
    try {
      const res = await memberApi.getMemberIdFromNick(nickname);
      if (res.status === 200) {
        setShareUserId(res.data.data.memberId);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function deletePost(){
    try {
      const res = await shareApi.deletePost({sharePostId: route.params.sharePostId});
      if (res.status === 200) {
        navigation.goBack();
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(()=>{
    getDetail();
  }, [])

  return (
    <ShareLayout
      title="나눔"
      optionTitle={shareUserId === memberId ? '삭제' : ''}
      optionFunction={shareUserId === memberId ? () => {deletePost()} : ()=>{}}
    >
      <View style={{flex: 1}}>
        <ScrollView>
          <View style={[{width: '100%', padding: 15}]}>
            <View style={[{width: '100%', marginBottom: 10}]}>
              <View style={[{marginVertical: 10}]}>
                <Text style={[styles.font, {fontSize: 22}]}>{shareDetail?.locationName?shareDetail.locationName:'로딩 중 입니다'}</Text>
              </View>
              <View>
                <Text style={[styles.font, {fontSize: 28}]}>{shareDetail?.title?shareDetail.title:'로딩 중 입니다'}</Text>
              </View>
            </View>
            <View style={[{flexDirection: 'row', justifyContent: 'space-between'}]}>
              <View style={[{flexDirection: 'row', }]}>
                <View style={{height: 50, width: 50, marginRight: 5}}>
                  {userProfileImageUrl&&<Image source={{uri: userProfileImageUrl}}
                                           style={{height:50,width:50,borderRadius:99, borderWidth:1, borderColor:TEXT_COLOR ,marginRight:10}}
                  />}
                </View>
                <View>
                  <Text style={[styles.font, {fontSize: 16}]}>{shareDetail?.nickname?shareDetail.nickname:'로딩 중 입니다'}</Text>
                </View>
              </View>
              <View style={[{justifyContent: 'flex-end'}]}>
                <Text style={[styles.font, {fontSize: 14}]}>{shareDetail?.createdTime?`${shareDetail.createdTime}`:'로딩 중 입니다'}</Text>
              </View>
            </View>
            <View style={[{borderWidth: 1, minHeight: 200, marginVertical: 20, borderRadius: 16, padding: 10}]}>
              <Text style={[styles.font, {fontSize: 18}]}>{shareDetail?.content?shareDetail.content:'로딩 중 입니다'}</Text>
            </View>
            <View style={{marginBottom: 10}}>
              <View>
                <Text style={[styles.font, {fontSize: 14}]}>등록이미지</Text>
              </View>
              <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                {
                  shareDetail?.shareImages && (
                    <>
                      {
                        shareDetail.shareImages.map((i, idx) => {
                          return (
                            <React.Fragment key={`shareImage${idx}`}>
                              <View style={{borderWidth: 1, height: 70, width: 70, margin: 5}}>
                                <Image
                                  source={{uri: i}}
                                  style={{height:70,width:70,borderColor:TEXT_COLOR}}
                                />
                              </View>
                            </React.Fragment>
                          )
                        })
                      }
                    </>
                  )
                }
              </View>
            </View>
            <View>
              <View>
                <Text style={[styles.font, {fontSize: 14}]}>나눔 목록</Text>
              </View>
              <View>
                {
                  shareDetail?.shareIngredients && (
                    <>
                      {
                        shareDetail.shareIngredients.map((i, idx) => {
                          return (
                            <React.Fragment key={`shareIngredient${idx}`}>
                              <ShareIngredientItem name={i.ingredientName} onPressPlus={()=>{}} amount={0} onPressMinus={()=>{}} remain={i.remainAmount}/>
                            </React.Fragment>
                          )
                        })
                      }
                    </>
                  )
                }
              </View>
            </View>
            <View style={{height: 80}}></View>
          </View>
        </ScrollView>
        <View style={{position: 'absolute', bottom: 10, justifyContent: 'center', alignItems: 'center', width: '100%'}}>
          <BasicBadge color={MAIN_COLOR} fill={false} name={'나눔 예약'} onPress={()=>{}}/>
        </View>
      </View>
    </ShareLayout>
  )
}

export default ShareDetailScreen;
