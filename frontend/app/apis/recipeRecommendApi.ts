import axios from 'axios';
import {baseURL} from '@/apis/BASEURL'


const PrivateRecipeRecommendApi = axios.create({
  baseURL: `${baseURL}/recipe-recommend`,
  headers: {
    // Authorization: `Bearer ${localStorage.getItem('token')}`
  }
})

interface props {
  memberId?: string;
}

const recipeRecommendApi = {
  getRecommendList: async ({memberId}: props) => {
    const res = await PrivateRecipeRecommendApi.get(
      `recipe/${memberId}`
    );
    return res;
  },
}

export default recipeRecommendApi;
