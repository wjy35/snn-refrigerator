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
    },
    addChatRoom:async (sharePostId:number,senderMemberId:number,receiverMemberId:number)=>{
        const res = await PrivateChatRoomApi.post(
            `/`,
            {
                sharePostId:sharePostId,
                senderMemberId:senderMemberId,
                receiverMemberId:receiverMemberId
            }
        );
        return res;
    },
    checkChatRoom:async (sharePostId:number,memberId:number)=>{
        const res = await PrivateChatRoomApi.get(
            `/search/${sharePostId}/${memberId}`
        );

        return res;
    }
}

export default chatRoomApi;
