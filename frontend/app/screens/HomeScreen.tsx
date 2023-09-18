import React from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import BottomNavigator from 'components/BottomNavigator';
import {styles} from '@/styles/styles';
import RecipeItem from '@/components/RecipeItem';
import Progressbar from '@/components/Progressbar';
import sampleApi from '@/apis/sampleApi';

const HomeScreen = ({navigation}:any) => {
  const test = async () => {
    try {
      let res = await sampleApi.test();
      if (res.status === 200) {
        console.log(res)
      } else {
        console.log(res)
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={[styles.font]}>오늘은 어떤 음식을 만들어 볼까요?</Text>
        <RecipeItem/>
        <View style={styles.marginContainer}>
          <Progressbar progress={2} total={3} textList={['기본 정보', '필요한 재료', '조리 과정']}/>
        </View>
        <Button onPress={test} title={'fdasfdsa'}></Button>
      </ScrollView>
      <BottomNavigator now='home'/>
    </View>
  );
};

export default HomeScreen;
