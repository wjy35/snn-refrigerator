import React from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import BottomNavigator from 'components/BottomNavigator';
import {styles} from '@/styles/styles';
import RecipeItem from '@/components/RecipeItem';
import Progressbar from '@/components/Progressbar';

const HomeScreen = ({navigation}:any) => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={[styles.font]}>오늘은 어떤 음식을 만들어 볼까요?</Text>
        <RecipeItem/>
        <View style={styles.activeSingleTab}>
          <Progressbar progress={2} total={3} textList={['기본 정보', '필요한 재료', '조리 과정']}/>
        </View>
      </ScrollView>
      <BottomNavigator now='home'/>
    </View>
  );
};

export default HomeScreen;
