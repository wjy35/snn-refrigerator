import React from "react";
import {Button, Text, TouchableWithoutFeedback, View} from "react-native";
import {MAIN_COLOR} from "@/assets/colors/colors";
import {styles} from "@/styles/styles";

interface props {
  item: any;
  name: string;
  onSelect: Function;
}
const AutoCompleteItem = ({item, name, onSelect}: props) => {
  return (
    <View style={{marginVertical:0.2,width: '100%', height: 50, borderWidth: 1, borderTopWidth: 0, padding: 5, paddingHorizontal: 10, backgroundColor: '#FFFFFF'}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', height: '100%'}}>
        <View style={{justifyContent: 'center',  alignItems: 'center'}}>
          <Text style={[styles.font, {fontSize: 20}]}>{item.item[name]}</Text>
        </View>
        <View style={{height: '100%'}}>
          <View style={{backgroundColor: MAIN_COLOR, width: 80, height: '100%', borderRadius: 5, justifyContent: 'center', alignItems: 'center'}}>
            <TouchableWithoutFeedback onPress={()=>onSelect(item.item)}>
              <Text style={[styles.font, {color: '#ffffff', fontSize: 18}]}>추가하기</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    </View>
  )
}

export default React.memo(AutoCompleteItem)
