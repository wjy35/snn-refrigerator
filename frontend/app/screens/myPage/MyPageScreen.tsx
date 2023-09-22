import React from 'react';
import {View, Text, Button, ScrollView} from 'react-native';
import MyPageLayout from "./MyPageLayout";
import {myPageStyles} from "@/styles/myPageStyles";
import SettingContainer from "@/components/SettingContainer";


const MyPageScreen = ({navigation}:any) => {
  const settings = [
    {name: '계정 설정', goto: 'AccountSetting'},{name: '알림 설정', goto: 'AlarmSetting'},{name: '내 나눔 내역', goto: 'MyShare'},{name: '즐겨찾기 레시피', goto: 'MyFavorite'},
  ]

  function goto(t: string){
    navigation.navigate(t)
  }

  return (
    <MyPageLayout title="마이 페이지">
      {/*<Button*/}
      {/*  title="수정"*/}
      {/*  onPress={ () => navigation.navigate('MyPageUpdate')}*/}
      {/*/>*/}
      <ScrollView style={{width: '100%'}}>
        <View style={myPageStyles.infoContainer}>
          <View style={myPageStyles.profileImage}>

          </View>
          <View style={myPageStyles.profileInfo}>
            <Text>독버섯 김석주</Text>
            <Text>서울 역삼동</Text>
            <Text>수정</Text>
          </View>
          <View style={myPageStyles.profileRowContainer}>

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
