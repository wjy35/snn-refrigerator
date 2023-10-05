import axios from 'axios';
import {baseURL} from '@/apis/BASEURL'


const PublicChatRoomApi = axios.create({
    baseURL: `${baseURL}/alarm`,
});

const PrivateChatRoomApi = axios.create({
    baseURL: `${baseURL}/alarm`,
    headers: {
        // Authorization: `Bearer ${localStorage.getItem('token')}`
    }
})

interface props {
    memberId?:number;
    memberFcmToken?:string;
}

const alarmApi = {
    saveMemberFcmToken: async ({memberId,memberFcmToken}: props) => {
        const res = await PrivateChatRoomApi.post(
            `/`,
            {
                memberId:memberId,
                memberFcmToken:memberFcmToken
            }
        );
        return res;
    }
}

export default alarmApi;
