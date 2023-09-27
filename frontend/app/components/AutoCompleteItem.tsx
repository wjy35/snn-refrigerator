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
    <View style={{width: '100%', height: 40, borderWidth: 1, padding: 5, paddingHorizontal: 10, backgroundColor: 'rgba(255, 255, 255, 1)'}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', height: '100%'}}>
        <View>
          <Text>{item.item[name]}</Text>
        </View>
        <View style={{height: '100%'}}>
          <View style={{backgroundColor: MAIN_COLOR, width: 80, height: '100%', borderRadius: 5, justifyContent: 'center', alignItems: 'center'}}>
            <TouchableWithoutFeedback onPress={()=>onSelect(item.item)}>
              <Text style={[styles.font, {color: '#ffffff'}]}>추가하기</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    </View>
  )
}

export default React.memo(AutoCompleteItem)
