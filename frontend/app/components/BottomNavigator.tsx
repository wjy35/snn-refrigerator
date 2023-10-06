import React, {useEffect, useState} from 'react';
import {View, Button, Text, TouchableWithoutFeedback, Keyboard} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {styles} from 'styles/styles';
import {bottomTabStyles} from "@/styles/bottomTabStyles";
import {
  homeDisactive,
  homeActive,
  mypageDisactive,
  mypageActive,
  recipeActive,
  recipeDisactive,
  shareActive,
  shareDisactive,
  fridgeActive, fridgeDisactive
} from '@/assets/icons/icons';
import {SvgXml} from 'react-native-svg';
import {Shadow} from "react-native-shadow-2";

interface props {
  now: string,
}
const BottomNavigator = ({now}: props) => {
  const navigation: any = useNavigation();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setIsVisible(false);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setIsVisible(true);
    });
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <>
      {
        isVisible && (
          <View style={[bottomTabStyles.tabContainer, {zIndex: 100}]}>
            <Shadow style={{
              alignItems: 'center',
              justifyContent: 'center',}}>
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
                      <Text style={[now==='home'&&styles.mainColor, styles.font, bottomTabStyles.tabFontSize]} numberOfLines={1}>홈</Text>
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
                      <Text style={[now==='recipe'&&styles.mainColor, styles.font, bottomTabStyles.tabFontSize]} numberOfLines={1}>레시피</Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
                <View style={[bottomTabStyles.singleTab]}>
                  <TouchableWithoutFeedback
                    onPress={ () => navigation.navigate('Fridge')}
                  >
                    <View style={bottomTabStyles.singleTab}>
                      <SvgXml
                        //TODO : 냉장고 아이콘
                        xml={now==='fridge'?fridgeActive:fridgeDisactive}
                        width={24}
                        height={24}
                      />
                      <Text style={[now==='fridge'&&styles.mainColor, styles.font, bottomTabStyles.tabFontSize]} numberOfLines={1}>냉장고</Text>
                    </View>
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
                      <Text style={[now==='share'&&styles.mainColor, styles.font, bottomTabStyles.tabFontSize]} numberOfLines={1}>나눔</Text>
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
                      <Text style={[now==='mypage'&&styles.mainColor, styles.font, bottomTabStyles.tabFontSize]} numberOfLines={1}>마이페이지</Text>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </View>
            </Shadow>
          </View>
        )
      }
    </>

  );
};

export default BottomNavigator;
