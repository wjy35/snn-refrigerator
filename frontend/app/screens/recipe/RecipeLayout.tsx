import React from 'react';
import {ScrollView, View} from 'react-native';
import {styles} from "@/styles/styles";
import BottomNavigator from "@/components/BottomNavigator";


const RecipeLayout = ({children}:any) => {
  return (
    <View style={styles.container}>
      {children}
      <BottomNavigator now='recipe'/>
    </View>
  )
}

export default RecipeLayout;
