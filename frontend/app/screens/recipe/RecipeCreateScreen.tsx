import React, {useRef, useState} from 'react';
import RecipeLayout from "@/screens/recipe/RecipeLayout";
import ProgressPage from "@/components/ProgressPage";
import RecipeCreateBasicInfo from "@/pages/recipeCreate/RecipeCreateBasicInfo";
import RecipeCreateIngredientInfo from "@/pages/recipeCreate/RecipeCreateIngredientInfo";
import RecipeCreateCookInfo from "@/pages/recipeCreate/RecipeCreateCookInfo";

const RecipeCreateScreen = ({navigation}:any) => {
  const textList = ['기본 정보', '필요한 재료', '조리 과정']
  const [title, setTitle] = useState<string>();
  const [youtubeUrl, setYouTubeUrl] = useState<string>();
  const [serving, setServing] = useState<string>('1~2인분');
  const [cookingTime, setCookingTime] = useState<string>();
  const [foodName, setFoodName] = useState<string>('김치찌개');
  const [content, setContent] = useState<any[]>([
    {order: 1, content: '돼지고기를 찬 물에 담가 핏물을 빼주세요'},
    {order: 2, content: '잘 익은 김치 한 포기를 잘라주세요'},
    {order: 3, content: '냄비에 들기름을 두르고 김치와 볶아주세요'},

  ]);
  const [ingredients, setIngredients] = useState<any[]>([
    { ingredientName: '돼지고기(목살)', ingredientServing: '300g'},
    { ingredientName: '돼지고기(목살)', ingredientServing: '300g'},
    { ingredientName: '돼지고기(목살)', ingredientServing: '300g'},
    { ingredientName: '돼지고기(목살)', ingredientServing: '300g'},
  ]);

  // TODO: 재료 추가 로직 구현
  function addIngredient(ingredientName: string, ingredientServing: string){
    const _ingredients = [...ingredients];
    _ingredients.push({ingredientName, ingredientServing});
    setIngredients(_ingredients)
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

  const swiper = useRef()


  return (
    <RecipeLayout title="레시피" optionTitle="다음">
      <ProgressPage>
        <RecipeCreateBasicInfo
          textList={textList}
        />
        <RecipeCreateIngredientInfo
          textList={textList}
          foodName={foodName}
          serving={serving}
          ingredients={ingredients}
          addIngredient={addIngredient}
          deleteIngredient={deleteIngredient}
        />
        <RecipeCreateCookInfo
          textList={textList}
          foodName={foodName}
          serving={serving}
          content={content}
          addContent={addContent}
          deleteContent={deleteContent}
          editContent={editContent}
        />
      </ProgressPage>
    </RecipeLayout>
  )
}

export default RecipeCreateScreen;
