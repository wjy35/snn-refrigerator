import axios from 'axios';
import {baseURL} from '@/apis/BASEURL'


const PublicShareApi = axios.create({
  baseURL: `${baseURL}/share`,
})

const PrivateShareApi = axios.create({
  baseURL: `${baseURL}/share`,
  headers: {
    // Authorization: `Bearer ${localStorage.getItem('token')}`
  }
})

interface props {
}

// TODO: 나눔 api 작성해야함
const shareApi = {
  shareList: async () => {
    const res = await PrivateShareApi.post(
      '',
    );
    return res;
  },
}

export default shareApi;
