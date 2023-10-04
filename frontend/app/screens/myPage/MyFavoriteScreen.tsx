import React, {useEffect, useState} from 'react';
import { View, Text, Button } from 'react-native';
import MyPageLayout from "@/screens/myPage/MyPageLayout";
import RecipeList from "@/components/RecipeList";
import {useSelector} from "react-redux";
import {RootState} from "@/reducers/reducers";
import recipeApi from "@/apis/recipeApi";

const MyFavoriteScreen = ({navigation}:any) => {
  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [size, setSize] = useState(5);

  const memberId = useSelector((state: RootState) => state.userReducer.memberId);

  useEffect(() => {
    async function init(){
      const res = await getFavoriteRecipe(memberId, page, size);
      setTotalPage(res.data.data.totPage);
      setRecipes(res.data.data.recipe);
    }
    init();
  }, [memberId]);

  useEffect(() => {

  }, [recipes, page, totalPage]);
  const getFavoriteRecipe = async (memberId: number, page: number, size: number) => {
    const res = await recipeApi.memberFavorite(memberId, page, size);
    console.log(res.data);
    return res;
  }

  const pageIsValid = (request: any, targetPage: number) => {
    console.log(targetPage, totalPage);
    if(totalPage >= targetPage && targetPage > 0) return true;
    return false;
  }

  const changePage = async (newPage: number) => {
    if(!pageIsValid(result, newPage)) return;
    const result = await getFavoriteRecipe(memberId, newPage, size);
    if(result.status === 200){
      setPage(newPage);
      setRecipes(result.data.data.recipe);
    }
  }

  const beforePage = async () => {
    await changePage(page - 1);
  };

  const nextPage = async () => {
    await changePage(page + 1);
  }
  const recipe = [
    {
      recipeId:"123123",
      nickname:"독버섯 왕준영",
      title:"곽민규찜",
      imageUrl:"레시피 이미지",
      favoriteCount:19,
      neededIngredients:8,
      myIngredients:6,
      foodName:"김치찜",
      cookingTime:"120분",
      serving:2
    },
    {
      recipeId:"123124",
      nickname:"독버섯 왕준영",
      title:"곽민규찜",
      imageUrl:"레시피 이미지",
      favoriteCount:19,
      neededIngredients:12,
      myIngredients:6,
      foodName:"김치찜",
      cookingTime:"120분",
      serving:2
    },
    {
      recipeId:"123125",
      nickname:"독버섯 왕준영",
      title:"곽민규찜",
      imageUrl:"레시피 이미지",
      favoriteCount:19,
      neededIngredients:10,
      myIngredients:3,
      foodName:"김치찜",
      cookingTime:"120분",
      serving:2
    },
    {
      recipeId:"123126",
      nickname:"독버섯 왕준영",
      title:"곽민규찜",
      imageUrl:"레시피 이미지",
      favoriteCount:19,
      neededIngredients:7,
      myIngredients:6,
      foodName:"김치찜",
      cookingTime:"120분",
      serving:2
    },
  ];

  return (
    <MyPageLayout title="즐겨찾기 레시피">
      <RecipeList horizontal={false} recipeList={recipes} navigation={navigation}/>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Button
          title="beforePage"
          onPress={beforePage}
        />
        <Text>
          페이지 : {page}/{totalPage}
        </Text>
        <Button
          title="nextPage"
          onPress={nextPage}
        />
      </View>
    </MyPageLayout>
  )
}

export default MyFavoriteScreen;
