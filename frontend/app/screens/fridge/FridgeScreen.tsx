import React, {useState} from 'react';
import {View, Text, Button, ScrollView, ImageBackground} from 'react-native';
import {styles} from "@/styles/styles";
import MyIngredientList from "@/components/MyIngredientList";
import BasicBadge from "@/components/BasicBadge";
import {cold, coldWhite, cool, coolWhite, eyeIcon, eyeSlashIcon, warm, warmWhite} from "@/assets/icons/icons";
import FridgeLayout from "@/screens/fridge/FridgeLayout";
import {COLD_COLOR, COOL_COLOR, TEXT_COLOR, WARM_COLOR} from "@/assets/colors/colors";
import {SvgXml} from "react-native-svg";

interface props {
  title?: string;
  optionTitle?: string;
  optionFunction?: Function;
}

const FridgeScreen = ({navigation}:any) => {
    const [visibleCold, setVisibleCold] = useState(true);
    const [visibleCool, setVisibleCool] = useState(true);
    const [visibleWarm, setVisibleWarm] = useState(true);
    return (
      <FridgeLayout title="냉장고">
        <View style={styles.container}>
            <View style={{flexDirection:'row'}}>
                <BasicBadge leftIcon={coldWhite} icon={visibleCold?eyeIcon:eyeSlashIcon} backgroundColor='#00D1FF' name={'냉동'} onPress={()=>{setVisibleCold(prev=>!prev)}}/>
                <BasicBadge leftIcon={coolWhite} icon={visibleCool?eyeIcon:eyeSlashIcon} backgroundColor='#3093EF' name={'냉장'} onPress={()=>{setVisibleCool(prev=>!prev)}}/>
                <BasicBadge leftIcon={warmWhite} icon={visibleWarm?eyeIcon:eyeSlashIcon} backgroundColor='#FF9A03' name={'상온'} onPress={()=>{setVisibleWarm(prev=>!prev)}}/>
            </View>
            <ScrollView style={{width: '100%'}}>
                {visibleCold&&(<><View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 10}}>
                    <View style={{flex: 1, height: 1, backgroundColor: COLD_COLOR}}/>
                    <SvgXml
                        xml={cold}
                        width={20}
                        height={20}
                        style={{marginHorizontal: 5}}/>
                    <Text style={{color: COLD_COLOR}}>냉동</Text>
                    <SvgXml
                        xml={cold}
                        width={20}
                        height={20}
                        style={{marginHorizontal: 5}}/>
                    <View style={{flex: 1, height: 1, backgroundColor: COLD_COLOR}}/>
                </View></>)}
                <MyIngredientList types={[visibleCold?1:-1]} maxDate={10000}/>
                {(visibleCool||visibleWarm)&&<>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 10}}>
                        <View style={{flex: 1, height: 1, backgroundColor: COOL_COLOR}}/>
                        <SvgXml
                            xml={cool}
                            width={20}
                            height={20}
                            style={{marginHorizontal: 5}}/>
                        <Text style={{color: COOL_COLOR}}>냉장</Text><Text style={{color:TEXT_COLOR}}> & </Text><Text
                        style={{color: WARM_COLOR}}>상온</Text>
                        <SvgXml
                            xml={warm}
                            width={20}
                            height={20}
                            style={{marginHorizontal: 5}}/>
                        <View style={{flex: 1, height: 1, backgroundColor: WARM_COLOR}}/>
                        </View>
                        <MyIngredientList types={[visibleCool?0:-1, visibleWarm?2:-1]} maxDate={10000}/>
                    <View style={{height: 80}}>
                    </View></>
                }
            </ScrollView>
        </View>

          <View style={[{position: 'absolute', bottom: 80, alignSelf:'center', flexDirection:'row', justifyContent:'center'}]}>
              <BasicBadge leftIcon={coldWhite} backgroundColor='#3093EF' name={'추가하기'} onPress={()=>{navigation.navigate('HouseAdd')}}/>
              <BasicBadge leftIcon={coldWhite} backgroundColor='#3093EF' name={'수정하기'} onPress={()=>{}}/>
          </View>
      </FridgeLayout>
  )
}

export default FridgeScreen;
