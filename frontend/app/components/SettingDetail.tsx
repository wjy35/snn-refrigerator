import React, {useRef} from 'react';
import {Text, TouchableWithoutFeedback, View} from "react-native";
import {styles} from "@/styles/styles";
import {SvgXml} from "react-native-svg";
import {backButton} from "@/assets/icons/icons";


interface props {
  name: string;
  goto: string;
}
const SettingDetail = ({name, goto}: props) => {
  return (
    <View style={{margin: 5}}>
      <View style={{paddingHorizontal: 25, height: 60, borderWidth: 1, borderRadius: 16, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'}}>
        <View style={{marginRight: 10}}>
          <Text style={[styles.font, {fontSize: 20}]}>{name}</Text>
        </View>
        <View style={{transform: [{ rotate: '180deg'}]}} >
          <SvgXml
            xml={backButton}
            width={15}
            height={15}
            rotation={90}
          />
        </View>
      </View>
    </View>
  );
};

export default SettingDetail;
