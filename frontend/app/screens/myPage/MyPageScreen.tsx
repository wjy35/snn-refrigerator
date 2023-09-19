import React from 'react';
import {View, Text, Button, ScrollView} from 'react-native';
import MyPageLayout from "./MyPageLayout";
import {myPageStyles} from "@/styles/myPageStyles";


const MyPageScreen = ({navigation}:any) => {
  return (
    <MyPageLayout title="마이 페이지">
      {/*<Button*/}
      {/*  title="수정"*/}
      {/*  onPress={ () => navigation.navigate('MyPageUpdate')}*/}
      {/*/>*/}
      {/*<Button*/}
      {/*  title="계정 설정"*/}
      {/*  onPress={ () => navigation.navigate('AccountSetting')}*/}
      {/*/>*/}
      {/*<Button*/}
      {/*  title="알림 설정"*/}
      {/*  onPress={ () => navigation.navigate('AlarmSetting')}*/}
      {/*/>*/}
      {/*<Button*/}
      {/*  title="내 나눔 내역"*/}
      {/*  onPress={ () => navigation.navigate('MyShare')}*/}
      {/*/>*/}
      {/*<Button*/}
      {/*  title="즐겨찾기 레시피"*/}
      {/*  onPress={ () => navigation.navigate('MyFavorite')}*/}
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


        </View>
      </ScrollView>
    </MyPageLayout>
  )
}

export default MyPageScreen;
