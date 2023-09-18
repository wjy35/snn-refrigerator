import axios from 'axios';
import {baseURL} from '@/apis/BASEURL'


const PublicAddressAutocompleteApi = axios.create({
  baseURL: `${baseURL}/address-autocomplete`,
})

const PrivateAddressAutocompleteApi = axios.create({
  baseURL: `${baseURL}/address-autocomplete`,
  headers: {
    // Authorization: `Bearer ${localStorage.getItem('token')}`
  }
})

interface props {
  keyword: string;
}

const addressAutocompleteApi = {
  check: async ({keyword}: props) => {
    const res = await PublicAddressAutocompleteApi.get(
      `search/${keyword}`
    );
    return res;
  },
}
