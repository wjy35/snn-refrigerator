import React, {useEffect, useState} from 'react';
import {View, Text, Button, ScrollView, Image, TouchableWithoutFeedback} from 'react-native';
import MyPageLayout from "./MyPageLayout";
import {myPageStyles} from "@/styles/myPageStyles";
import SettingContainer from "@/components/SettingContainer";
import memberApi from "@/apis/memberApi";
import {useSelector} from "react-redux";
import {styles} from "@/styles/styles";
import {locationIcon} from "@/assets/icons/icons";
import {SvgXml} from "react-native-svg";


const MyPageScreen = ({navigation}:any) => {
  const settings = [
    {name: '계정 설정', goto: 'AccountSetting'},{name: '알림 설정', goto: 'AlarmSetting'},{name: '내 나눔 내역', goto: 'MyShare'},{name: '즐겨찾기 레시피', goto: 'MyFavorite'}, {name:'임시 회원가입용', goto: 'SignUp'}, {name: '유저페이지', goto: 'User'}
  ];
  const memberId = useSelector((state) => state.userReducer.memberId);
  const [user, setUser] = useState<any>();


  function goto(t: string){
    navigation.navigate(t)
  }

  useEffect(() => {
    !user && getUserDetail();
  });

  async function getUserDetail(){
    console.log(memberId);
    try {
      const res = await memberApi.memberDetail(memberId);
      if (res.status === 200) {
        console.log(res.data.data.memberInfo);
        setUser(res.data.data.memberInfo);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <MyPageLayout title="마이 페이지">
      {/*<Button*/}
      {/*  title="수정"*/}
      {/*  onPress={ () => navigation.navigate('MyPageUpdate')}*/}
      {/*/>*/}
      <ScrollView style={{width: '100%'}}>
        <View style={[myPageStyles.infoContainer]}>
          <View style={[myPageStyles.profileImage, {marginTop: 20}]}>
            {
              user && <Image source={{uri: user.profileImageUrl}} style={{width: '100%', height: '100%', borderRadius: 100}}/>
            }
          </View>
          <View style={[myPageStyles.profileInfo, {alignItems: 'center', marginTop: 10}]}>
            <Text style={[styles.font, {fontSize: 36}]}>{user.nickname}</Text>
            <Text style={[styles.font, {color: 'grey', fontSize: 24}]}>서울 역삼동</Text>
            <TouchableWithoutFeedback onPress={()=>console.log('수정')}>
              <View>
                <Text>
                  <SvgXml
                    xml={locationIcon}
                    width={19}
                    height={19}
                  />
                  <Text>
                    수정
                  </Text>
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={[myPageStyles.profileRowContainer, {height: 100}]}>

          </View>
        </View>
        <View style={myPageStyles.optionsContainer}>
          {
            settings.map((i) => {
              return (
                <React.Fragment key={`${i.goto}`}>
                  <SettingContainer name={i.name} goto={i.goto} optionFunc={goto}/>
                </React.Fragment>
              )
            })
          }
        </View>
      </ScrollView>
    </MyPageLayout>
  )
}

export default MyPageScreen;
