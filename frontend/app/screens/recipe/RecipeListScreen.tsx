import React, {useEffect, useState} from 'react';
import {View, Text, Button, ScrollView} from 'react-native';
import RecipeLayout from "@/screens/recipe/RecipeLayout";
import RecipeList from "@/components/RecipeList";
import {styles} from "@/styles/styles";
import recipeApi from "@/apis/recipeApi";
import {useSelector} from "react-redux";
import {RootState} from "@/reducers/reducers";


const RecipeListScreen = ({navigation}:any) => {
  const [recipe , setRecipe]= useState<any[]>([
    {
      recipeId:"",
      nickname:"",
      title:"",
      imageUrl:"",
      profileImageUrl:"",
      favoriteCount: 0,
      followCount: 0,
      foodName:"",
      favorite:false,
      cookingTime:"",
      serving:0
    }
  ]);

  const {memberId} = useSelector((state:RootState)=>state.userReducer);

  const [settings, setSettings] = useState({
    memberId: memberId,
    contain: [],
    remove: [],
    n: 1000,
    keyword: '',
    page:1,
    size:10,
  })

  function goToCreate(){
    console.log('gd')
    navigation.navigate('RecipeCreate')
  }



  useEffect(() => {
    const getRecipe = async () => {
      try {
        let res = await recipeApi.searchRecipe(settings);
        if (res.status === 200) {
          setRecipe(res.data.data.recipe);
        } else {
          console.log(res.data.data.recipe);
        }
      } catch (err) {
        console.log(err);
      }
    }

    getRecipe();
  }, []);

  useEffect(() => {
    const getRecipe = async () => {
      try {
        let res = await recipeApi.searchRecipe(settings);
        if (res.status === 200) {
          setRecipe(res.data.data.recipe);
        } else {
          console.log(res.data.data.recipe);
        }
      } catch (err) {
        console.log(err);
      }
    }

    getRecipe();
  }, [settings]);

  return (
    <RecipeLayout title="레시피" optionTitle="등록" optionFunction={goToCreate}>
      <View style={styles.container}>
        <View style={styles.centerContainer}>
          {settings.contain.length>0&&<Text>{settings.contain.map(i => i.name).join(', ')}를 포함</Text>}
          {settings.remove.length>0&&<Text>{settings.remove.map(i => i.name).join(', ')}를 제외</Text>}
          {settings.n!==1000&&<Text>미보유 재료 {settings.n}개 이하</Text>}
          <Text>{settings.keyword} 레시피 검색 결과</Text>
        </View>
        <RecipeList horizontal={false} recipeList={recipe} navigation={navigation}/>
      </View>
    </RecipeLayout>
  )
}

export default RecipeListScreen;
