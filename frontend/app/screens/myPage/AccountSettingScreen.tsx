import React, {useEffect, useState} from 'react';
import {View, Text, Button, ScrollView} from 'react-native';
import MyPageLayout from "@/screens/myPage/MyPageLayout";
import {myPageStyles} from "@/styles/myPageStyles";
import SettingContainer from "@/components/SettingContainer";
import SettingDetail from "@/components/SettingDetail";
import PrintHouseCode from "@/components/PrintHouseCode";
import HateIngredient from "@/components/HateIngredient";
import {useSelector} from "react-redux";
import {RootState} from "@/reducers/reducers";
import memberApi from "@/apis/memberApi";
import PlaceManage from "@/components/PlaceManage";

const AccountSettingScreen = ({navigation}:any) => {
  const memberId = useSelector((state: RootState) => state.userReducer.memberId);
  const settings = [
    {name: '내 지역 관리', goto: '1'},{name: '제외 식재료 관리', goto: '2'},{name: '계정 우리집 관리', goto: '3'},
  ];
  const [now, setNow] = useState<string>('0');
  const [houseCode, setHouseCode] = useState<string>('');

  useEffect(() => {
    getHouseCode();
  }, []);

  function changeNow(newNow: string){
    setNow(newNow);
  }

  async function getHouseCode(){
    if(houseCode !== '') return;
    const res = await memberApi.memberDetail(memberId);
    setHouseCode(res.data.data.memberInfo.houseCode);
  }

  return (
    <MyPageLayout title="계정 설정">
      <ScrollView style={{width: '100%'}} keyboardShouldPersistTaps='handled' overScrollMode='auto'>
        <View style={myPageStyles.optionsContainer}>
          {
            settings.map((i) => {
              if (i.goto === now){
                return (
                  <React.Fragment key={`${i.goto}`}>
                    <SettingDetail name={i.name} goto={i.goto} houseCode={houseCode} memberId={memberId} closeFunc={()=>{setNow('0')}}/>
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
