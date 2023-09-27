import React from 'react';
import {Button, Text, TextInput, View} from "react-native";
import {styles} from "@/styles/styles";


interface props{
  ingredientName: string;
  ingredientServing: string;
  deleteIngredient: Function;
  index: number;
  editIngredient: Function;
}

const EditableIngredients = ({ingredientName, ingredientServing, deleteIngredient, index, editIngredient}: props) => {
  return (
    <View style={[styles.marginRowContainer, {justifyContent: 'space-between', margin: 3}]}>
      <View>
        <Text style={[styles.font, {fontSize: 24}]}>{ingredientName}</Text>
      </View>
      <View>
        <TextInput
          placeholder='ex) 200g'
          value={ingredientServing}
          style={[styles.font]}
          onChangeText={(newText: string)=>{editIngredient(index,newText)}}/>
      </View>
      <View>
        <Button title='삭제' onPress={()=>{deleteIngredient(index)}}/>
      </View>
    </View>
  );
};

export default EditableIngredients;
