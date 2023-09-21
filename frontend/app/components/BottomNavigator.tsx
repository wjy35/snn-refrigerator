import React, {useState} from 'react';
import {View, Button, Text, TouchableWithoutFeedback} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {styles} from 'styles/styles';
import {bottomTabStyles} from "@/styles/bottomTabStyles";
import {homeDisactive, homeActive, mypageDisactive, mypageActive, recipeActive, recipeDisactive, shareActive, shareDisactive} from '@/assets/icons/icons';
import {SvgXml} from 'react-native-svg';
import Modal from 'react-native-modal';
import MyHouseModal from "@/components/MyHouseModal";
import {useDispatch, useSelector} from "react-redux";
import {toggleVisibleAction} from '@/actions/houseAction';

interface props {
  now: string,
}
const BottomNavigator = ({now}: props) => {
  const navigation: any = useNavigation();
  const dispatch = useDispatch();
  const isVisible = useSelector((state: any) => state.houseReducer.isVisible)

  return (
    <View style={[bottomTabStyles.tabContainer, {zIndex: 100}]}>
      <View style={[bottomTabStyles.tabItemContainer]}>
        <View style={bottomTabStyles.singleTab}>
          <TouchableWithoutFeedback
            onPress={() => navigation.push('Home')}>
            <View style={bottomTabStyles.singleTab}>
              <SvgXml
                xml={now==='home'?homeActive:homeDisactive}
                width={24}
                height={24}
              />
              <Text style={[now==='home'&&styles.mainColor, styles.font, bottomTabStyles.tabFontSize]}>홈</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={bottomTabStyles.singleTab}>
          <TouchableWithoutFeedback
            onPress={ () => navigation.navigate('RecipeList')}
          >
            <View style={bottomTabStyles.singleTab}>
              <SvgXml
                xml={now==='recipe'?recipeActive:recipeDisactive}
                width={24}
                height={24}
              />
              <Text style={[now==='recipe'&&styles.mainColor, styles.font, bottomTabStyles.tabFontSize]}>레시피</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={[bottomTabStyles.singleTab]}>
          <TouchableWithoutFeedback
            onPress={ () => {
              dispatch(toggleVisibleAction({}));
            }}
          >
            <Text>냉장고</Text>
          </TouchableWithoutFeedback>
        </View>
        <View style={bottomTabStyles.singleTab}>
          <TouchableWithoutFeedback
            onPress={ () => navigation.navigate('ShareList')}
          >
            <View style={bottomTabStyles.singleTab}>
              <SvgXml
                xml={now==='share'?shareActive:shareDisactive}
                width={24}
                height={24}
              />
              <Text style={[now==='share'&&styles.mainColor, styles.font, bottomTabStyles.tabFontSize]}>나눔</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={bottomTabStyles.singleTab}>
          <TouchableWithoutFeedback
            onPress={ () => navigation.navigate('MyPage')}
          >
            <View style={bottomTabStyles.singleTab}>
              <SvgXml
                xml={now==='mypage'?mypageActive:mypageDisactive}
                width={24}
                height={24}
              />
              <Text style={[now==='mypage'&&styles.mainColor, styles.font, bottomTabStyles.tabFontSize]}>마이페이지</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );
};

export default BottomNavigator;
