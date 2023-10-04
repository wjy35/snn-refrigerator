import React, {useRef} from 'react';
import {Text, TouchableWithoutFeedback, View} from "react-native";
import {styles} from "@/styles/styles";
import {SvgXml} from "react-native-svg";
import {backButton} from "@/assets/icons/icons";
import PrintHouseCode from "@/components/PrintHouseCode";
import HateIngredient from "@/components/HateIngredient";
import PlaceManage from "@/components/PlaceManage";


interface props {
  name: string;
  goto: string;
  houseCode: string;
  memberId: number;
  closeFunc: Function;
}
const SettingDetail = ({name, goto, houseCode, memberId, closeFunc}: props) => {

  function content (){
    if (goto === '3') {
      return (
        <View>
          <PrintHouseCode houseCode={houseCode} />
        </View>
      );
    }
    else if (goto === '2'){
      return (
        <View style={{height: 400}}>
          <HateIngredient memberId={memberId} />
        </View>
      );
    }
    else if (goto === '1'){
      return (
        <View style={{height: 400}}>
          <PlaceManage memberId={memberId} />
        </View>
      )
    }
  }

  function test(){
    closeFunc();
  }

  return (
    <View style={{margin: 5, paddingHorizontal: 25, borderWidth: 1, borderRadius: 16, flex: 1}}>
      <TouchableWithoutFeedback onPress={test}>
        <View>
          <View style={{justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', height: 60}}>
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
      </TouchableWithoutFeedback>
      <View>
        {content()}
      </View>
    </View>
  );
};

export default SettingDetail;
