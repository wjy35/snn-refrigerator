import React, {useState} from 'react';
import {ScrollView, Text, TextInput, View} from 'react-native';
import Progressbar from "@/components/Progressbar";
import {styles} from "@/styles/styles";
import GetImageFrom from "@/components/GetImageFrom";
import ShowYoutube from "@/components/ShowYoutube";
import BasicBadge from "@/components/BasicBadge";

interface props {
  textList: string[];
  ingredients: any[];
  setNow: Function;
  now: number;
}

const HouseAddStorage = ({textList, ingredients, setNow, now}: props) => {
  const isWarm = useState<boolean>(true)
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
                <Text>상온</Text>
              </View>
              <View>
                <Text>냉동</Text>
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
                              <BasicBadge backgroundColor='#3093EF' name={i.ingredientName} onPress={()=>{}}/>
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
                              <BasicBadge backgroundColor='#3093EF' name={i.ingredientName} onPress={()=>{}}/>
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
                          <BasicBadge backgroundColor='#3093EF' name={i.ingredientName} onPress={()=>{}}/>
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
