import axios from 'axios';
import {baseURL} from '@/apis/BASEURL'


const PublicHouseApi = axios.create({
  baseURL: `${baseURL}/house-ingredient/`,
})

const PrivateHouseApi = axios.create({
  baseURL: `${baseURL}/house-ingredient/`,
  headers: {
    // Authorization: `Bearer ${localStorage.getItem('token')}`
  }
})

interface props {
  houseIngredientId?: string;
  storageType?: number;
  lastDate?: string;
  houseCode?: string;
  ingredients?: any[];
}

const houseApi = {
  houseIngredientList: async (houseCode: string) => {
    const res = await PrivateHouseApi.get(
      `house/${houseCode}`,
    );
    return res;
  },
  houseIngredientDetail: async ({houseIngredientId}: props) => {
    const res = await PrivateHouseApi.get(
      `${houseIngredientId}`
    );
    return res;
  },
  addIngredient: async ({houseCode, ingredients}: props)=> {
    const res = await PrivateHouseApi.post(
      '',
      {
        houseCode: houseCode,
        ingredients: ingredients,
      },
      {
        headers: {
          "Content-Type": 'application/json'
        }
      }
    );
    return res;
  },
  updateIngredient: async ({houseIngredientId, storageType, lastDate}: props) => {
    const res = await PrivateHouseApi.put(
      '',
      {
        houseIngredientId: houseIngredientId,
        storageType: storageType,
        lastDate: lastDate,
      },

    );
    return res;
  },
  deleteIngredient: async ({houseIngredientId}: props) => {
    const res = await PrivateHouseApi.delete(
      `${houseIngredientId}`
    );
    return res;
  },
  deleteAll: async ({houseCode}: props)=> {
    const res = await PrivateHouseApi.delete(
      `house/${houseCode}`
    );
    return res;
  }
}

export default houseApi;
