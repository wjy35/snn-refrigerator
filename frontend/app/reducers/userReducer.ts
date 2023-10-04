import {setLocations, setMemberId} from '@/actions/userAction';

const userState = {
  memberId: 3029548333,
  nickname: '',
  email: '',
  locations: []
};

const userReducer = (state=userState, action: any) => {
  switch (action.type) {
    case setMemberId: {
      return {
        ...state,
        memberId: action.payload,
      };
    }
    case setLocations: {
      return {
        ...state,
        locations: action.payload
      }
    }
    default:
      return state;
  }
};
export default userReducer;
