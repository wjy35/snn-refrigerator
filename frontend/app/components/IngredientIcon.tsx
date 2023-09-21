import React from 'react';
import Swiper from 'react-native-swiper';
import {View} from "react-native";
import {warm, cool, cold, custom} from "@/assets/icons/icons";
import {SvgXml} from "react-native-svg";
import tw from "twrnc";


interface props {
  storageType: number;
  ingredientInfoId: number;
}
const IngredientIcon = ({storageType, ingredientInfoId}: props) => {
  return (
    <>
      {ingredientInfoId === 0 && (
        <SvgXml
          xml={custom}
          width={15}
          height={15}
        />
      )}
      <SvgXml
          xml={storageType === 0?cool:(storageType === 1?cold:warm)}
          width={15}
          height={15}
          style={[tw`ml-1`]}
      />
    </>
  );
};

export default IngredientIcon;
