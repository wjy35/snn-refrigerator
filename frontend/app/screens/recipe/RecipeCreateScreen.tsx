import React, {useRef, useState} from 'react';
import RecipeLayout from "@/screens/recipe/RecipeLayout";
import ProgressPage from "@/components/ProgressPage";
import RecipeCreateBasicInfo from "@/pages/recipeCreate/RecipeCreateBasicInfo";
import RecipeCreateIngredientInfo from "@/pages/recipeCreate/RecipeCreateIngredientInfo";
import RecipeCreateCookInfo from "@/pages/recipeCreate/RecipeCreateCookInfo";
import useInput from "@/hooks/useInput";
import recipeApi from "@/apis/recipeApi";

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
  const [imageUrl, setImageUrl] = useState<any>();

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
      _content.splice(idx + 1, 0, '');
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
    const contents = Array.from(content, (context, idx)=>{
      return {
        order: idx + 1,
        content: context,
      };
    });

    const recipeImage = {
      name: image.assets[0].fileName,
      type: image.assets[0].type,
      uri: image.assets[0].uri,
    };

    // Todo : memberId 가져오기
    const data = {
      ingredients: ingredients,
      contents: contents,
      imageUrl: imageUrl,
      foodName: recipeInfo.foodName,
      cookingTime: recipeInfo.cookingTime,
      serving: recipeInfo.serving,
      youtubeUrl: recipeInfo.youtubeUrl,
      title: recipeInfo.title,
      memberId: 3029548333,
    };

    try {
      const ImageRequest = {
        // Todo : memberId 가져오기
        recipeImage: recipeImage,
        memberId: 3029548333,
      }
      const recipeImageUrl = await recipeApi.createImageUrl(ImageRequest);

      data.imageUrl = recipeImageUrl;

      console.log("가져온 url");
      console.log(data.imageUrl);

      const requestData = {
        recipeImage: recipeImage,
        recipeRequest: data,
      }


      const res = await recipeApi.createRecipe(requestData);
      if (res.status === 200){
        console.log('성공');
      }
    } catch (err) {
      console.log(err);
    }
  }

  function getImage(uri: string){
    setImage(uri);
    console.log(uri);
  }

  return (
    <RecipeLayout title="레시피" optionTitle="등록" optionFunction={createRecipe}>
      <ProgressPage>
        <RecipeCreateBasicInfo
          textList={textList}
          setRecipeInfo={changeInfo}
          getImage={getImage}
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
    </RecipeLayout>
  )
}

export default RecipeCreateScreen;
