import axios from 'axios';
import {baseURL} from '@/apis/BASEURL'


const PublicMemberApi = axios.create({
  baseURL: `${baseURL}/member-manage`,
})

const PrivateMemberApi = axios.create({
  baseURL: `${baseURL}/member-manage`,
  // baseURL: 'http://localhost:8080',
  headers: {
    // Authorization: `Bearer ${localStorage.getItem('token')}`
  }
})

interface props {
  accessToken?: any;
  nickname?: string;
  houseCode?: string;
  idToken?: number;
  address?: string;
  memberId?: string;
  ingredientId?: string;
  followerId?: string;
  followeeId?: string;
  hateIngredientList?: string[];
  placeInfoList?: string[];
  email?: string;
  birthday?: string;
}

const memberApi = {
  getKaKaoInfo: async (accessToken: string) => {
    const res = await PublicMemberApi.post('/get-kakao-info', {
      accessToken: accessToken,
    });
    return res;
  },
  checkDuplicate: async ({nickname}: props) => {
    const res = await PublicMemberApi.post(
      'check-duplicate',
      {
        nickname: nickname
      }
    );
    return res;
  },
  checkHouse: async ({houseCode}: props) => {
    const res = await PublicMemberApi.get(
      `house/${houseCode}`
    );
    return res;
  },
  signup: async ({memberId, nickname, hateIngredientList, placeInfoList, birthday, email}: props) => {
    const res = await PublicMemberApi.post(
      'signup',
      {
        memberId: memberId,
        nickname: nickname,
        hateIngredientList: hateIngredientList,
        placeInfoList: placeInfoList,
        birthday: birthday,
        email: email,
      }
    );
    return res;
  },
  withdraw: async ({memberId}: props) => {
    const res = await PrivateMemberApi.delete(
      `${memberId}/withdrawal`
    );
    return res;
  },
  logout: async ({memberId}: props) => {
    const res = await PrivateMemberApi.post(
      'logout',
      {
        memberId: memberId,
      }
    );
    return res;
  },
  memberDetail: async (memberId: bigint) => {
    const res = await PrivateMemberApi.get(
      `${memberId}`
    );
    return res;
  },
  // TODO: 회원정보 수정 시 프로필 이미지는 따로 처리?
  memberUpdate: async ({memberId}: props) => {
    const res = await PrivateMemberApi.put(
      `${memberId}`,
    );
    return res;
  },
  memberHate: async ({memberId}: props) => {
    const res = await PrivateMemberApi.get(
      `${memberId}/hate-ingredient`,
    );
    return res;
  },
  addMemberHate: async ({memberId, ingredientId}: props) => {
    const res = await PrivateMemberApi.post(
      `${memberId}/hate-ingredient/${ingredientId}`,
    );
    return res;
  },
  deleteMemberHate: async ({memberId, ingredientId}: props) => {
    const res = await PrivateMemberApi.delete(
      `${memberId}/hate-ingredient/${ingredientId}`
    );
    return res;
  },
  followingMemberList: async ({memberId}: props) => {
    const res = await PrivateMemberApi.get(
      `${memberId}/follow`
    );
    return res;
  },
  toggleFollow: async ({followerId, followeeId}: props) => {
    const res = await PrivateMemberApi.post(
      `${followerId}/follow/${followeeId}`
    );
    return res;
  },
  changeProfile: async(memberId: number, formData: any) => {
    console.log(memberId, formData)
    const res = await PrivateMemberApi.put(
      `${memberId}/profile-image`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return res;
  },

}

export default memberApi;
