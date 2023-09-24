import React, {useState} from 'react';
import {ScrollView, Text, TextInput, View} from 'react-native';
import Progressbar from "@/components/Progressbar";
import {styles} from "@/styles/styles";
import GetImageFrom from "@/components/GetImageFrom";
import ShowYoutube from "@/components/ShowYoutube";
import CalendarComponent from "@/components/CalendarComponent";
import {useFocusEffect} from "@react-navigation/native";

interface props {
  textList: string[];
  ingredients: any[];
  setNow: Function;
  now: number;
}

const HouseAddDate = ({textList, ingredients, setNow, now}: props) => {
  const cold = {color: 'blue'};
  const cool = {color: 'skyblue'};
  const warm = {color: 'yellow'};
  const [selected, setSelected] = useState<any>({
    '2023-09-24': {},
    '2023-09-26': {dots: [cold, cool, warm]},
    '2023-09-27': {dots: [cold, warm]},
    '2023-09-28': {dots: [cool, warm]},
    '2023-09-29': {dots: [warm]},
  })

  useFocusEffect(()=>{

  })

  return (
    <View style={{flex: 1, width: '100%'}}>
      <View>
      {/*<ScrollView overScrollMode="never" style={{flex: 1}}>*/}
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-start', marginHorizontal: 20}}>
          <View>
            <Progressbar progress={3} total={3} textList={textList}/>
          </View>
        </View>
        <View style={[{borderWidth: 1, paddingTop: 0}]}>
          <CalendarComponent selectedList={selected}/>
        </View>
        <View style={{borderWidth: 1, marginTop: 20}}>
          <View style={{flexDirection: 'row'}}>
            <View>
              <Text>전체 / </Text>
            </View>
            <View>
              <Text>선택한 날짜</Text>
            </View>
          </View>
          <View>
            <View style={{borderWidth: 1, width: '100%', height: 30}}>
              <Text>
                <Text>강낭콩</Text>
                <Text>냉장</Text>
                <Text>2023-09-27</Text>
              </Text>
            </View>
          </View>
        </View>
      {/*</ScrollView>*/}
      </View>
    </View>
  )
}

export default HouseAddDate;
