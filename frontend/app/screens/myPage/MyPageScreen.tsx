import React from 'react';
import { View, Text, Button } from 'react-native';
import MyPageLayout from "./MyPageLayout";


const MyPageScreen = ({navigation}:any) => {
  return (
    <MyPageLayout title="마이 페이지">
      <Text>MyPageScreen</Text>
      <Button
        title="수정"
        onPress={ () => navigation.navigate('MyPageUpdate')}
      />
      <Button
        title="계정 설정"
        onPress={ () => navigation.navigate('AccountSetting')}
      />
      <Button
        title="알림 설정"
        onPress={ () => navigation.navigate('AlarmSetting')}
      />
      <Button
        title="내 나눔 내역"
        onPress={ () => navigation.navigate('MyShare')}
      />
      <Button
        title="즐겨찾기 레시피"
        onPress={ () => navigation.navigate('MyFavorite')}
      />
    </MyPageLayout>
  )
}

export default MyPageScreen;
