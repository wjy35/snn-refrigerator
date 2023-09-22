import axios from 'axios';
import {testURL} from '@/apis/BASEURL'

const SampleApi = axios.create({
  baseURL: `${testURL}/ingredient-manage`,
})


const sampleApi = {
  test: async () => {
    const res = await SampleApi.get(
      '1',
    )
    return res;
  },
  test2: async () => {
    const res = await axios.get(
      `${testURL}/member-manage/1`
    )
    return res;
  }
}

export default sampleApi;
