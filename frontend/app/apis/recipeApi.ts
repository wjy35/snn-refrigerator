import axios from 'axios';
import {baseURL} from '@/apis/BASEURL'


const PublicRecipeApi = axios.create({
  baseURL: `${baseURL}/recipe`,
})

const PrivateRecipeApi = axios.create({
  baseURL: `${baseURL}/recipe`,
  headers: {
    // Authorization: `Bearer ${localStorage.getItem('token')}`
  }
})

interface props {
  recipeId?: string;
  memberId?: string;
  keyword?: string;
  payload?: any;
  title?: string;
  youtubeUrl?: string;
  serving?: string;
  cookingTime?: string;
  foodName?: string;
  contents?: any[];
  ingredients?: any[];
  imageUrl?: any;
}

interface search {
  memberId: bigint;
  contain: any[];
  remove: any[];
  n: number;
  keyword: string;

}

const recipeApi = {
  detail: async ({memberId, recipeId}: props) => {
    const res = await PrivateRecipeApi.post(
      `recipe`,
      {
        memberId: memberId,
        recipeId: recipeId,
        }

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
  searchRecipe: async ({memberId, contain, remove, n, keyword, page, size}: search) => {
    const res = await PrivateRecipeApi.post(
      'search/',
        {
            memberId: memberId,
            requiredIngredients: contain,
            excludedIngredients: remove,
            missingIngredientCount: n,
            keyword: keyword,
            page: page,
            size: size,
        }

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
  createRecipe: async (formdata: any) => {
    console.log(formdata);
    const res = await PrivateRecipeApi.post(
      '',
      formdata,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          },
        // transformRequest: (data, headers) => {
        //   return data;
        //   },
      },
    );
    return res;
  },
  createImageUrl: async (formdata: any) => {
      console.log("이미지생성 api 진입")
      console.log(formdata);
      const res = await PrivateRecipeApi.post(
          '',
          formdata,
          {
              headers: {
                  'Content-Type': 'multipart/form-data',
              },
              // transformRequest: (data, headers) => {
              //   return data;
              //   },
          },
      );
      return res;
  }


}

export default recipeApi;
