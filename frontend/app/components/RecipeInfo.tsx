import React from 'react';
import {Text, View} from "react-native";
import {user, dish, time} from "@/assets/icons/icons";
import {SvgXml} from "react-native-svg";
import {recipeStyles} from "@/styles/recipeStyles";
import {styles} from "@/styles/styles";

interface props {
  foodName?: string;
  cookingTime?: string;
  serving?: string;
  size?: number;
}

const RecipeInfo = ({foodName, cookingTime, serving, size=12}: props) => {
  return (
    <>
      <View style={recipeStyles.singleRecipeInfoContainer}>
        <SvgXml
          xml={dish}
          width={size}
          height={size}
        />
        <Text style={[styles.font, recipeStyles.recipeInfoText, {fontSize: size}]}>{foodName}</Text>
      </View>
      <View style={recipeStyles.singleRecipeInfoContainer}>
        <SvgXml
          xml={user}
          width={size}
          height={size}
        />
        <Text style={[styles.font, recipeStyles.recipeInfoText, {fontSize: size}]}>{serving}인분</Text>
      </View>
      <View style={recipeStyles.singleRecipeInfoContainer}>
        <SvgXml
          xml={time}
          width={size}
          height={size}
        />
        <Text style={[styles.font, recipeStyles.recipeInfoText, {fontSize: size}]}>{cookingTime}</Text>
      </View>
    </>
  );
};

export default RecipeInfo;
