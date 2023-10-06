import React, {useEffect, useState} from 'react';
import {View, Text, Button, ScrollView, ImageBackground, TouchableWithoutFeedback} from 'react-native';
import {styles} from "@/styles/styles";
import MyIngredientList from "@/components/MyIngredientList";
import BasicBadge from "@/components/BasicBadge";
import {
  cold,
  coldWhite,
  cool,
  coolWhite,
  eyeIcon,
  eyeSlashColdIcon, eyeSlashCoolIcon,
  eyeSlashWarmIcon, plusIcon,
  warm,
  warmWhite
} from "@/assets/icons/icons";
import FridgeLayout from "@/screens/fridge/FridgeLayout";
import {COLD_COLOR, COOL_COLOR, TEXT_COLOR, WARM_COLOR} from "@/assets/colors/colors";
import {SvgXml} from "react-native-svg";
import {Shadow} from "react-native-shadow-2";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/reducers/reducers";
import {setChangedAction, setHouseIngredientsAction} from "@/actions/houseAction";
import houseApi from "@/apis/houseApi";

interface props {
  title?: string;
  optionTitle?: string;
  optionFunction?: Function;
}

const FridgeScreen = ({navigation}:any) => {
  const [visibleCold, setVisibleCold] = useState(true);
  const [visibleCool, setVisibleCool] = useState(true);
  const [visibleWarm, setVisibleWarm] = useState(true);
  const { houseCode, changed } = useSelector((state:RootState) => state.houseReducer);
  const houseIngredients = useSelector((state:RootState) => state.houseReducer.houseIngredients)
  const dispatch = useDispatch();

  function setChanged(bool: boolean){
    dispatch(setChangedAction(bool))
  }


  const getIngredients = async() => {
    try{
      let res = await houseApi.houseIngredientList(houseCode);
      // console.log(res);
      if(res.status===200){
        // console.log(res.data.data.ingredients);
        res.data.data.ingredients.sort((a: { lastDate: string | number | Date; }, b: { lastDate: string | number | Date; })=>{
          // @ts-ignore
          return new Date(a.lastDate) - new Date(b.lastDate)
        })
        dispatch(setHouseIngredientsAction(res.data.data.ingredients));
        // setIngredients(res.data.data.ingredients);
      }else{
        // console.log(res.data.message);
      }
    }catch (e){
      console.log(e);
    }
  }

  useEffect(() => {
    if(changed) getIngredients();
    setChanged(false);
  }, [changed]);

  return (
    <FridgeLayout title="냉장고">
      <View style={styles.container}>
          <View style={{flexDirection:'row'}}>
              <BasicBadge leftIcon={visibleCold?coldWhite:cold} icon={visibleCold?eyeIcon:eyeSlashColdIcon} fill={visibleCold} color='#00D1FF' name={'냉동'} onPress={()=>{setVisibleCold(prev=>!prev)}}/>
              <BasicBadge leftIcon={visibleCool?coolWhite:cool} icon={visibleCool?eyeIcon:eyeSlashCoolIcon} fill={visibleCool} color='#3093EF' name={'냉장'} onPress={()=>{setVisibleCool(prev=>!prev)}}/>
              <BasicBadge leftIcon={visibleWarm?warmWhite:warm} icon={visibleWarm?eyeIcon:eyeSlashWarmIcon} fill={visibleWarm} color='#FF9A03' name={'상온'} onPress={()=>{setVisibleWarm(prev=>!prev)}}/>
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
              <MyIngredientList types={[visibleCold?1:-1]} maxDate={10000} houseIngredients={houseIngredients}/>
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
                      <MyIngredientList types={[visibleCool?0:-1, visibleWarm?2:-1]} maxDate={10000} houseIngredients={houseIngredients}/>
                  <View style={{height: 80}}>
                  </View></>
              }
          </ScrollView>
      </View>

        <TouchableWithoutFeedback
            onPress={()=>{navigation.navigate('HouseAdd')}}
        >
        <View style={[{position: 'absolute', bottom: 80, alignSelf:'flex-end', flexDirection:'row', justifyContent:'center', paddingRight:20, paddingBottom:20}]}>

            <Shadow distance={4} offset={[2,2]} style={[{backgroundColor:'#3093EF', height:70,width:70,borderRadius:99, justifyContent:'center', alignItems: 'center'}]}>
                {/*<Text style={[styles.font, {color: '#FFFFFF', fontSize:25, textAlign:'center'}]}>추가</Text>*/}
              <SvgXml
                xml={plusIcon}
                width={35}
                height={35}
                style={{marginHorizontal: 5}}/>
            </Shadow>
        </View>
    </TouchableWithoutFeedback>
    </FridgeLayout>
  )
}

export default FridgeScreen;
