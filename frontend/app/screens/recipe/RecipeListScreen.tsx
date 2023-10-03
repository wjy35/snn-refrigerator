import React, {useEffect, useState} from 'react';
import {View, Text, Button, ScrollView, TouchableWithoutFeedback} from 'react-native';
import RecipeLayout from "@/screens/recipe/RecipeLayout";
import RecipeList from "@/components/RecipeList";
import {styles} from "@/styles/styles";
import recipeApi from "@/apis/recipeApi";
import {useSelector} from "react-redux";
import {RootState} from "@/reducers/reducers";
import AutoCompleteInput from "@/components/AutoCompleteInput";
import useInput from "@/hooks/useInput";
import ingredientAutocompleteApi from "@/apis/ingredientAutocompleteApi";
import BasicBadge from "@/components/BasicBadge";
import {closeIcon} from "@/assets/icons/icons";


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
  const [excludeIngredientList, setExcludeIngredientList] = useState();
  const [remove, setRemove] = useState<any[]>([]);
  const [now, setNow] = useState(0);

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

  const checkExcludeIngredient = async (keyword: string) => {
    try {
      const res = await ingredientAutocompleteApi.check({keyword: keyword})
      if (res.status === 200) {
        setExcludeIngredientList(res.data.data.ingredients)
      }
    } catch (err) {
      console.log(err);
    }
  };

  function checkDuplicateIngredient(item: any){
    return (
      remove.every((ingredient: any) => {
        if (ingredient.ingredientName !== item.ingredientName){
          return true;
        }
      })
    );
  };

  function onSelectIngredient(item: any){
    console.log(item)
    if (checkDuplicateIngredient(item)){
      setRemove([...remove, {...item}]);
    }
  }

  const excludeIngredient = useInput({
    placeholder: '검색',
    title: '제외 식재료 등록',
    nowNum: 3,
    onChange: checkExcludeIngredient,
  });

  function removeIngredient(idx: number){
    const _remove = [...remove];
    _remove.splice(idx, 1);
    setRemove(_remove);
  }

  return (
    <RecipeLayout title="레시피" optionTitle="등록" optionFunction={goToCreate}>
      <View style={styles.container}>
        <View style={styles.centerContainer}>
          {settings.contain.length>0&&<Text>{settings.contain.map(i => i.name).join(', ')}를 포함</Text>}
          {settings.remove.length>0&&<Text>{settings.remove.map(i => i.name).join(', ')}를 제외</Text>}
          {settings.n!==1000&&<Text>미보유 재료 {settings.n}개 이하</Text>}
          <Text>{settings.keyword} 레시피 검색 결과</Text>
        </View>
        <View>
          <TouchableWithoutFeedback onPress={()=>{setNow(1)}}>
            <Text>상세설정</Text>
          </TouchableWithoutFeedback>
        </View>
        {
          now === 1 && (
            <View style={{flex: 2}}>
              <ScrollView
                showsHorizontalScrollIndicator={false}
              >
                <View>
                  <Text>필수</Text>
                  <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
                    {
                      remove && remove.map((i, idx) => {
                        return (
                          <React.Fragment key={`${i.ingredientName}${idx}`}>
                            <BasicBadge backgroundColor='red' name={i.ingredientName} icon={closeIcon} onPress={()=>{removeIngredient(idx)}}/>
                          </React.Fragment>
                        )
                      })
                    }
                  </View>
                </View>
                <View style={{}}>
                  <AutoCompleteInput {...excludeIngredient} textList={excludeIngredientList} keyValue='ingredientInfoId' name='ingredientName' onSelect={onSelectIngredient}/>
                </View>
                <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
                  {
                    remove && remove.map((i, idx) => {
                      return (
                        <React.Fragment key={`${i.ingredientName}${idx}`}>
                          <BasicBadge backgroundColor='red' name={i.ingredientName} icon={closeIcon} onPress={()=>{removeIngredient(idx)}}/>
                        </React.Fragment>
                      )
                    })
                  }
                </View>
                <View>

                </View>
                <View style={{marginTop: 100}}>
                  <Button title='검색하기'/>
                </View>
              </ScrollView>
            </View>
          )
        }
        {
          now === 0 && <RecipeList horizontal={false} recipeList={recipe} navigation={navigation} callNextPage={getRecipe}/>
        }
      </View>
    </RecipeLayout>
  )
}

export default RecipeListScreen;
