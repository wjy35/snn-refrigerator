import React, {useEffect, useState} from 'react';
import {View, Text, Button, ScrollView} from 'react-native';
import RecipeLayout from "@/screens/recipe/RecipeLayout";
import RecipeList from "@/components/RecipeList";
import {styles} from "@/styles/styles";
import recipeApi from "@/apis/recipeApi";
import {useSelector} from "react-redux";
import {RootState} from "@/reducers/reducers";


const RecipeListScreen = ({navigation}:any) => {
  const [recipe , setRecipe]= useState<any[]>([]);

  const {memberId} = useSelector((state:RootState)=>state.userReducer);

  const [settings, setSettings] = useState({
    memberId: memberId,
    contain: [],
    remove: [],
    n: 1000,
    keyword: '',
    size:3,
  });
  const [maxPage, setMaxPage] = useState(1);
  const [nowPage, setNowPage] = useState(1);

  function goToCreate(){
    navigation.navigate('RecipeCreate')
  }

  const getRecipe = async () => {
    try {
      if (nowPage > maxPage) return
      const res = await recipeApi.searchRecipe({
        ...settings,
        page: nowPage
      });
      if (res.status === 200) {
        setNowPage(nowPage+1);
        setRecipe([...recipe, ...res.data.data.recipe]);
        setMaxPage(res.data.data.totalPage);
      } else {
        console.log(res.data.data.recipe);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    setNowPage(1)
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
        <RecipeList horizontal={false} recipeList={recipe} navigation={navigation} callNextPage={getRecipe}/>
      </View>
    </RecipeLayout>
  )
}

export default RecipeListScreen;
