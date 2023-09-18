import axios from 'axios';
import {baseURL} from '@/apis/BASEURL'


const PublicIngredientExtractionApi = axios.create({
  baseURL: `${baseURL}/ingredient-extraction`,
})

const PrivateIngredientExtractionApi = axios.create({
  baseURL: `${baseURL}/ingredient-extraction`,
  headers: {
    // Authorization: `Bearer ${localStorage.getItem('token')}`
  }
})

interface props {
  textList: string[];
}

const ingredientExtractionApi = {
  extraction: async ({textList}: props) => {
    const res = await PrivateIngredientExtractionApi.post(
      'ingredient-extract',
      {
        textList: textList
      }
    );
    return res;
  },
}
