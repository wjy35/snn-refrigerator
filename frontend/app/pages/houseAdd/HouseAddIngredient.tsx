import React, {useState} from 'react';
import {ScrollView, Text, TextInput, View} from 'react-native';
import Progressbar from "@/components/Progressbar";
import {styles} from "@/styles/styles";
import GetImageFrom from "@/components/GetImageFrom";
import ShowYoutube from "@/components/ShowYoutube";
import BasicBadge from "@/components/BasicBadge";
import AutoCompleteInput from "@/components/AutoCompleteInput";
import useInput from "@/hooks/useInput";
import ingredientAutocompleteApi from "@/apis/ingredientAutocompleteApi";
import {closeIcon} from "@/assets/icons/icons";

interface props {
  textList: string[];
  ingredients: any[];
  setNow: Function;
  now: number;
  addIngredient: Function;
  deleteIngredient: Function;
}

const HouseAddIngredient = ({textList, ingredients, setNow, now, addIngredient, deleteIngredient}: props) => {
  const [autoCompleteIngredientList, setAutoCompleteIngredientList] = useState<any[]>();
  const checkIngredient = async (keyword: string) => {
    try {
      const res = await ingredientAutocompleteApi.check({keyword: keyword})
      if (res.status === 200) {
        setAutoCompleteIngredientList(res.data.data.ingredients)
      }
    } catch (err) {
      console.log(err);
    }
  }

  const ingredientText = useInput({
    placeholder: '검색',
    title: '',
    nowNum: 1,
    onChange: checkIngredient,
  });

  function onBlur(){
    setNow(0);
    // setAutoCompleteIngredientList([]);
  }

  function onPressIn(newNum: number) {
    setNow(newNum);
  }

  function onSelect(item: any){
    if (checkDuplicate(item)){
      addIngredient({...item});
    }
  }

  function checkDuplicate(item: any){
    return (
      ingredients.every((ingredient: any) => {
        if (ingredient.ingredientName !== item.ingredientName){
          return true;
        }
      })
    );
  }

  return (
    <View style={styles.marginContainer}>
      {
        now === 0 && (
          <View>
            <Progressbar progress={1} total={3} textList={textList}/>
          </View>
        )
      }
      <ScrollView style={{width: '100%'}}>
        <View style={[{width: '100%'}]}>
          <AutoCompleteInput {...ingredientText} textList={autoCompleteIngredientList} keyValue='ingredientName' name='ingredientName' onPressIn={onPressIn} onSelect={onSelect} onBlur={onBlur}/>
          <View style={{justifyContent: 'center', width: '100%', alignItems: 'center'}}>
            <Text>직접 입력한 식재료는 레시피 추천에서 제외됩니다.</Text>
          </View>
        </View>
        <View style={styles.marginContainer}>
          <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
            {
              ingredients.map((i, idx) => {
                return (
                  <React.Fragment key={`${i.ingredientName}${idx}`}>
                    <BasicBadge backgroundColor='#3093EF' name={i.ingredientName} icon={closeIcon} onPress={()=>{deleteIngredient(idx)}}/>
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
