import axios from 'axios';
import {baseURL} from '@/apis/BASEURL'


const PublicRecipeApi = axios.create({
  baseURL: `${baseURL}/ingredient-autocomplete`,
})

const PrivateRecipeApi = axios.create({
  baseURL: `${baseURL}/ingredient-autocomplete`,
  headers: {
    // Authorization: `Bearer ${localStorage.getItem('token')}`
  }
})

interface props {
  recipeId: string;
  memberId: string;
  keyword: string;
  payload: any;
}

const recipeApi = {
  detail: async ({recipeId}: props) => {
    const res = await PrivateRecipeApi.get(
      `${recipeId}`
    );
    return res;
  },
  memberFavorite: async ({memberId}: props) => {
    const res = await PrivateRecipeApi.get(
      `favorite/${memberId}`
    );
    return res;
  },
  deleteFavorite: async ({memberId, recipeId}: props) => {
    const res = await PrivateRecipeApi.delete(
      `favorite/${recipeId}`,
      {
        data: {
          memberId: memberId
        }
      }
    );
    return res;
  },
  addFavorite: async ({memberId, recipeId}: props) => {
    const res = await PrivateRecipeApi.post(
      `favorite/${recipeId}`,
      {
        memberId: memberId,
      }
    );
    return res;
  },
  searchKeyword: async ({keyword}: props) => {
    const res = await PrivateRecipeApi.get(
      `search/${keyword}`
    );
    return res;
  },
  searchRecipe: async () => {
    const res = await PrivateRecipeApi.get(
      'search'
    );
    return res;
  },
  deleteRecipe: async ({recipeId}: props) => {
    const res = await PrivateRecipeApi.delete(
      `${recipeId}`
    );
    return res;
  },
  updateRecipe: async ({payload}: props) => {
    const res = await PrivateRecipeApi.put(
      `${payload.recipeId}`,
      {
        memberId: payload.memberId,
        title: payload.title,
        // TODO: image 등록
        youtubeUrl: payload.youtubeUrl,
        serving: payload.serving,
        cookingTime: payload.cookingTime,
        foodName: payload.foodName,
        contents: payload.contents,
        ingredients: payload.ingredients,
      }
    );
    return res;
  },
  createRecipe: async ({payload}: props) => {
    const res = await PrivateRecipeApi.post(
      '',
      {
        memberId: payload.memberId,
        title: payload.title,
        // TODO: image 등록
        youtubeUrl: payload.youtubeUrl,
        serving: payload.serving,
        cookingTime: payload.cookingTime,
        foodName: payload.foodName,
        contents: payload.contents,
        ingredients: payload.ingredients,
      }
    );
    return res;
  }


}
