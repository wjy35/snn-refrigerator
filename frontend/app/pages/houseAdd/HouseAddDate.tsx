import React, {useEffect, useState} from 'react';
import {FlatList, ScrollView, Text, TextInput, TouchableWithoutFeedback, View} from 'react-native';
import Progressbar from "@/components/Progressbar";
import CalendarComponent from "@/components/CalendarComponent";


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
        <View>
          <CalendarComponent selectedList={selected} selectedDate={selectedDate} setSelectedDate={(newDate)=>setSelectedDate(newDate)}/>
        </View>
        <View style={{flex: 1, marginTop: 20}}>
          <View style={{flexDirection: 'row'}}>
            <View style={{width: '60%'}}>
              <Text>전체</Text>
            </View>
            <View style={{width: '40%'}}>
              <Text>{selectedDate}</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', flex: 1}}>
            <View style={{width: '60%'}}>
              <FlatList
                nestedScrollEnabled
                data={ingredients}
                renderItem={(item)=>(
                  <TouchableWithoutFeedback onPress={()=>{
                    if (selectedDate !== ''){
                      item.item.lastDate = selectedDate;
                    }
                    onChange();
                  }}>
                    <View style={[{borderWidth: 1, width: '100%', height: 30, flexDirection: 'row', justifyContent: 'space-between'}]}>
                      <View>
                        <Text>{item.item.ingredientName}</Text>
                      </View>
                      <View>
                        <Text>{item.item.lastDate}</Text>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                )}
                keyExtractor={(item)=>{
                  return String(item.ingredientName);
                }}
              />
            </View>
            {
              selectedDate&&(
                <View style={{width: '40%'}}>
                  <FlatList
                    nestedScrollEnabled
                    data={ingredients}
                    renderItem={(item)=>{
                      if (item.item.lastDate === selectedDate){
                        return (
                          <View style={{borderWidth: 1, width: '100%', height: 30}}>
                            <Text>
                              <Text>{item.item.ingredientName}</Text>
                            </Text>
                          </View>
                        );
                      }
                    }}
                    keyExtractor={(item)=>{
                      return String(item.ingredientName);
                    }}
                  />
                </View>
              )
            }
          </View>
        </View>
      {/*</ScrollView>*/}
      </View>
    </View>
  )
}

export default HouseAddDate;
