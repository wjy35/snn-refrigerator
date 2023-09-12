import React from 'react';
import { View, Text, Button, ScrollView } from 'react-native';
import BottomNavigator from 'components/BottomNavigator';
import {styles} from '@/styles/styles';
import RecipeItem from "@/components/RecipeItem";

const HomeScreen = ({navigation}:any) => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={[styles.font]}>오늘은 어떤 음식을 만들어 볼까요?</Text>
        <RecipeItem/>
      </ScrollView>
      <BottomNavigator now='home'/>
    </View>
  );
};

export default HomeScreen;
