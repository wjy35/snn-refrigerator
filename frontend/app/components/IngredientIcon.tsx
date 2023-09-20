import React from 'react';
import Swiper from 'react-native-swiper';
import {View} from "react-native";
import {warm, cool, cold, custom} from "@/assets/icons/icons";
import {SvgXml} from "react-native-svg";


interface props {
  storageType: number;
  ingredientInfoId: number;
}
const IngredientIcon = ({storageType, ingredientInfoId}: props) => {
  const storageIcon = () => {
    if (storageType === 0){
      return (
        <SvgXml
          xml={cool}
          width={15}
          height={15}
        />
      )
    } else if (storageType === 1){
      return (
        <SvgXml
          xml={cold}
          width={15}
          height={15}
        />
      )
    } else {
      return (
        <SvgXml
          xml={warm}
          width={15}
          height={15}
        />
      )
    }
  }

  return (
    <>
      {ingredientInfoId === -1 && (
        <SvgXml
          xml={custom}
          width={15}
          height={15}
          style={{marginRight: 3}}
        />
      )}
      {storageIcon()}
    </>
  );
};

export default IngredientIcon;
