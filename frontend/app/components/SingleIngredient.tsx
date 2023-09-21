import React, {useEffect, useState} from 'react';
import {Text, TouchableWithoutFeedback, View} from "react-native";
import {ingredientStyles} from "@/styles/ingredientStyles";
import {styles} from "@/styles/styles";
import IngredientIcon from "@/components/IngredientIcon";
import tw from 'twrnc';

interface props {
  ingredientName: string;
  storageType: number;
  lastDate: string;
  storageDate: string;
  houseIngredientId: number;
  ingredientInfoId: number;
}

const SingleIngredient = ({ingredientName, storageType, storageDate, lastDate, ingredientInfoId, houseIngredientId}: props) => {
  const [result, setResult] = useState<number>(0)
  const [container, setContainer] = useState<any>()
  const [text, setText] = useState<any>()

  useEffect(() => {
    const date: Date = new Date;
    const last: Date = new Date(lastDate);
    // @ts-ignore date 계산 관련 ts 에러 무시
    const gap: number = 1+ Math.floor((last.getTime() - date) / (1000 * 60 * 60 * 24));
    setResult(gap)
    if (storageType === 1){
      setContainer(ingredientStyles.coldContainer)
      setText(ingredientStyles.coldText)
    } else if (gap < 0){
      setContainer(ingredientStyles.overContainer)
      setText(ingredientStyles.overText)
    } else if (gap < 3){
      setContainer(ingredientStyles.alertContainer)
      setText(ingredientStyles.alertText)
    } else if (gap < 7){
      setContainer(ingredientStyles.warnContainer)
      setText(ingredientStyles.warnText)
    } else {
      setContainer(ingredientStyles.safeContainer)
      setText(ingredientStyles.safeText)
    }
  })

  function toDetail(){
    console.log(result)
  }

  function getDDay(){
    if(storageType===1) return '냉동';
    return `D${(result<0?'+':'-')+Math.abs(result)}`;
  }

  return (
    <View style={[ingredientStyles.singleContainer, container, tw``]}>
      <TouchableWithoutFeedback onPress={toDetail}>
        <View style={ingredientStyles.singleColumnContainer}>
          <View style={ingredientStyles.singleTop}>
            <View style={ingredientStyles.dateContainer}>
              <Text style={[styles.font]}>6일 전 등록</Text>
            </View>
            <View style={[ingredientStyles.iconContainer, tw`flex-wrap`]}>
              <IngredientIcon storageType={storageType} ingredientInfoId={ingredientInfoId}/>
            </View>
          </View>
          <View style={[ingredientStyles.singleBottom]}>
            <View style={[ingredientStyles.nameContainer,tw`self-end`]}>
              <Text style={[styles.font, text, tw`${ingredientName.length>4?'text-3xl':'text-3xl'} `]} numberOfLines={1} ellipsizeMode={"tail"} >{ingredientName}</Text>
            </View>
            <View style={[ingredientStyles.dDayContainer,tw`self-end`]}>
              <Text style={[styles.font, text, tw`text-right text-base`]}>{getDDay()}</Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default SingleIngredient;
