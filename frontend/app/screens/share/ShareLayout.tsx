import React from 'react';
import {ScrollView, View} from 'react-native';
import {styles} from "@/styles/styles";
import BottomNavigator from "@/components/BottomNavigator";


const ShareLayout = ({children}:any) => {
  return (
    <View style={styles.container}>
      <ScrollView>
        {children}
      </ScrollView>
      <BottomNavigator now='share'/>
    </View>
  )
}

export default ShareLayout;
