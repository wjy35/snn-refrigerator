import React, {Component, useRef, useState} from 'react';
import {View, Text, TextInput, FlatList, Dimensions, TouchableWithoutFeedback} from 'react-native';
import {styles} from "@/styles/styles";

interface props {
  placeholder: string;
  onChangeText: Function;
  onPressIn: Function;
  now: number;
  text: string;
  textList?: any[];
  onBlur?: Function;
}


const AutoCompleteInput = ({placeholder, onChangeText, onPressIn, now, text, textList, onBlur}: props) => {
  const inputRef = useRef();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const screen = Dimensions.get('screen');
  function onPressInFunction(){
    onPressIn(now);
    setIsVisible(true);
  }

  function onBlurFunction() {
    onBlur();
    setIsVisible(false);
  }

  return (
    <View style={{marginTop: 30, marginHorizontal: 12}}>
      <TextInput
        ref={inputRef}
        placeholder={placeholder}
        style={[{height: 40, borderWidth: 1, padding: 10}]}
        onChangeText={(newText)=>onChangeText(newText)}
        onPressIn={onPressInFunction}
        value={text}
        onBlur={onBlurFunction}
      >
      </TextInput>
      {
        isVisible && (
          <View style={{height: 200}}>
            <FlatList
              data={textList}
              renderItem={(item) => {
                return (
                  <View style={{width: '100%', height: 40, borderWidth: 1, padding: 10}}>
                    <TouchableWithoutFeedback onPress={()=>console.log(item.item.ingredientName)}>
                      <Text>{item.item.ingredientName}</Text>
                    </TouchableWithoutFeedback>
                  </View>
                )
              }}
              keyExtractor={(item) => String(item.ingredientInfoId)}
              disableScrollViewPanResponder={true}
            />
          </View>
        )
      }
    </View>
  );
}

export default AutoCompleteInput;
