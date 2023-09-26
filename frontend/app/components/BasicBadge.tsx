import React, {useRef} from 'react';
import Swiper from 'react-native-swiper';
import {Text, TouchableWithoutFeedback, View} from "react-native";
import {SvgXml} from "react-native-svg";
import {styles} from "@/styles/styles";


interface props {
  backgroundColor: string;
  name: string;
  onPress: Function;
  icon? : string,
  leftIcon? : string,
}
const BasicBadge = ({backgroundColor, name, onPress, icon, leftIcon}: props) => {

  function onPressFunction(){
    onPress();
  }

  function onPressCloseFunction() {
    onPress();
  }

  return (
    <View style={{margin: 5}}>
      <TouchableWithoutFeedback onPress={onPressFunction}>
        <View style={{padding: 10, height: 40, backgroundColor: backgroundColor, borderRadius: 100, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
          {leftIcon&&(<SvgXml
              xml={leftIcon}
              width={15}
              height={15}
              style={{marginLeft:6}}
          />)}
          <View style={{marginHorizontal:6}}>
            <Text style={[styles.font, {color: '#ffffff', fontSize: 20}]}>{name}</Text>
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
