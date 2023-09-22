import React, {useState} from 'react';
import {ScrollView, Text, TextInput, View} from 'react-native';
import Progressbar from "@/components/Progressbar";
import {styles} from "@/styles/styles";
import EditableIngredients from "@/components/EditableIngredients";
import AutoCompleteInput from "@/components/AutoCompleteInput";
import ingredientAutocompleteApi from "@/apis/ingredientAutocompleteApi";

interface props {
  textList: string[];
  foodName?: string;
  serving?: string;
  ingredients: any[];
  addIngredient: Function;
  deleteIngredient: Function;
}

const RecipeCreateIngredientInfo = ({textList, foodName, serving, ingredients, deleteIngredient, addIngredient}: props) => {
  const [text, setText] = useState('')
  const [autoCompleteList, setAutoCompleteList] = useState<any[]>()
  const [now, setNow] = useState(0)

  function onChangeText(newText: string){
    setText(newText)
    check(newText)
  }

  const check = async (keyword: string) => {
    try {
      const res = await ingredientAutocompleteApi.check({keyword: keyword})
      if (res.status === 200) {
        setAutoCompleteList(res.data.data.ingredients)
      }
    } catch (err) {
      console.log(err);
    }
  }

  function onPressIn(now: number){
    setNow(1);
  }

  function onBlur(){
    setNow(0);
    setText('');
    setAutoCompleteList([]);
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
                <Text>{foodName} </Text>
                <Text>{serving} </Text>
                <Text>레시피</Text>
              </Text>
            </View>
          )
        }
        <View style={{}}>
          <View style={[{width: '100%'}]}>
            <AutoCompleteInput
              placeholder='재료 추가'
              text={text}
              textList={autoCompleteList}
              onChangeText={onChangeText}
              onPressIn={onPressIn}
              now={now}
              onBlur={onBlur}
            />
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
