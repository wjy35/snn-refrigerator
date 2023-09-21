import React, {useEffect, useState} from 'react';
import {View} from "react-native";
import SingleIngredient from "@/components/SingleIngredient";
import {ingredientStyles} from "@/styles/ingredientStyles";
import tw from "twrnc";

const MyIngredientList = ({children}: any) => {
  const [ingredients, setIngredients] = useState<
      Array<{
        houseIngredientId : number,
        ingredientInfoId : number,
        ingredientName : string,
        storageType : number,
        lastDate : string,
        storageDate : string,
      }>
  >([]);

  useEffect(() => {
    setIngredients([
      {
        houseIngredientId: 212355,
        ingredientInfoId: 123, // 0이면 커스텀 재료
        ingredientName: "가자미자가자미자",
        storageType: 0, // 0 냉장, 1 냉동, 2 상온
        lastDate: "2023-8-20",
        storageDate: "", // datetime
      },
      {
        houseIngredientId: 21,
        ingredientInfoId: 123, // 0이면 커스텀 재료
        ingredientName: "가자미",
        storageType: 0, // 0 냉장, 1 냉동, 2 상온
        lastDate: "2023-09-21",
        storageDate: "", // datetime
      },
      {
        houseIngredientId: 221,
        ingredientInfoId: 123, // 0이면 커스텀 재료
        ingredientName: "가자미",
        storageType: 0, // 0 냉장, 1 냉동, 2 상온
        lastDate: "2023-09-22",
        storageDate: "", // datetime
      },
      {
        houseIngredientId: 211,
        ingredientInfoId: 123, // 0이면 커스텀 재료
        ingredientName: "가자미",
        storageType: 0, // 0 냉장, 1 냉동, 2 상온
        lastDate: "2023-09-24",
        storageDate: "", // datetime
      },
      {
        houseIngredientId:22,
        ingredientInfoId:324, // 0이면 커스텀 재료
        ingredientName:"감자",
        storageType: 2, // 0 냉장, 1 냉동, 2 상온
        lastDate:"2023-09-25",
        storageDate:"", // datetime
      },
      {
        houseIngredientId:23,
        ingredientInfoId: 0, // 0이면 커스텀 재료
        ingredientName:"갈비만두",
        storageType: 1, // 0 냉장, 1 냉동, 2 상온
        lastDate:"2023-09-24",
        storageDate:"", // datetime
      },
      {
        houseIngredientId: 24,
        ingredientInfoId: 123, // 0이면 커스텀 재료
        ingredientName: "가자미",
        storageType: 0, // 0 냉장, 1 냉동, 2 상온
        lastDate: "2023-10-20",
        storageDate: "", // datetime
      },
      {
        houseIngredientId: 251,
        ingredientInfoId: 123, // 0이면 커스텀 재료
        ingredientName: "가자미",
        storageType: 0, // 0 냉장, 1 냉동, 2 상온
        lastDate: "2023-10-20",
        storageDate: "", // datetime
      },
    ]);
  }, []);


  return (
    <View style={[ingredientStyles.ingredientContainer, tw`bg-white`]}>
      {ingredients.map((i) => {
        return (
            i.storageType!=1&&
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
