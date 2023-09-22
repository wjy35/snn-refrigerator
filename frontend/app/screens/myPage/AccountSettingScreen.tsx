import React from 'react';
import {View, Text, Button, ScrollView} from 'react-native';
import MyPageLayout from "@/screens/myPage/MyPageLayout";
import {myPageStyles} from "@/styles/myPageStyles";
import SettingContainer from "@/components/SettingContainer";

const AccountSettingScreen = ({navigation}:any) => {
  const settings = [
    {name: '내 지역 관리', goto: 'AccountSetting'},{name: '제외 식재료 관리', goto: 'AlarmSetting'},{name: '계정 우리집 관리', goto: 'MyShare'}
  ]
  return (
    <MyPageLayout title="계정 설정">
      <ScrollView style={{width: '100%'}}>
        <View style={myPageStyles.optionsContainer}>
          {
            settings.map((i) => {
              return (
                <React.Fragment key={`${i.goto}`}>
                  <SettingContainer name={i.name} goto={i.goto}/>
                </React.Fragment>
              )
            })
          }
        </View>
      </ScrollView>
    </MyPageLayout>
  )
}

export default AccountSettingScreen;
