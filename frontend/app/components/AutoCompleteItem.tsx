import React from "react";
import {Text, TouchableWithoutFeedback, View} from "react-native";

interface props {
  item: any;
  name: string;
}
const AutoCompleteItem = ({item, name}: props) => {
  return (
    <View style={{width: '100%', height: 40, borderWidth: 1, padding: 10, backgroundColor: 'rgba(255, 255, 255, 1)'}}>
      <TouchableWithoutFeedback onPress={()=>console.log(item.item[name])}>
        <Text>{item.item[name]}</Text>
      </TouchableWithoutFeedback>
    </View>
  )
}

export default React.memo(AutoCompleteItem)
