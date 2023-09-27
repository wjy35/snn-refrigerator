import React from "react";
import {Button, Text, TouchableWithoutFeedback, View} from "react-native";

interface props {
  item: any;
  name: string;
  onSelect: Function;
}
const AutoCompleteItem = ({item, name, onSelect}: props) => {
  return (
    <View style={{width: '100%', height: 40, borderWidth: 1, padding: 10, backgroundColor: 'rgba(255, 255, 255, 1)'}}>
      <TouchableWithoutFeedback onPress={()=>console.log(item.item)}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View>
            <Text>{item.item[name]}</Text>
          </View>
          <View>
            <Button title='추가하기' onPress={()=>onSelect(item.item)}/>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

export default React.memo(AutoCompleteItem)
