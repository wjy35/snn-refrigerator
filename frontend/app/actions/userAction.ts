export const setMemberId = 'setMemberId';

export const setMemberIdAction = (res: any) =>{
  return {
    type: setMemberId,
    payload: res,
  };
};
