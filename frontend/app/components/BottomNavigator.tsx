import React from 'react';
import {View, Button, Text, TouchableWithoutFeedback} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from 'styles/styles';
import {homeDisactive, homeActive, mypageDisactive, mypageActive, recipeActive, recipeDisactive, shareActive, shareDisactive} from '@/assets/icons/icons';
import {SvgXml} from 'react-native-svg';

interface props {
  now: string,
}
const BottomNavigator = ({now}: props) => {
  const navigation: any = useNavigation();

  return (
    <View style={styles.tabContainer}>
      <View style={styles.tabItemContainer}>
        <View style={styles.singleTab}>
          <TouchableWithoutFeedback
            onPress={() => navigation.push('Home')}>
            <View style={styles.singleTab}>
              <SvgXml
                xml={now==='home'?homeActive:homeDisactive}
                width={24}
                height={24}
              />
              <Text style={[now==='home'&&styles.mainColor, styles.font, styles.tabFontSize]}>홈</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.singleTab}>
          <TouchableWithoutFeedback
            onPress={ () => navigation.navigate('RecipeList')}
          >
            <View style={styles.singleTab}>
              <SvgXml
                xml={now==='recipe'?recipeActive:recipeDisactive}
                width={24}
                height={24}
              />
              <Text style={[now==='recipe'&&styles.mainColor, styles.font, styles.tabFontSize]}>레시피</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.singleTab}>
          <TouchableWithoutFeedback
            onPress={ () => navigation.navigate('Home')}
          >
            <Text>냉장고</Text>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.singleTab}>
          <TouchableWithoutFeedback
            onPress={ () => navigation.navigate('ShareList')}
          >
            <View style={styles.singleTab}>
              <SvgXml
                xml={now==='share'?shareActive:shareDisactive}
                width={24}
                height={24}
              />
              <Text style={[now==='share'&&styles.mainColor, styles.font, styles.tabFontSize]}>나눔</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.singleTab}>
          <TouchableWithoutFeedback
            onPress={ () => navigation.navigate('MyPage')}
          >
            <View style={styles.singleTab}>
              <SvgXml
                xml={now==='mypage'?mypageActive:mypageDisactive}
                width={24}
                height={24}
              />
              <Text style={[now==='mypage'&&styles.mainColor, styles.font, styles.tabFontSize]}>마이페이지</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );
};

export default BottomNavigator;
