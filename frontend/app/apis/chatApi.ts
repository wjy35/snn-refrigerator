import axios from 'axios';
import {baseURL} from '@/apis/BASEURL'


const PublicChatRoomApi = axios.create({
    baseURL: `${baseURL}/chat`,
});

const PrivateChatRoomApi = axios.create({
    baseURL: `${baseURL}/chat`,
    headers: {
        // Authorization: `Bearer ${localStorage.getItem('token')}`
    }
})

interface props {
    chatRoomList?: [];
}

const chatApi = {
    chatList: async (chatRoomId: number) => {
        const res = await PrivateChatRoomApi.get(
            `/view/all/${chatRoomId}`,
        );
        return res;
    }
}

export default chatApi;
