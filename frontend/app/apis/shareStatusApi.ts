import axios from 'axios';
import {baseURL} from '@/apis/BASEURL'
import chatApi from "@/apis/chatApi";


const PublicShareStatusApi = axios.create({
    baseURL: `${baseURL}/chatroom`,
});

const PrivateShareStatusApi = axios.create({
    baseURL: `${baseURL}/chatroom`,
    headers: {
        // Authorization: `Bearer ${localStorage.getItem('token')}`
    }
})

interface props {
    chatRoomId?: number;
    memberId?: number;
    shareStatus?: boolean;
}

const shareStatusApi = {
    shareStatus: async ({chatRoomId,memberId}:props) => {
        const res = await PrivateShareStatusApi.get(
            `/shareStatus/${chatRoomId}/${memberId}`,
        );
        return res;
    },
    updateShareStatus:async ({chatRoomId,memberId,shareStatus}:props)=>{
        const res = await PrivateShareStatusApi.put(
            `/`,
            {
                chatRoomId:chatRoomId,
                memberId:memberId,
                shareStatus:shareStatus
            }
        );
        return res;
    }
}

export default shareStatusApi;
