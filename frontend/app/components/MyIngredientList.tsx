import React, {useEffect, useState} from 'react';
import {View} from "react-native";
import SingleIngredient from "@/components/SingleIngredient";
import tw from 'twrnc';
import {useDispatch, useSelector} from "react-redux";
import {setChangedAction, setHouseIngredientsAction} from "@/actions/houseAction";

const MyIngredientList = ({types,maxDate,houseIngredients}:any) => {
  const dispatch = useDispatch();

  function setChanged(bool: boolean){
    dispatch(setChangedAction(bool))
  }

  return (
    <View style={tw`w-full flex flex-wrap flex-row`}>
      {houseIngredients.map((i) => {
        return (
            // @ts-ignore
            1+ Math.floor((new Date(i.lastDate).getTime() - new Date()) / (1000 * 60 * 60 * 24))<maxDate&&
            types.includes(i.storageType)&&
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
