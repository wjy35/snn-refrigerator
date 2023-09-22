import React, { useRef, useState} from 'react';
import {View, Text, TextInput, FlatList, Dimensions, TouchableWithoutFeedback, ScrollView} from 'react-native';
import AutoCompleteItem from "@/components/AutoCompleteItem";
import {useFocusEffect} from "@react-navigation/native";


interface props {
  placeholder: string;
  onChangeText: Function;
  onPressIn: Function;
  now: number;
  text: string;
  textList?: any[];
  onBlur?: Function;
  title?: string;
  reset?: Function;
  name: string;
  keyValue: string;
}


const AutoCompleteInput = ({placeholder, onChangeText, onPressIn, now, text, textList, onBlur, title, keyValue, name}: props) => {
  const inputRef = useRef();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const dimensionWidth = Dimensions.get('screen').width;

  const screen = Dimensions.get('screen');
  function onPressInFunction(){
    onPressIn(now);
    setIsVisible(true);
  }

  function onBlurFunction() {
    onBlur&&onBlur();
    setIsVisible(false);
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{borderWidth: 1}}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
        width: '100%',
      }}>
      <View style={{marginTop: 30, marginHorizontal: 12, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
        { title && (
            <View style={[{width: '100%'}]}>
              <Text>{title}</Text>
            </View>
          )
        }
        <View style={[{width: '100%'}]}>
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
                  windowSize={2}
                  nestedScrollEnabled
                  data={textList}
                  renderItem={(item) => <AutoCompleteItem item={item} name={name}/>}
                  keyExtractor={(item) => {
                    return String(item[keyValue])
                  }}
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
