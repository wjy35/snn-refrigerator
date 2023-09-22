import React, {useRef} from 'react';
import Swiper from 'react-native-swiper';
import {Text, View} from "react-native";
import {closeIcon} from "@/assets/icons/icons";
import {SvgXml} from "react-native-svg";
import {styles} from "@/styles/styles";


interface props {
  backgroundColor: string;
  name: string;
}
const BasicBadge = ({backgroundColor, name}: props) => {

  return (
      <View style={{margin: 5}}>
        <View style={{padding: 10, height: 40, backgroundColor: backgroundColor, borderRadius: 100, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
          <View style={{marginRight: 10}}>
            <Text style={[styles.font, {color: '#ffffff', fontSize: 20}]}>{name}</Text>
          </View>
          <View>
            <SvgXml
              xml={closeIcon}
              width={15}
              height={15}
            />
          </View>
        </View>
      </View>

  );
};

export default BasicBadge;
