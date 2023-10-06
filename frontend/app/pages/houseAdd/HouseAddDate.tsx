import React, {useEffect, useState} from 'react';
import {FlatList, ScrollView, Text, TextInput, TouchableWithoutFeedback, View} from 'react-native';
import Progressbar from "@/components/Progressbar";
import CalendarComponent from "@/components/CalendarComponent";
import {styles} from "@/styles/styles";
import {TEXT_COLOR, TEXT_SUB_COLOR} from "@/assets/colors/colors";


interface props {
  textList: string[];
  ingredients: any[];
  setNow: Function;
  now: number;
  onChange: Function;
}

const HouseAddDate = ({textList, ingredients, setNow, now, onChange}: props) => {
  const cold = {color: 'blue'};
  const cool = {color: 'skyblue'};
  const warm = {color: 'yellow'};
  const date = new Date();
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selected, setSelected] = useState<any>({});

  useEffect(()=>{
    const _selected = {}
    ingredients.forEach((i)=>{
      _selected[i.lastDate] = {dots: [cool]};
    });
    setSelected(_selected);
    // console.log(ingredients);
  }, [ingredients])

  return (
    <View style={{flex: 1, width: '100%'}}>
      <View style={{flex: 1}}>
      {/*<ScrollView overScrollMode="never" style={{flex: 1}}>*/}
        <View style={{alignItems: 'center', justifyContent: 'flex-start', marginHorizontal: 20}}>
          <View>
            <Progressbar progress={3} total={3} textList={textList}/>
          </View>
        </View>
        <Text style={[styles.font, {color: TEXT_COLOR, fontSize:20, textAlign:'center', width:'100%', marginVertical:15}]}>날짜를 선택하세요</Text>
        <View>
          <CalendarComponent selectedList={selected} selectedDate={selectedDate} setSelectedDate={(newDate)=>setSelectedDate(newDate)}/>
        </View>
        <View style={{flex: 1}}>
          <View style={{flexDirection: 'row'}}>

            {
                selectedDate&&(
                    <Text style={[styles.font, {color: TEXT_COLOR, fontSize:20, textAlign:'center', width:'100%', marginVertical:10}]}>소비기한이 {selectedDate}인 재료를 선택하세요</Text>
                )
            }
          </View>
          <View style={{flexDirection: 'row', flex: 1}}>
            <View style={{width: '100%'}}>
              <View style={[{borderWidth:1,borderTopLeftRadius:20,borderTopRightRadius:20,width: 'auto', height: 35, alignItems:'center', marginHorizontal:10, flexDirection: 'row', justifyContent: 'space-between'}]}>

                <View style={{flex:3}}>
                  <Text style={[styles.font, {color: TEXT_COLOR, fontSize:25, textAlign:'center', width:'100%'}]}>재료명</Text>
                </View>
                <View style={{flex:1}}>
                </View>
                <View style={{flex:3}}>
                  <Text style={[styles.font, {color: TEXT_COLOR, fontSize:25, textAlign:'center', width:'100%'}]}>소비기한</Text>
                </View>
              </View>
              <FlatList
                nestedScrollEnabled
                data={ingredients.filter((item)=>item.storageType!==1)}
                renderItem={(item)=>(
                  <TouchableWithoutFeedback onPress={()=>{
                    if (selectedDate !== ''){
                      item.item.lastDate = selectedDate;
                    }
                    onChange();
                  }}>
                    <View style={[{borderWidth: 1, borderTopWidth: 0,borderBottomColor:TEXT_SUB_COLOR, width: 'auto', height: 35, alignItems:'center', marginHorizontal:10, flexDirection: 'row', justifyContent: 'space-between'}]}>
                      <View style={{flex:3}}>
                        <Text style={[styles.font, {color: TEXT_COLOR, fontSize:20, textAlign:'center', width:'100%'}]}>{item.item.ingredientName}</Text>
                      </View>
                      <View style={{flex:1}}>
                      </View>
                      <View style={{flex:3}}>
                        <Text style={[styles.font, {color: TEXT_COLOR, fontSize:20, textAlign:'center', width:'100%'}]}>{item.item.lastDate}</Text>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                )}
                keyExtractor={(item)=>{
                  return String(item.ingredientName);
                }}
                ListFooterComponent={
                  <View style={[{margin:0,borderWidth:1,borderBottomLeftRadius:20,borderBottomRightRadius:20,width: 'auto', height: 5, alignItems:'center', marginHorizontal:10, flexDirection: 'row', justifyContent: 'space-between'}]}>
                  </View>}
              />
            </View>

          </View>
        </View>
      {/*</ScrollView>*/}
      </View>
    </View>
  )
}

export default HouseAddDate;
