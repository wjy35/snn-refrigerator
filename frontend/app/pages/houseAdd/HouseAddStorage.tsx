import React, {useState} from 'react';
import {ScrollView, Text, TextInput, TouchableWithoutFeedback, View} from 'react-native';
import Progressbar from "@/components/Progressbar";
import {styles} from "@/styles/styles";
import BasicBadge from "@/components/BasicBadge";
import {useFocusEffect} from "@react-navigation/native";
import {COOL_COLOR, COLD_COLOR, WARM_COLOR} from "@/assets/colors/colors";
import {cold, cool, warm} from "@/assets/icons/icons";
import {SvgXml} from "react-native-svg";

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
        <View style={{width: '100%', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View style={{width: '90%', justifyContent: 'center', alignItems: 'center', flex: 1}}>
            <View style={[styles.marginRowContainer, {width: '100%', marginBottom: 0, justifyContent: 'flex-start'}]}>
              <View style={{borderWidth: 2, borderTopRightRadius: 8, borderTopLeftRadius: 8, borderColor: isWarm ? WARM_COLOR : '#ABABAB', borderBottomWidth: 0, padding: 5}}>
                <TouchableWithoutFeedback onPress={()=>setIsWarm(true)}>
                  <View style={[{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}]}>
                    <SvgXml
                      xml={warm}
                      width={20}
                      height={20}
                      style={{marginHorizontal: 5}}/>
                    <Text style={[styles.font, {fontSize: 20, color: isWarm?WARM_COLOR:'#ABABAB'}]}>실온</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
              <View style={{borderWidth: 2, borderTopRightRadius: 8, borderTopLeftRadius: 8, borderColor: isWarm ? '#ABABAB' : COLD_COLOR, borderBottomWidth: 0, padding: 5}}>
                <TouchableWithoutFeedback onPress={()=>setIsWarm(false)}>
                  <View style={[{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}]}>
                    <SvgXml
                      xml={cold}
                      width={20}
                      height={20}
                      style={{marginHorizontal: 5}}/>
                    <Text style={[styles.font, {fontSize: 20, color: isWarm?'#ABABAB':COLD_COLOR}]}>냉동</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
            {
              isWarm ? (
                <View style={{borderWidth: 2, width: '100%', flex: 1, borderBottomRightRadius: 16, borderBottomLeftRadius: 16, borderTopRightRadius: 16, borderColor: WARM_COLOR}}>
                  <ScrollView>
                    <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
                      {
                        ingredients.map((i, idx) => {
                          if (i.storageType === 2) {
                            return (
                              <React.Fragment key={`${i.ingredientName}${idx}`}>
                                <BasicBadge color={WARM_COLOR} name={i.ingredientName} onPress={()=>onPress(i, 0)}/>
                              </React.Fragment>
                            )
                          }
                        })
                      }
                    </View>
                  </ScrollView>

                </View>
              ):(
                <View style={{borderWidth: 2, width: '100%', flex: 1, borderBottomRightRadius: 16, borderBottomLeftRadius: 16, borderTopRightRadius: 16, borderColor: COLD_COLOR}}>
                  <ScrollView>
                    <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
                      {
                        ingredients.map((i, idx) => {
                          if (i.storageType === 1) {
                            return (
                              <React.Fragment key={`${i.ingredientName}${idx}`}>
                                <BasicBadge color={COLD_COLOR} name={i.ingredientName} onPress={()=>onPress(i, 0)}/>
                              </React.Fragment>
                            )
                          }
                        })
                      }
                    </View>
                  </ScrollView>
                </View>
              )
            }
          </View>
          <View style={{width: '90%', justifyContent: 'center', alignItems: 'center', flex: 1}}>
            <View style={[styles.marginRowContainer, {width: '100%', marginBottom: 0, justifyContent: 'flex-start'}]}>
              <View style={{borderWidth: 2, borderTopRightRadius: 8, borderTopLeftRadius: 8, borderColor: COOL_COLOR, borderBottomWidth: 0, padding: 5}}>
                <View style={[{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}]}>
                  <SvgXml
                    xml={cool}
                    width={20}
                    height={20}
                    style={{marginHorizontal: 5}}/>
                  <Text style={[styles.font, {fontSize: 20, color: COOL_COLOR}]}>냉장</Text>
                </View>
              </View>
            </View>
            <View style={{borderWidth: 2, width: '100%', flex: 1, borderBottomRightRadius: 16, borderBottomLeftRadius: 16, borderTopRightRadius: 16,borderColor: COOL_COLOR}}>
              <ScrollView>
                <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
                  {
                    ingredients.map((i, idx) => {
                      if (i.storageType === 0) {
                        return (
                          <React.Fragment key={`${i.ingredientName}${idx}`}>
                            <BasicBadge color={COOL_COLOR} name={i.ingredientName} onPress={()=>onPress(i, isWarm ? 2 : 1)}/>
                          </React.Fragment>
                        )
                      }
                    })
                  }
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

export default HouseAddStorage;
