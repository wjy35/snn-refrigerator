import axios from 'axios';
import {baseURL} from '@/apis/BASEURL'


const PublicMemberApi = axios.create({
  baseURL: `${baseURL}/member`,
})

const PrivateMemberApi = axios.create({
  baseURL: `${baseURL}/member`,
  headers: {
    // Authorization: `Bearer ${localStorage.getItem('token')}`
  }
})

const memberApi = {
  login: async () => {
    const res = await PublicMemberApi.post(
      'login',
      {

      }
    )
    return res;
  },
  checkDuplicate: async (nickname: string) => {
    const res = await PublicMemberApi.post(
      'check-duplicate',
      {
        nickname: nickname
      }
    )
  },
}
