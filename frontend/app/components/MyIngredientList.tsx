import React, {useEffect, useState} from 'react';
import {View} from "react-native";
import SingleIngredient from "@/components/SingleIngredient";
import tw from 'twrnc';
import houseApi from "@/apis/houseApi";
import {useSelector} from "react-redux";
import {RootState} from "@/reducers/reducers";

const MyIngredientList = ({types,maxDate}:any) => {
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

  const { houseCode } = useSelector((state:RootState) => state.houseReducer)


  useEffect(() => {
    const getIngredients = async() => {
      try{
        let res = await houseApi.houseIngredientList(houseCode);
        // console.log(res);
        if(res.status===200){
            // console.log(res.data.data.ingredients);
            res.data.data.ingredients.sort((a: { lastDate: string | number | Date; }, b: { lastDate: string | number | Date; })=>{
                // @ts-ignore
                return new Date(a.lastDate) - new Date(b.lastDate)
            })
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
    <View style={tw`w-full flex flex-wrap flex-row`}>
      {ingredients.map((i) => {
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
            />
          </React.Fragment>
        )
      })}
    </View>
  );
};

export default MyIngredientList;
