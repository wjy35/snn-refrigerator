import React from 'react';
import {View} from "react-native";
import SingleIngredient from "@/components/SingleIngredient";
import {ingredientStyles} from "@/styles/ingredientStyles";

const MyIngredientList = ({children}: any) => {
  const ingredients = [
    {
      houseIngredientId: "21",
      houseSeq: "1243",
      ingredientInfoId: 123, // -1이면 커스텀 재료
      ingredientName: "가자미",
      storageType: 0, // 0 냉장, 1 냉동, 2 상온
      lastDate: "2023-09-21",
      storageDate: "", // datetime
    },
    {
      houseIngredientId:"22",
      houseSeq:"1243",
      ingredientInfoId:324, // -1이면 커스텀 재료
      ingredientName:"감자",
      storageType: 2, // 0 냉장, 1 냉동, 2 상온
      lastDate:"2023-08-23",
      storageDate:"", // datetime
    },
    {
      houseIngredientId:"23",
      houseSeq:"1243",
      ingredientInfoId: -1, // -1이면 커스텀 재료
      ingredientName:"갈비만두",
      storageType: 1, // 0 냉장, 1 냉동, 2 상온
      lastDate:"2023-09-24",
      storageDate:"", // datetime
    },
    {
      houseIngredientId: "24",
      houseSeq: "1243",
      ingredientInfoId: 123, // -1이면 커스텀 재료
      ingredientName: "가자미",
      storageType: 0, // 0 냉장, 1 냉동, 2 상온
      lastDate: "2023-10-20",
      storageDate: "", // datetime
    },
    {
      houseIngredientId: "25",
      houseSeq: "1243",
      ingredientInfoId: 123, // -1이면 커스텀 재료
      ingredientName: "가자미",
      storageType: 0, // 0 냉장, 1 냉동, 2 상온
      lastDate: "2023-10-20",
      storageDate: "", // datetime
    },
  ]

  return (
    <View style={ingredientStyles.ingredientContainer}>
      {ingredients.map((i) => {
        return (
          <React.Fragment key={`ingredient ${i.houseIngredientId}`}>
            <SingleIngredient
              houseIngredientId={i.houseIngredientId}
              ingredientInfoId={i.ingredientInfoId}
              ingredientName={i.ingredientName}
              storageType={i.storageType}
              lastDate={i.lastDate}
              storageDate={i.storageDate}
            />
          </React.Fragment>
        )
      })}
    </View>
  );
};

export default MyIngredientList;
