import React, { useRef, useState} from 'react';
import {View, Text, TextInput, FlatList, Dimensions, TouchableWithoutFeedback, ScrollView} from 'react-native';
import AutoCompleteItem from "@/components/AutoCompleteItem";
import {useFocusEffect} from "@react-navigation/native";
import {styles} from "@/styles/styles";


interface props {
  placeholder: string;
  onChangeText: Function;
  onPressIn?: Function;
  now: number;
  text: string;
  textList?: any[];
  onBlur?: Function;
  title?: string;
  reset?: Function;
  name: string;
  keyValue: string;
  onSelect: Function;
}


const AutoCompleteInput = ({placeholder, onChangeText, onPressIn, now, text, textList, onBlur, title, keyValue, name, onSelect}: props) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const dimensionWidth = Dimensions.get('screen').width;

  const screen = Dimensions.get('screen');
  function onPressInFunction(){
    onPressIn&&onPressIn(now);
    setIsVisible(true);
  }

  function onBlurFunction() {
    onBlur&&onBlur();
    // setIsVisible(false);
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
        width: '100%',
      }}>
      <View style={{marginTop: 30, marginHorizontal: 12, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
        { title && (
          <View style={[{width: '100%'}]}>
            <Text style={[styles.font, {fontSize: 20}]}>{title}</Text>
          </View>
          )
        }
        <View style={[{width: '100%'}]}>
          <TextInput
            placeholder={placeholder}
            style={[styles.input]}
            onChangeText={(newText)=>onChangeText(newText)}
            onPressIn={onPressInFunction}
            value={text}
            onBlur={onBlurFunction}
          >
          </TextInput>
          {
            isVisible && (
              <View style={{maxHeight: 200}}>
                <FlatList
                  windowSize={2}
                  initialNumToRender={5}
                  nestedScrollEnabled
                  data={textList}
                  // ListHeaderComponent={<Text>헤더</Text>}
                  renderItem={(item) => <AutoCompleteItem item={item} name={name} onSelect={onSelect}/>}
                  keyExtractor={(item) => {
                    return String(item[keyValue])
                  }}
                  // disableScrollViewPanResponder={true}
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
