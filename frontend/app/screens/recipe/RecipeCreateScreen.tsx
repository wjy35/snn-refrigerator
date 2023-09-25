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
    { ingredientName: '돼지고기(목살)', ingredientServing: '300g'},
    { ingredientName: '돼지고기(목살)', ingredientServing: '300g'},
    { ingredientName: '돼지고기(목살)', ingredientServing: '300g'},
    { ingredientName: '돼지고기(목살)', ingredientServing: '300g'},
  ]);

  // TODO: 재료 추가 로직 구현
  function addIngredient(ingredientName: string, ingredientServing: string){
    const _ingredients = [...ingredients];
    _ingredients.push({ingredientName, ingredientServing});
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

  const foodName = useInput({
    placeholder: '요리 제목',
    title: '요리 제목',
    nowNum: 0,
  });

  const title = useInput({
    placeholder: '레시피 제목',
    title: '레시피 제목',
    nowNum: 0,
  });

  const serving = useInput({
    placeholder: '조리 양',
    title: '조리 양',
    nowNum: 0,
  });

  const cookingTime = useInput({
    placeholder: '조리 시간',
    title: '조리 시간',
    nowNum: 0,
  });

  const youtubeUrl = useInput({
    placeholder: '유튜브 링크',
    title: '유튜브 링크',
    nowNum: 0,
  });

  return (
    <RecipeLayout title="레시피" optionTitle="다음">
      <ProgressPage>
        <RecipeCreateBasicInfo
          textList={textList}
          foodName={foodName}
          title={title}
          serving={serving}
          cookingTime={cookingTime}
          youtubeUrl={youtubeUrl}
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
