import React, {useEffect, useState} from 'react';
import {View, Text, Button, ScrollView} from 'react-native';
import RecipeLayout from "@/screens/recipe/RecipeLayout";
import RecipeList from "@/components/RecipeList";
import {styles} from "@/styles/styles";
import recipeApi from "@/apis/recipeApi";


const RecipeListScreen = ({navigation}:any) => {
  const [recipe , setRecipe]= useState<any[]>([
    {
      recipeId:"",
      nickname:"",
      title:"",
      imageUrl:"",
      favoriteCount: 0,
      neededIngredients: 0,
      myIngredients: 0,
      foodName:"",
      cookingTime:"",
      serving:0
    }
  ]);
  const memberId : string = '3029548333'

  const [settings, setSettings] = useState({
    memberId: memberId,
    contain: [],
    remove: [],
    n: 1000,
    keyword: ''
  })

  function goToCreate(){
    console.log('gd')
    navigation.navigate('RecipeCreate')
  }



  useEffect(() => {
    const getRecipe = async () => {
      try {
        let res = await recipeApi.searchRecipe(settings);
        console.log(res.data.data)
        if (res.status === 200) {
          setRecipe(res.data.data.recipe);
        } else {
          console.log(res.data.data.recipe)
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
          <Text>{settings.contain.map(i => i.name).join(', ')}를 포함</Text>
          <Text>{settings.remove.map(i => i.name).join(', ')}를 제외</Text>
          <Text>미보유 재료 {settings.n}개 이하</Text>
          <Text>{settings.keyword} 레시피 검색 결과</Text>
          {/*<Button*/}
          {/*  title="레시피 등록"*/}
          {/*  onPress={ () => navigation.navigate('RecipeCreate')}*/}
          {/*/>*/}
          {/*<Button*/}
          {/*  title="레시피 상세"*/}
          {/*  onPress={ () => navigation.navigate('RecipeDetail')}*/}
          {/*/>*/}
          {/*<Button*/}
          {/*  title="레시피 수정"*/}
          {/*  onPress={ () => navigation.navigate('RecipeUpdate')}*/}
          {/*/>*/}
        </View>
        <RecipeList horizontal={false} recipeList={recipe} navigation={navigation}/>
      </View>
    </RecipeLayout>
  )
}

export default RecipeListScreen;
