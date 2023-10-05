import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  ScrollView,
  ImageBackground,
  Image,
  TouchableWithoutFeedback,
  TextInput, ToastAndroid
} from 'react-native';
import RecipeLayout from "@/screens/recipe/RecipeLayout";
import {useRoute} from "@react-navigation/native";
import {recipeStyles} from "@/styles/recipeStyles";
import {styles} from "@/styles/styles";
import {SvgXml} from "react-native-svg";
import {closeBlackIcon, dish, followIcon, time, user} from "@/assets/icons/icons";
import {MAIN_COLOR, TEXT_COLOR, TEXT_SUB_COLOR, TEXT_DEACTIVATED_COLOR} from "@/assets/colors/colors";
import {useSelector} from "react-redux";
import {RootState} from "@/reducers/reducers";
import ShowYoutube from "@/components/ShowYoutube";
import GetImageFrom from "@/components/GetImageFrom";
import useInput from "@/hooks/useInput";
import AutoCompleteInput from "@/components/AutoCompleteInput";
import ingredientAutocompleteApi from "@/apis/ingredientAutocompleteApi";
import PlainInput from "@/components/PlainInput";
import recipeApi from "@/apis/recipeApi";
import BasicBadge from "@/components/BasicBadge";

const RecipeUpdateScreen = ({navigation}:any) => {
  const route = useRoute();
  const [recipeDetail, setRecipeDetail] = useState<any>({
    ...route.params,
  });
  const [activatedTab, setActivatedTab] = useState(0);
  const {memberId} = useSelector((state:RootState)=>state.userReducer);
  const [isVisible, setIsVisible] = useState(false);
  const [autoCompleteIngredientList, setAutoCompleteIngredientList] = useState<any[]>();
  const [now, setNow] = useState(0);
  const [title, setTitle] = useState<string>(route.params.title);
  const [foodName, setFoodName] = useState<string>(route.params.foodName);
  const [serving, setServing] = useState<string>(route.params.serving);
  const [cookingTime, setCookingTime] = useState<string>(route.params.cookingTime);
  const splitUrl = recipeDetail.youtubeUrl?.split('/');
  const targetUrl = splitUrl && splitUrl[3]?.split('?v=');
  const target = targetUrl?.pop();
  const [youtubeUrl, setYoutubeUrl] = useState<string>(target?target.slice(0, 11):'');
  const [ingredients, setIngredients] = useState<any[]>(Array.from(route.params.ingredientResponseList, (i)=> {
    return {
      ingredientName: i.name,
      amount: i.amount,
      ingredientInfoId: i.ingredientInfoId,
    }
  }));
  const [contents, setContents] = useState(route.params.contentResponseList);
  const [image, setImage] = useState({
    assets: [{uri: recipeDetail.imageUrl}],
  });


  function getImage(item: any){
    setImage(item);
  }

  const checkIngredient = async (keyword: string) => {
    try {
      const res = await ingredientAutocompleteApi.check({keyword: keyword})
      if (res.status === 200) {
        setAutoCompleteIngredientList(res.data.data.ingredients)
      }
    } catch (err) {
      console.log(err);
    }
  };

  function onPressIn(newNum: number) {
    setNow(newNum);
  }

  function onSelect(item: any){
    if (checkDuplicate(item)) {
      setIngredients([...ingredients, {...item, amount: ''}])
    }
  }

  function removeIngredient(idx: number) {
    const _ingredients = [...ingredients];
    _ingredients.splice(idx, 1);
    setIngredients(_ingredients);
  }

  function checkDuplicate(item: any){
    return (
      ingredients.every((ingredient: any) => {
        if (ingredient.ingredientName !== item.ingredientName){
          return true;
        }
      })
    );
  }

  const ingredientText = useInput({
    placeholder: '재료 추가',
    title: '',
    nowNum: 1,
    onChange: checkIngredient,
  })

  const newYoutubeUrl = useInput({
    placeholder: '유튜브 링크',
    title: '유튜브 링크',
    nowNum: 2,
  })

  function onChangeAmount(idx: number, newText: string){
    ingredients[idx].amount = newText;
    console.log(ingredients);
  }

  function addContent(){
    const _contents = [...contents];
    _contents.push({
      content: '',
      order: 0,
    });
    setContents(_contents);
  }

  function removeContent(idx: number){
    const _contents = [...contents];
    _contents.splice(idx, 1);
    setContents(_contents);
  }

  function getYoutubeCode(newText: string){
    const splitUrl = newText.split('/');
    const targetUrl = splitUrl[3]?.split('?v=');
    const target = targetUrl?.pop();
    setYoutubeUrl(target?target.slice(0, 11):'');
    recipeDetail.youtubeUrl = newText;
  }

  function onToast(text: string){
    ToastAndroid.showWithGravity(
      text,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    )
  }

  async function getImageUrl(){
    const recipeImage = {
      name: image.assets[0].fileName,
      type: image.assets[0].type,
      uri: image.assets[0].uri,
    };
    const formData = new FormData();
    formData.append('recipeImage', recipeImage);
    formData.append('memberId', memberId);
    const recipeImageUrl = await recipeApi.createImageUrl(formData);
    return recipeImageUrl.data.data.imageUrl;
  }

  async function updateRecipe(){
    let flag = 0
    const newContents = Array.from(contents, (context, idx)=>{
      if (context === ''){
        flag = 1
      }
      return {
        order: idx + 1,
        content: context,
      };
    });

    if (!foodName){
      onToast('요리 제목을 입력해주세요');
      return
    }

    if (!title){
      onToast('레시피 제목을 입력해주세요');
      return
    }

    if (!serving){
      onToast('조리 양을 입력해주세요');
      return
    }

    if (!cookingTime){
      onToast('조리 시간을 입력해주세요');
      return
    }

    if (!image){
      onToast('음식 사진을 등록해주세요');
      return
    }

    if (ingredients.length < 3){
      onToast('필요한 식재료 개수가 너무 적습니다');
      return
    }

    if (ingredients.some((i)=>!i.amount&&true)){
      onToast('식재료 양을 입력해주세요');
      return
    }

    if (flag === 1){
      onToast('비어있는 조리과정이 있습니다')
      return
    }

    const inputData = {
      ingredients: ingredients,
      contents: contents,
      imageUrl: '',
      foodName: foodName,
      cookingTime: cookingTime,
      serving: serving,
      youtubeUrl: recipeDetail.youtubeUrl,
      title: title,
      memberId: memberId,
      recipeId: route.params?.recipeId,
    };

    if (image.assets[0].uri !== recipeDetail.imageUrl){
      const res = await getImageUrl();
      console.log(res);
      inputData.imageUrl = res;
    }
    try {
      const res = await recipeApi.updateRecipe(inputData);
      console.log(res);
    } catch (err){
      console.log(err);
    }
  }

  return (
    <RecipeLayout title="레시피" optionTitle="완료" optionFunction={updateRecipe}>
      <ScrollView style={{width: '100%'}}>
        <TouchableWithoutFeedback onPress={()=>{setIsVisible(true)}}>
          <View style={[recipeStyles.recipeDetailImage, {backgroundColor: 'grey'}]}>
            <ImageBackground source={{uri: image.assets[0].uri}}
                             resizeMode={'cover'}
                             style={{width:'100%', height:'100%', opacity: 0.2}}
            />
          </View>
        </TouchableWithoutFeedback>
        <View>
          <TextInput style={[styles.font, recipeStyles.recipeDetailTitleText, {borderWidth: 0.2}]} value={title} onChangeText={(newText: string)=>{setTitle(newText)}} multiline={true}/>
        </View>
        <View style={recipeStyles.recipeDetailInfoContainer}>
          <View style={recipeStyles.recipeDetailInfo}>
            <View style={recipeStyles.recipeDetailUserContainer}>
              <View style={recipeStyles.recipeDetailUserImage}>
                <Image source={{uri: recipeDetail.profileImageUrl}}
                       style={{height:70,width:70,borderRadius:99, borderWidth:1, borderColor:TEXT_COLOR ,marginRight:10}}
                />
              </View>
              <View style={[recipeStyles.recipeDetailUserInfo]}>
                <Text style={[styles.font,{fontSize:20, color:TEXT_SUB_COLOR, marginVertical:3}]}>{recipeDetail.nickname}</Text>
                <View style={{ flexDirection:'row', justifyContent:'center', marginVertical:3}}>
                  <SvgXml
                    xml={followIcon}
                    width={20}
                    height={20}
                  />
                  <Text style={[styles.font,{fontSize:20, color:TEXT_SUB_COLOR}]}>{recipeDetail.favoriteCount}</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={recipeStyles.recipeDetailInfoLinesContainer}>
            <View style={[recipeStyles.recipeDetailLineContainer]}>
              <View style={{justifyContent: 'center'}}>
                <SvgXml
                  xml={dish}
                  width={25}
                  height={25}
                  style={{marginLeft:2, marginRight:7}}
                />
              </View>
              <TextInput style={[styles.font,{color:TEXT_SUB_COLOR, fontSize:15, borderWidth: 0.2, height: 25, padding: 0}]} value={foodName} onChangeText={(newText: string)=>{setFoodName(newText)}}/>
            </View>
            <View style={recipeStyles.recipeDetailLineContainer}>
              <View>
                <SvgXml
                  xml={user}
                  width={25}
                  height={25}
                  style={{marginLeft:2, marginRight:7}}
                />
              </View>
              <TextInput style={[styles.font,{color:TEXT_SUB_COLOR, fontSize:15, borderWidth: 0.2, height: 25, padding: 0}]} value={serving} onChangeText={(newText: string)=>{setServing(newText)}}/>
            </View>
            <View style={recipeStyles.recipeDetailLineContainer}>
              <View>
                <SvgXml
                  xml={time}
                  width={25}
                  height={25}
                  style={{marginLeft:2, marginRight:7}}
                />
              </View>
              <TextInput style={[styles.font,{color:TEXT_SUB_COLOR, fontSize:15, borderWidth: 0.2, height: 25, padding: 0}]} value={cookingTime} onChangeText={(newText: string)=>{setCookingTime(newText)}}/>
            </View>
          </View>
        </View>
        <View style={recipeStyles.recipeDetailBodyContainer}>
          <View style={recipeStyles.recipeDetailTabContainer}>
            <TouchableWithoutFeedback
              onPress={()=>{setActivatedTab(0)}}
            >
              <View style={[recipeStyles.recipeDetailSingleTab, activatedTab===0?recipeStyles.recipeDetailSingleSelectedTab:{},{marginRight:-1}]}>
                <Text style={[styles.font,{color:activatedTab===0?TEXT_SUB_COLOR:TEXT_DEACTIVATED_COLOR, fontSize:20}]}>재료</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={()=>{setActivatedTab(1)}}
            >
              <View style={[recipeStyles.recipeDetailSingleTab, activatedTab===1?recipeStyles.recipeDetailSingleSelectedTab:{}]}>
                <Text style={[styles.font,{color:activatedTab===1?TEXT_SUB_COLOR:TEXT_DEACTIVATED_COLOR, fontSize:20}]}>조리 과정</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>

          {/* 재료 목록 가져옴*/}
          <View style={recipeStyles.recipeDetailBody}>
            {activatedTab===0&&
              (
                <>
                  <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <View style={[{width: '90%'}]}>
                      <AutoCompleteInput {...ingredientText} textList={autoCompleteIngredientList} keyValue='ingredientInfoId' name='ingredientName' onPressIn={onPressIn} onSelect={onSelect}/>
                    </View>
                  </View>
                  {
                    ingredients ?
                      <>
                        {ingredients.map((ingredient, index) => (
                          <View key={index} style={{
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            flexDirection: 'row',
                            marginHorizontal:10,
                            marginVertical:3,
                          }}>
                            <View style={{flex: 3}}>
                              <Text style={[styles.font,{color:TEXT_COLOR, fontSize:20, width:'60%'}]}>{`${ingredient.ingredientName}`}</Text>
                            </View>
                            <View style={{flex: 3}}>
                              <TextInput placeholder={ingredient.amount} style={{borderWidth: 0.2}} onChangeText={(newText: string)=>{onChangeAmount(index, newText)}}/>
                            </View>
                            <View style={{flex: 1, alignItems: 'flex-end'}}>
                              <TouchableWithoutFeedback onPress={()=>{removeIngredient(index)}}>
                                <SvgXml
                                  xml={closeBlackIcon}
                                  width={15}
                                  height={15}
                                />
                              </TouchableWithoutFeedback>
                            </View>
                          </View>
                        ))}
                      </>
                      :
                      (<Text>재료 정보가 없습니다.</Text>)
                  }
                </>
              )
            }

            {activatedTab===1&&
              (recipeDetail.contentResponseList ? (
                  <>
                    { recipeDetail.youtubeUrl && (
                      <View style={{
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        width: '100%',
                        padding:10}}>
                        <View style={{width: '100%'}}>
                          <PlainInput {...newYoutubeUrl} onPressIn={onPressIn} now={0} onChangeText={getYoutubeCode}/>
                        </View>
                        <ShowYoutube youtubeId={youtubeUrl} />
                      </View>
                    )
                    }
                    <View style={{
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      width: '100%',
                      flexDirection: 'row',
                      margin:10,
                    }}>
                      <Text style={[styles.font,{color:TEXT_COLOR, fontSize:20, width:'100%'}]}>[만드는 법]</Text>
                    </View>
                    {contents.map((content, index) => (
                      <View key={index} style={{
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        width: '100%',
                        flexDirection: 'row',
                        paddingHorizontal:10,
                        paddingVertical:3,
                      }}>
                        <View style={{flex: 1}}>
                          <Text style={[styles.font,{color:TEXT_COLOR, fontSize:20}]}>{index+1}. </Text>
                        </View>
                        <View style={{flex: 10}}>
                          <TextInput
                            multiline={true}
                            style={[styles.font, {borderWidth: 0.2, padding: 0, width: '100%', color:TEXT_COLOR, fontSize:20}]}
                            placeholder={content.content}
                            onChangeText={(newText)=>{content.content=newText}}/>
                        </View>
                        <View style={{flex: 1, alignItems: 'flex-end'}}>
                          <TouchableWithoutFeedback onPress={()=>{removeContent(index)}}>
                            <SvgXml
                              xml={closeBlackIcon}
                              width={15}
                              height={15}
                            />
                          </TouchableWithoutFeedback>
                        </View>
                      </View>
                    ))}
                    <BasicBadge color={MAIN_COLOR} fill={false} name={'추가하기'} onPress={addContent}/>
                  </>)
                : (
                  <View style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                    <Text>내용 정보가 없습니다.</Text>
                    <BasicBadge color={MAIN_COLOR} fill={false} name={'추가하기'} onPress={addContent}/>
                  </View>
                ))
            }

          </View>
        </View>

      </ScrollView>
      {
        isVisible && (
          <GetImageFrom getImage={getImage} setIsVisible={()=>{setIsVisible(false)}}/>
        )
      }
    </RecipeLayout>
  )
}

export default RecipeUpdateScreen;
