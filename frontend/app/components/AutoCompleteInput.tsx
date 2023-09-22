import React, {Component, useRef, useState} from 'react';
import {View, Text, TextInput, FlatList, Dimensions, TouchableWithoutFeedback, ScrollView} from 'react-native';
import {styles} from "@/styles/styles";

interface props {
  placeholder: string;
  onChangeText: Function;
  onPressIn: Function;
  now: number;
  text: string;
  textList?: any[];
  onBlur?: Function;
  title?: string;
}


const AutoCompleteInput = ({placeholder, onChangeText, onPressIn, now, text, textList, onBlur, title}: props) => {
  const inputRef = useRef();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const dimensionWidth = Dimensions.get('screen').width;

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
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      // style={{width: dimensionWidth}}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
        width: '100%',
      }}>
      <View style={{marginTop: 30, marginHorizontal: 12, width: dimensionWidth, justifyContent: 'center', alignItems: 'center'}}>
        { title && (
            <View style={[{width: '90%'}]}>
              <Text>{title}</Text>
            </View>
          )
        }
        <View style={[{width: '90%'}]}>
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
              <View style={{height: 120}}>
                <FlatList
                  nestedScrollEnabled
                  data={textList}
                  renderItem={(item) => {
                    return (
                      <View style={{width: '100%', height: 40, borderWidth: 1, padding: 10, backgroundColor: 'rgba(255, 255, 255, 1)'}}>
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
      </View>
    </ScrollView>
  );
}

export default AutoCompleteInput;
