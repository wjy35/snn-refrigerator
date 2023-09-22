import React, {useRef} from 'react';
import {Text, TextInput, View} from "react-native";
import {styles} from "@/styles/styles";


interface props {
  title?: string;
  placeholder: string;
  onChangeText: Function;
  onPressIn?: Function;
  text: string;
  now?: number;
}

const PlainInput = ({title, placeholder, onChangeText, onPressIn, text, now}: props) => {

  function onPressInFunction(){
    onPressIn(now);
  }

  return (
    <View>
      <View style={[{width: '100%'}]}>
        <Text style={[styles.font, {fontSize: 20}]}>{title}</Text>
      </View>
      <View style={[{width: '100%'}]}>
        <TextInput
          style={[styles.input, styles.font]}
          placeholder={placeholder}
          onChangeText={(newText) => onChangeText(newText)}
          onPressIn={onPressIn&&onPressInFunction}
          value={text}
        />
      </View>
    </View>
  );
};

export default PlainInput;
