import axios from 'axios';
import {baseURL} from '@/apis/BASEURL'


const PublicChatRoomApi = axios.create({
    baseURL: `${baseURL}/chatroom`,
});

const PrivateChatRoomApi = axios.create({
    baseURL: `${baseURL}/chatroom`,
    headers: {
        // Authorization: `Bearer ${localStorage.getItem('token')}`
    }
})

interface props {
    chatRoomList?: [];
}

const chatRoomApi = {
    chatRoomList: async (memberId: number) => {
        const res = await PrivateChatRoomApi.get(
            `/${memberId}`,
        );
        return res;
    }
}

export default chatRoomApi;
