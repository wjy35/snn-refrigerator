import React from 'react';
import {ScrollView, Text, TextInput, View} from 'react-native';
import Progressbar from "@/components/Progressbar";
import {styles} from "@/styles/styles";
import EditableIngredients from "@/components/EditableIngredients";

interface props {
  textList: string[];
  foodName?: string;
  serving?: string;
  ingredients: any[];
  addIngredient: Function;
  deleteIngredient: Function;
}

const RecipeCreateIngredientInfo = ({textList, foodName, serving, ingredients, deleteIngredient, addIngredient}: props) => {
  return (
    <View style={styles.marginContainer}>
      <View>
        <Progressbar progress={2} total={3} textList={textList}/>
      </View>
      <ScrollView overScrollMode="never" style={{width: '100%'}}>
        <View style={styles.marginContainer}>
          <Text style={[styles.font, styles.mainColor, {fontSize: 22}]}>
            <Text>{foodName} </Text>
            <Text>{serving} </Text>
            <Text>레시피</Text>
          </Text>
        </View>
        <View style={styles.smallContainer}>
          <View style={[{width: '100%'}]}>
            <TextInput
              style={styles.input}
              placeholder='재료추가'
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
