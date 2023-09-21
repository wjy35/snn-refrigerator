import axios from 'axios';
import {baseURL} from '@/apis/BASEURL'


const PublicHouseApi = axios.create({
  baseURL: `${baseURL}/house-ingredient`,
})

const PrivateHouseApi = axios.create({
  baseURL: `${baseURL}/house-ingredient`,
  headers: {
    // Authorization: `Bearer ${localStorage.getItem('token')}`
  }
})

interface props {
  houseIngredientId: string;
  storageType: number;
  lastDate: string;
  houseId: string;
  payload: any;
}

const houseApi = {
  houseIngredientList: async ({houseId}: props) => {
    const res = await PrivateHouseApi.get(
      `house/${houseId}`,
    );
    return res;
  },
  houseIngredientDetail: async ({houseIngredientId}: props) => {
    const res = await PrivateHouseApi.get(
      `${houseIngredientId}`
    );
    return res;
  },
  addIngredient: async ({payload}: props)=> {
    const res = await PrivateHouseApi.post(
      '',
      {
        houseSeq: payload.houseSeq,
        ingredients: payload.ingredients
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
      }
    );
    return res;
  },
  deleteIngredient: async ({houseIngredientId}: props) => {
    const res = await PrivateHouseApi.delete(
      `${houseIngredientId}`
    );
    return res;
  },
  deleteAll: async ({houseId}: props)=> {
    const res = await PrivateHouseApi.delete(
      `house/${houseId}`
    );
    return res;
  }
}

export default houseApi;
