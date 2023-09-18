import React, {useState} from 'react';
import {View, Text, Button, ScrollView} from 'react-native';
import RecipeLayout from "@/screens/recipe/RecipeLayout";
import RecipeList from "@/components/RecipeList";
import {styles} from "@/styles/styles";


const RecipeListScreen = ({navigation}:any) => {
  const [recipeList, setRecipeList] = useState([
    {title: 'title1', id: 1},
    {title: 'title2', id: 2},
    {title: 'title3', id: 3},
  ])
  const [settings, setSettings] = useState({
    contain: [{name: '베이컨', id: 1}, {name: '양파', id: 2}, {name: '아스파라거스', id: 3}],
    remove: [{name: '번데기', id: 1}, {name: '땅콩', id: 2}, {name: '아몬드', id: 3}],
    n: 3,
    keyword: '김치찌개'
  })

  return (
    <RecipeLayout title="레시피">
      <View style={styles.container}>
        <View style={styles.centerContainer}>
          <Text>{settings.contain.map(i => i.name).join(', ')}를 포함</Text>
          <Text>{settings.remove.map(i => i.name).join(', ')}를 제외</Text>
          <Text>미보유 재료 {settings.n}개 이하</Text>
          <Text>{settings.keyword} 레시피 검색 결과</Text>
          <Button
            title="레시피 등록"
            onPress={ () => navigation.navigate('RecipeCreate')}
          />
          <Button
            title="레시피 상세"
            onPress={ () => navigation.navigate('RecipeDetail')}
          />
          <Button
            title="레시피 수정"
            onPress={ () => navigation.navigate('RecipeUpdate')}
          />
        </View>
        <RecipeList horizontal={false} recipeList={recipeList} navigation={navigation}/>
      </View>
    </RecipeLayout>
  )
}

export default RecipeListScreen;
