import React, {useState} from 'react';
import {ScrollView, Text, TextInput, TouchableWithoutFeedback, View} from 'react-native';
import Progressbar from "@/components/Progressbar";
import {styles} from "@/styles/styles";
import BasicBadge from "@/components/BasicBadge";
import {useFocusEffect} from "@react-navigation/native";

interface props {
  textList: string[];
  ingredients: any[];
  setNow: Function;
  now: number;
  onChange: Function;
}

const HouseAddStorage = ({textList, ingredients, setNow, now, onChange}: props) => {
  const [isWarm, setIsWarm] = useState<boolean>(true);

  function onPress(item: any, storageType: number){
    item.storageType = storageType;
    onChange();
  }

  return (
    <View style={styles.marginContainer}>
      <View>
        <Progressbar progress={2} total={3} textList={textList}/>
      </View>
      <View style={styles.container}>
        <View style={{width: '100%'}}>
          <View style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
            <View style={[styles.marginRowContainer, {width: '80%', marginBottom: 0, justifyContent: 'flex-start'}]}>
              <View>
                <TouchableWithoutFeedback onPress={()=>setIsWarm(true)}>
                  <Text>상온</Text>
                </TouchableWithoutFeedback>
              </View>
              <View>
                <TouchableWithoutFeedback onPress={()=>setIsWarm(false)}>
                  <Text>냉동</Text>
                </TouchableWithoutFeedback>
              </View>
            </View>
            {
              isWarm ? (
                <View style={{borderWidth: 1, width: '80%', height: 150}}>
                  <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
                    {
                      ingredients.map((i, idx) => {
                        if (i.storageType === 2) {
                          return (
                            <React.Fragment key={`${i.ingredientName}${idx}`}>
                              <BasicBadge backgroundColor='#3093EF' name={i.ingredientName} onPress={()=>onPress(i, 0)}/>
                            </React.Fragment>
                          )
                        }
                      })
                    }
                  </View>

                </View>
              ):(
                <View style={{borderWidth: 1, width: '80%', height: 150}}>
                  <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
                    {
                      ingredients.map((i, idx) => {
                        if (i.storageType === 1) {
                          return (
                            <React.Fragment key={`${i.ingredientName}${idx}`}>
                              <BasicBadge backgroundColor='#3093EF' name={i.ingredientName} onPress={()=>onPress(i, 0)}/>
                            </React.Fragment>
                          )
                        }
                      })
                    }
                  </View>
                </View>
              )
            }
          </View>
          <View style={{borderWidth: 1, height: 80}}>

          </View>
          <View style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
            <View style={[styles.marginRowContainer, {width: '80%', marginBottom: 0, justifyContent: 'flex-start'}]}>
              <View>
                <Text>냉장</Text>
              </View>
            </View>
            <View style={{borderWidth: 1, width: '80%', height: 150}}>
              <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
                {
                  ingredients.map((i, idx) => {
                    if (i.storageType === 0) {
                      return (
                        <React.Fragment key={`${i.ingredientName}${idx}`}>
                          <BasicBadge backgroundColor='#3093EF' name={i.ingredientName} onPress={()=>onPress(i, isWarm ? 2 : 1)}/>
                        </React.Fragment>
                      )
                    }
                  })
                }
              </View>
            </View>
          </View>
        </View>

      </View>
    </View>
  )
}

export default HouseAddStorage;
