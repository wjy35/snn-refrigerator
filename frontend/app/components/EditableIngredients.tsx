import React from 'react';
import {Button, Text, View} from "react-native";
import {styles} from "@/styles/styles";


interface props{
  ingredientName: string;
  ingredientServing: string;
  deleteIngredient: Function;
}

const EditableIngredients = ({ingredientName, ingredientServing, deleteIngredient}: props) => {
  return (
    <View style={[styles.marginRowContainer, {justifyContent: 'space-between', margin: 3}]}>
      <View>
        <Text style={[styles.font, {fontSize: 24}]}>{ingredientName}</Text>
      </View>
      <View>
        <Text style={[styles.font, {fontSize: 24}]}>{ingredientServing}</Text>
      </View>
      <View>
        <Button title='삭제'/>
      </View>
    </View>
  );
};

export default EditableIngredients;
