import React, {useEffect, useState} from 'react';
import {Text, TouchableWithoutFeedback, View} from "react-native";
import {ingredientStyles} from "@/styles/ingredientStyles";
import {styles} from "@/styles/styles";
import IngredientIcon from "@/components/IngredientIcon";
import ingredientAutocompleteApi from "@/apis/ingredientAutocompleteApi";

interface props {
  ingredientName: string;
  storageType: number;
  lastDate: string;
  storageDate: string;
  houseIngredientId: string;
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
    const gap: number = Math.floor((last.getTime() - date) / (1000 * 60 * 60 * 24));
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
    check()
  }

  const check = async () => {
    try {
      const res = await ingredientAutocompleteApi.check({keyword: ingredientName})
      if (res.status === 200) {
        console.log(res.data)
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <View style={[ingredientStyles.singleContainer, container]}>
      <TouchableWithoutFeedback onPress={toDetail}>
        <View style={ingredientStyles.singleRowContainer}>
          <View style={ingredientStyles.singleLeft}>
            <View style={ingredientStyles.dateContainer}>
              <Text style={[styles.font]}>6일 전 등록</Text>
            </View>
            <View style={ingredientStyles.nameContainer}>
              <Text style={[styles.font, ingredientStyles.singleName, text]}>{ingredientName}</Text>
            </View>
          </View>
          <View style={ingredientStyles.singleRight}>
            <View style={ingredientStyles.iconContainer}>
              <IngredientIcon storageType={storageType} ingredientInfoId={ingredientInfoId}/>
            </View>
            <View style={ingredientStyles.dDayContainer}>
              {
                storageType === 1?(
                  <Text style={[styles.font, text]}>냉동</Text>
                ):(
                  <Text style={[styles.font, text]}>D{result>0?`-${result}`:`+${-result}`}</Text>
                )
              }
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default SingleIngredient;
