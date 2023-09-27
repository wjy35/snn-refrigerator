import React, {useState} from 'react';
import {View, Text, Button, ScrollView} from 'react-native';
import MyPageLayout from "@/screens/myPage/MyPageLayout";
import {myPageStyles} from "@/styles/myPageStyles";
import SettingContainer from "@/components/SettingContainer";
import SettingDetail from "@/components/SettingDetail";

const AccountSettingScreen = ({navigation}:any) => {
  const settings = [
    {name: '내 지역 관리', goto: '1'},{name: '제외 식재료 관리', goto: '2'},{name: '계정 우리집 관리', goto: '3'}
  ];
  const [now, setNow] = useState<string>('0');

  function changeNow(newNow: string){
    setNow(newNow);
  }

  return (
    <MyPageLayout title="계정 설정">
      <ScrollView style={{width: '100%'}}>
        <View style={myPageStyles.optionsContainer}>
          {
            settings.map((i) => {
              if (i.goto === now){
                return (
                  <React.Fragment key={`${i.goto}`}>
                    <SettingDetail name={i.name} goto={i.goto}/>
                  </React.Fragment>
                );
              } else {
                return (
                  <React.Fragment key={`${i.goto}`}>
                    <SettingContainer name={i.name} goto={i.goto} optionFunc={changeNow}/>
                  </React.Fragment>
                );
              }
            })
          }
        </View>
      </ScrollView>
    </MyPageLayout>
  )
}

export default AccountSettingScreen;
