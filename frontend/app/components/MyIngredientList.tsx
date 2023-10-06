import React, {useEffect, useState} from 'react';
import {View} from "react-native";
import SingleIngredient from "@/components/SingleIngredient";
import tw from 'twrnc';
import {useDispatch, useSelector} from "react-redux";
import {setChangedAction, setHouseIngredientsAction} from "@/actions/houseAction";

interface props {
  types: any,
  maxDate: any,
  houseIngredients: any,
  optionalFunc?: Function,
}

const MyIngredientList = ({types,maxDate,houseIngredients, optionalFunc}:props) => {
  const dispatch = useDispatch();
  const filteredList = houseIngredients.filter((i)=>{
    // @ts-ignore
    if (1+ Math.floor((new Date(i.lastDate).getTime() - new Date()) / (1000 * 60 * 60 * 24))<maxDate&&
      types.includes(i.storageType)){
      return i
    }
  })

  function setChanged(bool: boolean){
    dispatch(setChangedAction(bool))
  }

  useEffect(()=>{
    if (filteredList.length === 0) {
      optionalFunc&&optionalFunc(1);
    } else {
      optionalFunc&&optionalFunc(0);
    }
  }, [filteredList])

  return (
    <View style={tw`w-full flex flex-wrap flex-row`}>
      {filteredList.map((i) => {
        return (
          <React.Fragment key={`ingredient ${i.houseIngredientId}`}>
            <SingleIngredient
              houseIngredientId={i.houseIngredientId}
              ingredientInfoId={i.ingredientInfoId}
              ingredientName={i.ingredientName}
              storageType={i.storageType}
              lastDate={i.lastDate}
              storageDate={i.storageDate}
              onChange={()=>{setChanged(true)}}
            />
          </React.Fragment>
        )
      })}
    </View>
  );
};

export default MyIngredientList;
