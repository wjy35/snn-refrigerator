import React, {useState} from 'react';
import {ScrollView, Text, TextInput, View} from 'react-native';
import Progressbar from "@/components/Progressbar";
import {styles} from "@/styles/styles";
import EditableIngredients from "@/components/EditableIngredients";
import AutoCompleteInput from "@/components/AutoCompleteInput";
import ingredientAutocompleteApi from "@/apis/ingredientAutocompleteApi";
import useInput from "@/hooks/useInput";

interface props {
  textList: string[];
  ingredients: any[];
  addIngredient: Function;
  deleteIngredient: Function;
  foodName?: string;
  serving?: string
}

const RecipeCreateIngredientInfo = ({textList, ingredients, deleteIngredient, addIngredient, foodName, serving}: props) => {
  const [text, setText] = useState('')
  const [autoCompleteIngredientList, setAutoCompleteIngredientList] = useState<any[]>();
  const [now, setNow] = useState(0)

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

  function onBlur(){
    setNow(0)
    setAutoCompleteIngredientList([])
  }

  function onPressIn(newNum: number) {
    setNow(newNum)
  }


  const ingredientText = useInput({
    placeholder: '재료 추가',
    title: '',
    nowNum: 1,
    onChange: checkIngredient,
  });

  function onSelect(item: any){
    if(checkDuplicate(item)){
      addIngredient({...item, amount: ''})
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
            <Progressbar progress={2} total={3} textList={textList}/>
          </View>
        )
      }
      <ScrollView style={{width: '100%'}}>
        { now === 0 &&
          (
            <View style={styles.marginContainer}>
              <Text style={[styles.font, styles.mainColor, {fontSize: 22}]}>
                <Text>{foodName&&foodName} </Text>
                <Text>{serving&&serving} </Text>
                <Text>레시피</Text>
              </Text>
            </View>
          )
        }
        <View style={{}}>
          <View style={[{width: '100%'}]}>
            <AutoCompleteInput {...ingredientText} textList={autoCompleteIngredientList} keyValue='ingredientInfoId' name='ingredientName' onPressIn={onPressIn} onSelect={onSelect}/>
          </View>
        </View>
        <View style={styles.marginContainer}>
          {
            ingredients.map((i: any, idx)=>{
              return (
                <React.Fragment key={`ingredient${idx}`}>
                  <EditableIngredients deleteIngredient={deleteIngredient} ingredientName={i.ingredientName} ingredientServing={i.ingredientServing}/>
                </React.Fragment>
              )
            })
          }
        </View>
      </ScrollView>
    </View>
  )
}

export default RecipeCreateIngredientInfo;
