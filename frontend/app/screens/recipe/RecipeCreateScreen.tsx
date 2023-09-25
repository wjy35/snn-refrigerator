import React, {useRef, useState} from 'react';
import RecipeLayout from "@/screens/recipe/RecipeLayout";
import ProgressPage from "@/components/ProgressPage";
import RecipeCreateBasicInfo from "@/pages/recipeCreate/RecipeCreateBasicInfo";
import RecipeCreateIngredientInfo from "@/pages/recipeCreate/RecipeCreateIngredientInfo";
import RecipeCreateCookInfo from "@/pages/recipeCreate/RecipeCreateCookInfo";
import useInput from "@/hooks/useInput";

const RecipeCreateScreen = ({navigation}:any) => {
  const textList = ['기본 정보', '필요한 재료', '조리 과정']
  const [content, setContent] = useState<any[]>([
    {order: 1, content: '돼지고기를 찬 물에 담가 핏물을 빼주세요'},
    {order: 2, content: '잘 익은 김치 한 포기를 잘라주세요'},
    {order: 3, content: '냄비에 들기름을 두르고 김치와 볶아주세요'},
  ]);
  const [ingredients, setIngredients] = useState<any[]>([
    { ingredientName: '돼지고기(목살)', amount: '300g', ingredientInfoId: 1},
    { ingredientName: '돼지고기(목살)', amount: '300g', ingredientInfoId: 1},
    { ingredientName: '돼지고기(목살)', amount: '300g', ingredientInfoId: 1},
    { ingredientName: '돼지고기(목살)', amount: '300g', ingredientInfoId: 1},
  ]);
  const [recipeInfo, setRecipeInfo] = useState<any>({})

  // TODO: 재료 추가 로직 구현
  function addIngredient(ingredientName: string, amount: string, ingredientInfoId: number){
    const _ingredients = [...ingredients];
    _ingredients.push({ingredientName, amount, ingredientInfoId});
    setIngredients(_ingredients);
  }

  // TODO: 재료 삭제 로직 구현
  function deleteIngredient(){

  }

  // TODO: 빈 조리과정 추가
  function addContent(){

  }

  // TODO: 조리과정 삭제
  function deleteContent(){

  }

  // TODO: 조리과정 입력, 수정
  function editContent(){

  }

  function changeInfo(key: string, value: string){
    setRecipeInfo({...recipeInfo, [key]: value});
    console.log(recipeInfo)
  }

  return (
    <RecipeLayout title="레시피" optionTitle="다음">
      <ProgressPage>
        <RecipeCreateBasicInfo
          textList={textList}
          setRecipeInfo={changeInfo}
        />
        <RecipeCreateIngredientInfo
          textList={textList}
          ingredients={ingredients}
          addIngredient={addIngredient}
          deleteIngredient={deleteIngredient}
          foodName={recipeInfo.foodName&&recipeInfo.foodName}
          serving={recipeInfo.serving&&recipeInfo.serving}
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
