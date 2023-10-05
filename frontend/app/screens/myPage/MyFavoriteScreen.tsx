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
  const [totalPage, setTotalPage] = useState(10);
  const memberId = useSelector((state: RootState) => state.userReducer.memberId);

  useEffect(() => {
    console.log(recipes);
    getFavoriteRecipe();
  }, [memberId]);

  const getFavoriteRecipe = async () => {
    try {
      if (page > totalPage) return
      const res = await recipeApi.memberFavorite(memberId, page, 5);
      if (res.status === 200) {
        if (page === 1){
          setRecipes([...res.data.data.recipe]);
        } else {
          setRecipes([...recipes, ...res.data.data.recipe]);
        }
        setPage(page+1);
        setTotalPage(res.data.data.totPage);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <MyPageLayout title="즐겨찾기 레시피">
      <RecipeList
        horizontal={false}
        recipeList={recipes}
        navigation={navigation}
        callNextPage={getFavoriteRecipe}
      />
    </MyPageLayout>
  )
}

export default MyFavoriteScreen;
