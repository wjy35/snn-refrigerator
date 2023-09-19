import React from 'react';
import {Text, View} from "react-native";
import {user, dish, time} from "@/assets/icons/icons";
import {SvgXml} from "react-native-svg";
import {recipeStyles} from "@/styles/recipeStyles";
import {styles} from "@/styles/styles";

interface props {
  foodName: string;
  cookingTime: string;
  serving: string;
}

const RecipeInfo = ({foodName, cookingTime, serving}: props) => {
  return (
    <>
      <View style={recipeStyles.singleRecipeInfoContainer}>
        <SvgXml
          xml={dish}
          width={12}
          height={12}
        />
        <Text style={[styles.font, recipeStyles.recipeInfoText]}>{foodName}</Text>
      </View>
      <View style={recipeStyles.singleRecipeInfoContainer}>
        <SvgXml
          xml={user}
          width={12}
          height={12}
        />
        <Text style={[styles.font, recipeStyles.recipeInfoText]}>{serving}인분</Text>
      </View>
      <View style={recipeStyles.singleRecipeInfoContainer}>
        <SvgXml
          xml={time}
          width={12}
          height={12}
        />
        <Text style={[styles.font, recipeStyles.recipeInfoText]}>{cookingTime}</Text>
      </View>
    </>
  );
};

export default RecipeInfo;
