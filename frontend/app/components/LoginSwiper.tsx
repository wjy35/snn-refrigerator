import React from 'react';
import Swiper from 'react-native-swiper';
import {StyleSheet, Text, View} from "react-native";
import {styles} from "@/styles/styles";

const loginStyles = StyleSheet.create({
  title: {
    fontSize: 18,
    color: '#3093EF',
    marginBottom: 5,

  },
  bodyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '60%'
  },
  bodyText: {
    fontSize: 26,
    textAlign: 'center'

  },
  imageContainer: {
    flex: 3,
  },
  itemContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyHighlight: {
    color: '#3093EF'
  }

})

const LoginSwiper = () => {
  return (
    <>
      <Swiper loop={true} showsPagination={false} autoplay={true}>
        <View style={loginStyles.itemContainer}>
          <View style={loginStyles.imageContainer}>
          </View>
          <View style={loginStyles.bodyContainer}>
            <Text style={[styles.font, loginStyles.title]}>식재료 유통기한 관리</Text>
            <Text style={[styles.font, loginStyles.bodyText]}>식재료를 등록하고</Text>
            <Text style={[styles.font, loginStyles.bodyText]}>
              <Text style={loginStyles.bodyHighlight}>유통기한</Text>
              <Text>을</Text>
            </Text>
            <Text style={[styles.font, loginStyles.bodyText]}>한 눈에 볼 수 있어요</Text>
          </View>
        </View>
        <View style={loginStyles.itemContainer}>
          <View style={loginStyles.imageContainer}>
          </View>
          <View style={loginStyles.bodyContainer}>
            <Text style={[styles.font, loginStyles.title]}>레시피 추천</Text>
            <Text style={[styles.font, loginStyles.bodyText]}>냉장고 안의 재료들로</Text>
            <Text style={[styles.font, loginStyles.bodyText]}>만들 수 있는</Text>
            <Text style={[styles.font, loginStyles.bodyText]}>
              <Text style={loginStyles.bodyHighlight}>레시피</Text>
              <Text>를 추천받아요</Text>
            </Text>
          </View>
        </View>
        <View style={loginStyles.itemContainer}>
          <View style={loginStyles.imageContainer}>
          </View>
          <View style={loginStyles.bodyContainer}>
            <Text style={[styles.font, loginStyles.title]}>환경을 위한 나눔</Text>
            <Text style={[styles.font, loginStyles.bodyText]}>남는 식재료를</Text>
            <Text style={[styles.font, loginStyles.bodyText]}>
              <Text style={loginStyles.bodyHighlight}>근처 이웃들</Text>
              <Text>과</Text>
            </Text>
            <Text style={[styles.font, loginStyles.bodyText]}>주고받으세요</Text>
          </View>
        </View>
      </Swiper>
    </>
  );
};

export default LoginSwiper;
