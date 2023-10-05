import React, {useRef} from 'react';
import Swiper from 'react-native-swiper';
import {Text, TouchableWithoutFeedback, View} from "react-native";
import {SvgXml} from "react-native-svg";
import {styles} from "@/styles/styles";


interface props {
  color: string;
  name: string;
  onPress: Function;
  icon? : string,
  leftIcon? : string,
  fill? : boolean,
}
const BasicBadge = ({color, name, onPress, icon, leftIcon, fill=true}: props) => {

  function onPressFunction(){
    onPress();
  }

  function onPressCloseFunction() {
    onPress();
  }

  return (
    <View style={{margin: 5}}>
      <TouchableWithoutFeedback onPress={onPressFunction}>
        <View style={[{padding: 5, height: 40,borderRadius: 100, justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row'}, fill?{ backgroundColor: color, }:{backgroundColor: '#FFFFFF',borderColor:color, borderWidth:1}]}>
          {leftIcon&&(<SvgXml
              xml={leftIcon}
              width={15}
              height={15}
              style={{marginLeft:6}}
          />)}
          <View style={{marginHorizontal:6}}>
            <Text style={[styles.font, {fontSize: 20, color: fill?'#ffffff':color, }]}>{name}</Text>
          </View>
          {icon&&(<View>
            <TouchableWithoutFeedback onPress={onPressCloseFunction}>
              <SvgXml
                xml={icon}
                width={15}
                height={15}
                style={{marginRight:6}}
              />
            </TouchableWithoutFeedback>
          </View>)}
        </View>
      </TouchableWithoutFeedback>
    </View>

  );
};

export default BasicBadge;
