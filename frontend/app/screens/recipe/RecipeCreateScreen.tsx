import React, {useRef, useState} from 'react';
import RecipeLayout from "@/screens/recipe/RecipeLayout";
import ProgressPage from "@/components/ProgressPage";
import RecipeCreateBasicInfo from "@/pages/recipeCreate/RecipeCreateBasicInfo";
import RecipeCreateIngredientInfo from "@/pages/recipeCreate/RecipeCreateIngredientInfo";
import RecipeCreateCookInfo from "@/pages/recipeCreate/RecipeCreateCookInfo";
import useInput from "@/hooks/useInput";
import recipeApi from "@/apis/recipeApi";
import {useSelector} from "react-redux";
import {RootState} from "@/reducers/reducers";
import {Text, ToastAndroid, TouchableWithoutFeedback, View} from "react-native";
import {closeBlackIcon, closeIcon} from "@/assets/icons/icons";
import {SvgXml} from "react-native-svg";
import {MAIN_COLOR} from "@/assets/colors/colors";
import {styles} from "@/styles/styles";
import GetImageFrom from "@/components/GetImageFrom";

const RecipeCreateScreen = ({navigation}:any) => {
  const textList = ['기본 정보', '필요한 재료', '조리 과정']
  const [content, setContent] = useState<string[]>([
    '',
    '',
    '',
  ]);
  const [ingredients, setIngredients] = useState<any[]>([]);
  const [recipeInfo, setRecipeInfo] = useState<any>({});
  const [image, setImage] = useState<any>();
  const {memberId} = useSelector((state:RootState)=>state.userReducer);
  const [isVisible, setIsVisible] = useState(false);

  function onToast(text: string){
    ToastAndroid.showWithGravity(
      text,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    )
  }

  function addIngredient({ingredientName, amount, ingredientInfoId}: any){
    const _ingredients = [...ingredients, {ingredientName: ingredientName, amount: amount, ingredientInfoId: ingredientInfoId}];
    setIngredients(_ingredients);
  }

  function editIngredientAmount(idx: number, amount: string){
    const _ingredients = [...ingredients];
    _ingredients[idx].amount = amount;
    setIngredients(_ingredients);
  }
  function deleteIngredient(idx: number){
    const _ingredients = [...ingredients];
    _ingredients.splice(idx, 1);
    setIngredients(_ingredients);
  }

  function addContent(idx: number){
    const _content = [...content];
    if (idx === 0) {
      _content.push('');
    } else {
      _content.splice(idx-1, 0, '');
    }
    setContent(_content);
  }

  function deleteContent(idx: number){
    const _content = [...content];
    _content.splice(idx, 1);
    setContent(_content);
  }

  function editContent(idx: number, newText: string){
    const _content = [...content];
    _content[idx] = newText;
    setContent(_content);
  }

  function changeInfo(key: string, value: string){
    setRecipeInfo({...recipeInfo, [key]: value});
  }

  async function createRecipe(){
    let flag = 0
    const contents = Array.from(content, (context, idx)=>{
      if (context === ''){
        flag = 1
      }
      return {
        order: idx + 1,
        content: context,
      };
    });


    if (!recipeInfo.foodName){
      onToast('요리 제목을 입력해주세요');
      return
    }

    if (!recipeInfo.title){
      onToast('레시피 제목을 입력해주세요');
      return
    }

    if (!recipeInfo.serving){
      onToast('조리 양을 입력해주세요');
      return
    }

    if (!recipeInfo.cookingTime){
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

    const recipeImage = {
      name: image.assets[0].fileName,
      type: image.assets[0].type,
      uri: image.assets[0].uri,
    };

    // Todo : memberId 가져오기
    const inputData = {
      ingredients: ingredients,
      contents: contents,
      imageUrl: '',
      foodName: recipeInfo.foodName,
      cookingTime: recipeInfo.cookingTime,
      serving: recipeInfo.serving,
      youtubeUrl: recipeInfo.youtubeUrl,
      title: recipeInfo.title,
      memberId: memberId,
    };

    try {

      const formData = new FormData();
      formData.append('recipeImage', recipeImage);
      formData.append('memberId', memberId);

      const recipeImageUrl = await recipeApi.createImageUrl(formData);

      inputData.imageUrl = recipeImageUrl.data.data.imageUrl;

      const res = await recipeApi.createRecipe(inputData);
      if (res.status === 200){
        console.log('성공');
        navigation.goBack();
      }
    } catch (err) {
      console.log('RecipeCreateScreen',err);
    }
  }

  function getImage(img: any){
    setImage(img);
  }

  return (
    <RecipeLayout title="레시피" optionTitle="등록" optionFunction={createRecipe}>
      <ProgressPage>
        <RecipeCreateBasicInfo
          textList={textList}
          setRecipeInfo={changeInfo}
          setIsVisible={()=>setIsVisible(true)}
          image={image}
        />
        <RecipeCreateIngredientInfo
          textList={textList}
          ingredients={ingredients}
          addIngredient={addIngredient}
          deleteIngredient={deleteIngredient}
          foodName={recipeInfo.foodName&&recipeInfo.foodName}
          serving={recipeInfo.serving&&recipeInfo.serving}
          editIngredient={editIngredientAmount}
        />
        <RecipeCreateCookInfo
          textList={textList}
          content={content}
          addContent={addContent}
          deleteContent={deleteContent}
          editContent={editContent}
          recipeInfo={recipeInfo}
        />
      </ProgressPage>
      {
        isVisible && (
          <GetImageFrom getImage={getImage} setIsVisible={()=>setIsVisible(false)}/>
        )
      }
    </RecipeLayout>
  )
}

export default RecipeCreateScreen;
