import React, {useRef} from 'react';
import Swiper from 'react-native-swiper';
import {Text, TouchableWithoutFeedback, View} from "react-native";
import {SvgXml} from "react-native-svg";
import {styles} from "@/styles/styles";
import {blackMinusIcon, blackPlusIcon, closeIcon,} from "@/assets/icons/icons";
import {MAIN_COLOR} from "@/assets/colors/colors";


interface props {
  name: string;
  amount: number;
  onPressMinus: Function;
  onPressPlus: Function;
  onPressClose: Function;
}
const ShareIngredientItem = ({ name, amount, onPressMinus, onPressPlus, onPressClose }: props) => {

  return (
    <View style={{flexDirection: 'row', height: 45, width: '100%', justifyContent: 'space-between', alignItems: 'center', marginVertical: 5}}>
      <View style={[{width: '80%', height: '100%', borderWidth: 1, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: 16}]}>
        <View>
          <Text style={[styles.font, {fontSize: 24}]}>{name}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TouchableWithoutFeedback onPress={()=>onPressMinus()}>
            <View style={{backgroundColor: 'skyblue', width: 25, height: 25, justifyContent: 'center', alignItems: 'center', borderBottomLeftRadius: 100, borderTopLeftRadius: 100, borderWidth: 1, borderColor: MAIN_COLOR}}>
              <SvgXml
                xml={blackMinusIcon}
                width={15}
                height={15}
              />
            </View>
          </TouchableWithoutFeedback>
          <View style={{backgroundColor: 'white', width: 25, height: 25, justifyContent: 'center', alignItems: 'center', borderTopWidth: 1, borderBottomWidth: 1, borderColor: MAIN_COLOR}}>
            <Text style={[styles.font, {fontSize: 20}]}>{amount}</Text>
          </View>
          <TouchableWithoutFeedback onPress={()=>onPressPlus()}>
            <View style={{backgroundColor: 'skyblue', width: 25, height: 25, justifyContent: 'center', alignItems: 'center', borderBottomRightRadius: 100, borderTopRightRadius: 100, borderWidth: 1, borderColor: MAIN_COLOR}}>
              <SvgXml
                xml={blackPlusIcon}
                width={15}
                height={15}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
      <View>
        <TouchableWithoutFeedback onPress={()=>onPressClose()}>
          <View style={[{borderRadius: 100, backgroundColor: 'red', width: 30, height: 30, justifyContent: 'center', alignItems: 'center'}]}>
            <SvgXml
              xml={closeIcon}
              width={15}
              height={15}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>

  );
};

export default ShareIngredientItem;