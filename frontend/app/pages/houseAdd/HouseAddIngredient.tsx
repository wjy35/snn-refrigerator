import React from 'react';
import {ScrollView, Text, TextInput, View} from 'react-native';
import Progressbar from "@/components/Progressbar";
import {styles} from "@/styles/styles";
import GetImageFrom from "@/components/GetImageFrom";
import ShowYoutube from "@/components/ShowYoutube";
import BasicBadge from "@/components/BasicBadge";

interface props {
  textList: string[];
  ingredients: string[];
}

const HouseAddIngredient = ({textList, ingredients}: props) => {
  return (
    <View style={styles.marginContainer}>
      <View>
        <Progressbar progress={1} total={3} textList={textList}/>
      </View>
      <ScrollView overScrollMode="never" style={{width: '100%'}}>
        <View style={[{width: '100%'}]}>
          <TextInput
            style={styles.input}
            placeholder='검색'
          />
          <View style={{justifyContent: 'center', width: '100%', alignItems: 'center'}}>
            <Text>직접 입력한 식재료는 레시피 추천에서 제외됩니다.</Text>
          </View>
        </View>
        <View style={styles.marginContainer}>
          <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
            {
              ingredients.map((i, idx) => {
                return (
                  <React.Fragment key={`${i}${idx}`}>
                    <BasicBadge backgroundColor='#3093EF' name={i}/>
                  </React.Fragment>
                )
              })
            }
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default HouseAddIngredient;
