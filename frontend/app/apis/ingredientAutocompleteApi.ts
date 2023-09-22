import axios from 'axios';
import {baseURL} from '@/apis/BASEURL'


const PublicIngredientAutocompleteApi = axios.create({
  baseURL: `${baseURL}/ingredient-autocomplete`,
})

const PrivateIngredientAutocompleteApi = axios.create({
  baseURL: `${baseURL}/ingredient-autocomplete`,
  headers: {
    // Authorization: `Bearer ${localStorage.getItem('token')}`
  }
})

interface props {
  keyword: string;
}

const ingredientAutocompleteApi = {
  check: async ({keyword}: props) => {
    const res = await PublicIngredientAutocompleteApi.get(
      `${keyword}`
    );
    return res;
  },
}

export default ingredientAutocompleteApi;
