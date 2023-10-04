import axios from 'axios';
import {baseURL} from '@/apis/BASEURL'


const PublicShareApi = axios.create({
  baseURL: `${baseURL}/share/`,
})

const PrivateShareApi = axios.create({
  baseURL: `${baseURL}/share/`,
  headers: {
    // Authorization: `Bearer ${localStorage.getItem('token')}`
  }
})

interface props {
  locationId?: number;
  pageNum?: number;
  items?: number;
  keyword?: string;
  shareIngredients: any[];
  shareBoardWriteRequest: any;
}

// TODO: 나눔 api 작성해야함
const shareApi = {
  getShareList: async ({locationId, pageNum, items, keyword}: props) => {
    const res = await PrivateShareApi.get(
      `${locationId}/${pageNum}/${items}?keyword=${keyword}`,
    );
    return res;
  },
  createShare: async ({shareIngredients, shareBoardWriteRequest}: props) => {
    const res = await PrivateShareApi.post(
      '',
      {
        shareIngredients: shareIngredients,
        shareBoardWriteRequest: shareBoardWriteRequest,
      }
    )
    return res;
  }
}

export default shareApi;
