import React from 'react';
import {View, Text, Button, ScrollView, ImageBackground} from 'react-native';
import BottomNavigator from "@/components/BottomNavigator";
import {styles} from "@/styles/styles";
import {homeScreenStyles} from "@/styles/homeScreenStyles";
import MyIngredientList from "@/components/MyIngredientList";
import BasicBadge from "@/components/BasicBadge";
import {coldWhite, coolWhite, eyeIcon, warmWhite} from "@/assets/icons/icons";
import TopNavigator from "@/components/TopNavigator";
import RecipeLayout from "@/screens/recipe/RecipeLayout";
import RecipeList from "@/components/RecipeList";
import FridgeLayout from "@/screens/fridge/fridgeLayout";

interface props {
  title?: string;
  optionTitle?: string;
  optionFunction?: Function;
}

const FridgeScreen = ({navigation}:any) => {
  return (
      <FridgeLayout title="냉장고">
        <View style={styles.container}>

            <View style={{borderWidth:1, flexDirection:'row'}}>
                <BasicBadge leftIcon={coldWhite} icon={eyeIcon} backgroundColor='#00D1FF' name={'냉동'} onPress={()=>{}}/>
                <BasicBadge leftIcon={coolWhite} icon={eyeIcon} backgroundColor='#3093EF' name={'냉장'} onPress={()=>{}}/>
                <BasicBadge leftIcon={warmWhite} icon={eyeIcon} backgroundColor='#FF9A03' name={'상온'} onPress={()=>{}}/>
            </View>
        </View>

          <View style={[{position: 'absolute', bottom: 80, width:"100%", borderWidth:1, flexDirection:'row', justifyContent:'center'}]}>
              <BasicBadge leftIcon={coldWhite} backgroundColor='#3093EF' name={'추가하기'} onPress={()=>{}}/>
              <BasicBadge leftIcon={coldWhite} backgroundColor='#3093EF' name={'수정하기'} onPress={()=>{}}/>
          </View>
      </FridgeLayout>
  )
}

export default FridgeScreen;
