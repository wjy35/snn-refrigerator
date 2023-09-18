import React from 'react';
import { View, Text, Button } from 'react-native';
import BottomNavigator from '@/components/BottomNavigator';
import {styles} from '@/styles/styles';
import Swiper from "react-native-swiper";
const LogInScreen = ({navigation}:any) => {
  return (
    <View style={styles.container}>
      <View style={{width: '100%', height: 500}}>
        <Swiper loop={true} showsPagination={false} >
          <View style={{width: '100%', height:500, borderWidth:1, backgroundColor: '#3093EF'}}>
            <View>
              <Text>이미지</Text>
            </View>
            <View>
              <Text style={styles.font}>식재료 유통기한 관리</Text>
              <Text style={styles.font}>식재료를 등록하고 유통기한을 한 눈에 볼 수 있어요</Text>
            </View>
          </View>
          <View style={{width: '100%', height:500, backgroundColor: '#3093EF'}}>
            <View>
              <Text>이미지</Text>
            </View>
            <View>
              <Text style={styles.font}>레시피 추천</Text>
              <Text style={styles.font}>냉장고 안의 재료들로 만들 수 있는 레시피를 추천받아요</Text>
            </View>
          </View>
          <View style={{width: '100%', height:500, backgroundColor: '#3093EF'}}>
            <View style={{flex: 2}}>
              <Text>이미지</Text>
            </View>
            <View style={{flex: 1, }}>
              <Text style={styles.font}>환경을 위한 나눔</Text>
              <Text style={styles.font}>남는 식재료를 근처 이웃들과 주고받으세요</Text>
            </View>
          </View>
        </Swiper>
      </View>
      <View style={{marginTop: 30}}>
        <Button title="카카오로그인"></Button>
      </View>
      <BottomNavigator now='login'/>
    </View>
  );
};

export default LogInScreen;
