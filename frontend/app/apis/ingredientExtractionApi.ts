import axios from 'axios';
import {baseURL} from '@/apis/BASEURL'


const PublicIngredientExtractionApi = axios.create({
  baseURL: `${baseURL}/ingredient-extract`,
});

const PrivateIngredientExtractionApi = axios.create({
  baseURL: `${baseURL}/ingredient-extract`,
  headers: {
    // Authorization: `Bearer ${localStorage.getItem('token')}`
  }
});

interface props {
  text: string;
}

const ingredientExtractionApi = {
  extraction: async (text: string) => {
    const res = await PublicIngredientExtractionApi.post('', {
      text: text,
    });
    return res;
  },
};

export default ingredientExtractionApi;
