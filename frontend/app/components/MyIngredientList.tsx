import React, {useEffect, useState} from 'react';
import {View} from "react-native";
import SingleIngredient from "@/components/SingleIngredient";
import tw from 'twrnc';
import houseApi from "@/apis/houseApi";

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

  //TODO : houseID redux에서 불러오기
  const houseCode : string = "492f9401-c684-4966-936e-56f0941eaffe";

  useEffect(() => {

    const getIngredients = async() => {
      try{
        let res = await houseApi.houseIngredientList(houseCode);
        // console.log(res);
        if(res.status===200){
            console.log(res.data.data.ingredients);
            setIngredients(res.data.data.ingredients);
        }else{
          console.log(res.data.message);
        }
      }catch (e){
        // console.log(e);
      }
    }
    getIngredients();

  }, []);


  return (
    <View style={tw`w-full flex flex-wrap flex-row min-h-[40]`}>
      {ingredients.map((i) => {
        return (
            // @ts-ignore
            // 1+ Math.floor((new Date(i.lastDate).getTime() - new Date()) / (1000 * 60 * 60 * 24))<7&&
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
