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
  onPressClose?: Function;
  remain?: number;
}
const ShareIngredientItem = ({ name, amount, onPressMinus, onPressPlus, onPressClose, remain }: props) => {

  return (
    <View style={{flexDirection: 'row', height: 45, width: '100%', justifyContent: 'space-between', alignItems: 'center', marginVertical: 5}}>
      <View style={[{flex: 6, height: '100%', borderWidth: 1, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: 16}]}>
        <View>
          <Text style={[styles.font]}>
            <Text style={[{fontSize: 24}]}>{name}</Text>
            {
              remain && (
                <Text style={[{color: 'grey'}]}>  남은개수 : {remain}</Text>
              )
            }
          </Text>
        </View>
      </View>
      {
        onPressClose && (
          <View style={{flex: 1, alignItems: 'flex-end'}}>
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
        )
      }
    </View>

  );
};

export default ShareIngredientItem;
