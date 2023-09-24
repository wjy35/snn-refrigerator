import React from "react";
import {Button, Text, TouchableWithoutFeedback, View} from "react-native";

interface props {
  item: any;
  name: string;
}
const AutoCompleteItem = ({item, name}: props) => {
  return (
    <View style={{width: '100%', height: 40, borderWidth: 1, padding: 10, backgroundColor: 'rgba(255, 255, 255, 1)'}}>
      <TouchableWithoutFeedback onPress={()=>console.log(item.item[name])}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View>
            <Text>{item.item[name]}</Text>
          </View>
          <View>
            <Button title='추가하기'/>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

export default React.memo(AutoCompleteItem)
