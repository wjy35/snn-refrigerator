import React, {useRef} from 'react';
import {Text, TouchableWithoutFeedback, View} from "react-native";
import {backButton} from "@/assets/icons/icons";
import {SvgXml} from "react-native-svg";
import {styles} from "@/styles/styles";
import {useNavigation} from "@react-navigation/native";


interface props {
  name: string;
  goto: string;
  optionFunc: Function;
}
const SettingContainer = ({name, goto, optionFunc}: props) => {
  const navigation = useNavigation();

  return (
    <View style={{margin: 5, backgroundColor:"#FFFFFF"}}>
      <TouchableWithoutFeedback onPress={(e)=> optionFunc(goto)}>
        <View style={{paddingHorizontal: 25, height: 60, borderWidth: 1, borderRadius: 16, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'}}>
          <View style={{marginRight: 10}}>
            <Text style={[styles.font, {fontSize: 20}]}>{name}</Text>
          </View>
          <View style={{transform: [{ rotate: '180deg'}]}} >
            <SvgXml
              xml={backButton}
              width={15}
              height={15}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default SettingContainer;
