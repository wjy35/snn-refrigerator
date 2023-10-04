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
  sharePostId?: number;
  memberId?: number;
  title?: string;
  content?: string;
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
  createShareWrite: async ({shareIngredients, shareBoardWriteRequest}: props) => {
    const res = await PrivateShareApi.post(
      '/content',
      {
        shareIngredients: shareIngredients,
        shareBoardWriteRequest: shareBoardWriteRequest,
      }
    )
    return res;
  },
  postShareImage: async ({sharePostId}: props, formData: any) => {
    const res = await PrivateShareApi.post(
    `/image/shareboard/${sharePostId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return res;
  },

  postThumbnails: async ({sharePostId}: props, formData: any) => {
    const res = await PrivateShareApi.post(
    `/thumbnail/shareboard/${sharePostId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return res;
  },
  patchShareWrite: async ({shareIngredients, shareBoardWriteRequest}: props) => {
    const res = await PrivateShareApi.patch(
      '/content',
      {
        shareIngredients: shareIngredients,
        shareBoardWriteRequest: shareBoardWriteRequest,
      }
    )
    return res;
  },
  patchShareImage: async ({sharePostId}: props, formData: any) => {
    const res = await PrivateShareApi.patch(
    `/image/shareboard/${sharePostId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return res;
  },

  patchThumbnails: async ({sharePostId}: props, formData: any) => {
    const res = await PrivateShareApi.patch(
    `/thumbnail/shareboard/${sharePostId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return res;
  },

  deletePost: async ({sharePostId}: props) => {
    const res = await PrivateShareApi.delete(
      `/detail/${sharePostId}`
    );
    return res;
  },
}

export default shareApi;
