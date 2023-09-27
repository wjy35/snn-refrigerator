import {setMemberId} from '@/actions/userAction';

const userState = {
  memberId: '',
  nickname: '',
  email: '',
};

const userReducer = (state=userState, action: any) => {
  switch (action.type) {
    case setMemberId:
      return {
        state,
        memberId: action.payload,
      };
    default:
      return state;
  }
};
export default userReducer;
