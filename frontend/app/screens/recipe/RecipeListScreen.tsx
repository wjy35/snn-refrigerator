import React, {useEffect, useState} from 'react';
import {View, Text, Button, ScrollView, TouchableWithoutFeedback, TextInput} from 'react-native';
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
import {
  appendIcon,
  backButton,
  closeIcon,
  foldIcon,
  micIcon,
  minusIcon,
  pictureIcon,
  plusIcon, searchIcon
} from "@/assets/icons/icons";
import {MAIN_COLOR, TEXT_COLOR} from "@/assets/colors/colors";
import Slider from '@react-native-community/slider';
import PlainInput from "@/components/PlainInput";
import {topNavStyles} from "@/styles/topNavStyles";
import {SvgXml} from "react-native-svg";
import {Shadow} from "react-native-shadow-2";
import memberApi from "@/apis/memberApi";


const RecipeListScreen = ({navigation}:any) => {
  const [recipe , setRecipe]= useState<any[]>([]);
  const {memberId} = useSelector((state:RootState)=>state.userReducer);
  const [settings, setSettings] = useState({
    memberId: memberId,
    contain: [],
    remove: [],
    n: 1000,
    keyword: '',
    size:5,
  });
  const [maxPage, setMaxPage] = useState(1);
  const [nowPage, setNowPage] = useState(1);
  const [excludeIngredientList, setExcludeIngredientList] = useState();
  const [remove, setRemove] = useState<any[]>([]);
  const [now, setNow] = useState(0);
  const houseIngredients = useSelector((state:RootState) => state.houseReducer.houseIngredients);
  const [contain, setContain] = useState([]);
  const [ingredients, setIngredients] = useState<any[]>([]);
  const [range, setRange] = useState(100);

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
        console.log("RecipeListScreen -> getRecipe",res.data.data);
        if (nowPage === 1){
          setRecipe([...res.data.data.recipe]);
        } else {
          setRecipe([...recipe, ...res.data.data.recipe]);
        }
        setNowPage(nowPage+1);
        setMaxPage(res.data.data.totalPage);
      } else {
        console.log(res.data.data.recipe);
      }
    } catch (err) {
      console.log(err);
    }
  }

  function checkDuplicate(item: any){
    return (
      ingredients.every((ingredient: any) => {
        if (ingredient.ingredientName !== item.ingredientName){
          return true;
        }
      })
    );
  };

  useEffect(()=>{
    houseIngredients.forEach((item: any)=>{
      if (checkDuplicate(item) && item.ingredientInfoId !== 0){
        ingredients.push({ingredientName: item.ingredientName, ingredientInfoId: item.ingredientInfoId, include: false});
      }
    })
    setIngredients([...ingredients])
  }, [houseIngredients])

  useEffect(() => {
    getRecipe();
  }, [settings]);

  async function getHate(){
    try {
      const res = await memberApi.memberHate(memberId);
      if (res.status === 200) {
        setRemove(() => res.data.data.ingredient);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(()=>{
    getHate();
  },[])

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
    title: '제외 식재료 설정',
    nowNum: 2,
    onChange: checkExcludeIngredient,
  });

  const keyWord = useInput({
    placeholder: '검색어 입력',
    title: '',
    nowNum: 1,
  })

  function removeIngredient(idx: number){
    const _remove = [...remove];
    _remove.splice(idx, 1);
    setRemove(_remove);
  }

  function toggleIngredient(idx: number){
    const _ingredients = [...ingredients];
    _ingredients[idx].include = !_ingredients[idx].include;
    setIngredients(_ingredients);
  }

  function setSearch(){
    setNowPage(1)
    const contain = ingredients.filter((item)=>item.include).map((item) => {
      return {
        ingredientName: item.ingredientName,
        ingredientInfoId: item.ingredientInfoId,
      }
    })
    setSettings({
      memberId: memberId,
      contain: contain,
      remove: remove,
      n: range,
      keyword: keyWord.text,
      size:5,
    })
    setNow(0);
  }

  return (
    <RecipeLayout title="레시피" optionTitle="등록" optionFunction={goToCreate}>
      <View style={styles.container}>
        {
          now === 0 && (
            <View style={{width:'100%'}}>
                <TouchableWithoutFeedback onPress={()=>{setNow(1)}}>
                  <View style={[{alignSelf:'center', flexDirection:'row', justifyContent:'center', marginBottom:5}]}>
                  <Text style={[styles.font, {color: TEXT_COLOR, fontSize:25, textAlign:'center'}]}>검색 상세설정</Text>
                  <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 2,
                    height: 30,
                    width: 30,
                    marginLeft: 10,
                    borderRadius: 999,
                    borderColor: '#E9F1FF',
                  }}>
                    <SvgXml
                        xml={appendIcon}
                        width={19}
                        height={19}
                    />
                  </View>
                  </View>
                </TouchableWithoutFeedback>

              <View style={styles.centerContainer}>
                {settings.contain.length>0&&<Text>{settings.contain.map(i => i.ingredientName).join(', ')}을(를) 포함한</Text>}
                {settings.remove.length>0&&<Text>{settings.remove.map(i => i.ingredientName).join(', ')}을(를) 제외한</Text>}
                {(settings.n!==1000&&settings.n!==100)&&<Text>미보유 재료 {settings.n}개 이하인</Text>}
                {(settings.contain.length>0||settings.remove.length>0||(settings.n!==1000&&settings.n!==100))&&<Text>{settings.keyword} 레시피 검색 결과</Text>}
              </View>
            </View>

          )
        }
        {
          now !== 0 && (

            <View style={{flex: 2}}>
              <ScrollView
                showsHorizontalScrollIndicator={false}
              >

                {
                  now === 1 && (
                      <>
                        <TouchableWithoutFeedback onPress={()=>{setNow(0)}}>
                          <View style={[{alignSelf:'center', flexDirection:'row', justifyContent:'center', marginBottom:5}]}>
                            <Text style={[styles.font, {color: TEXT_COLOR, fontSize:25, textAlign:'center'}]}>검색 상세설정</Text>
                            <View style={{
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderWidth: 2,
                              height: 30,
                              width: 30,
                              marginLeft: 10,
                              borderRadius: 999,
                              borderColor: '#E9F1FF',
                            }}>
                              <SvgXml
                                  xml={foldIcon}
                                  width={19}
                                  height={19}
                              />
                            </View>
                          </View>
                        </TouchableWithoutFeedback>
                    <View style={{padding:10}}>
                      <Text style={[styles.font, {fontSize: 20}]}>필수 식재료 설정</Text>
                      <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
                        {
                          ingredients && ingredients.map((i, idx) => {
                            if (i.include){
                              return (
                                <React.Fragment key={`${i.ingredientName}${idx}`}>
                                  <BasicBadge color={MAIN_COLOR} name={i.ingredientName} icon={minusIcon} onPress={()=>{toggleIngredient(idx)}}/>
                                </React.Fragment>
                              )
                            } else {
                              return (
                                <React.Fragment key={`${i.ingredientName}${idx}`}>
                                  <BasicBadge color='grey' name={i.ingredientName} icon={plusIcon} onPress={()=>{toggleIngredient(idx)}}/>
                                </React.Fragment>
                              )
                            }
                          })
                        }
                      </View>
                    </View></>
                  )
                }
                <View style={{padding:10}}>
                  <AutoCompleteInput
                    {...excludeIngredient}
                    textList={excludeIngredientList}
                    keyValue='ingredientInfoId'
                    name='ingredientName'
                    onPressIn={(newNum: number) => {setNow(newNum)}}
                    onBlur={() => {setNow(1)}}
                    onSelect={onSelectIngredient}/>
                </View>
                <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
                  {
                    remove && remove.map((i, idx) => {
                      return (
                        <React.Fragment key={`${i.ingredientName}${idx}`}>
                          <BasicBadge color='red' name={i.ingredientName} icon={closeIcon} onPress={()=>{removeIngredient(idx)}}/>
                        </React.Fragment>
                      )
                    })
                  }
                </View>
                {
                  now === 1 && (
                    <View style={{marginTop: 10, padding:10}}>
                      <Text style={[styles.font, {fontSize: 20}]}>
                        <Text>없는 재료  </Text>
                        <Text>{range}</Text>
                        <Text> 개 이하</Text>
                      </Text>
                      <Slider
                        style={{width: '100%', height: 50}}
                        minimumValue={0}
                        maximumValue={100}
                        step={1}
                        value={range}
                        onValueChange={(value: number)=>{setRange(value)}}
                        minimumTrackTintColor={MAIN_COLOR}
                        maximumTrackTintColor={MAIN_COLOR}
                        thumbTintColor={MAIN_COLOR}
                      />
                    </View>
                  )
                }
                {
                  now === 1 && (
                    <View style={{padding:10}}>
                      <PlainInput {...keyWord}/>
                    </View>
                  )
                }

                <View style={[{alignSelf:'center', flexDirection:'row', justifyContent:'center', marginBottom: 20}]}>
                  <BasicBadge leftIcon={searchIcon} color='#3093EF' name={'  검색하기  '} onPress={setSearch}/>
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
