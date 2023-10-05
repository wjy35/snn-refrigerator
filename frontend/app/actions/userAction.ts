export const setMemberId = 'setMemberId';
export const setLocations = 'setLocations';
export const setHates = 'setHates';

export const setMemberIdAction = (res: any) =>{
  return {
    type: setMemberId,
    payload: res,
  };
};

export const setLocationsAction = (res: any) => {
  return {
    type: setLocations,
    payload: res,
  }
}

export const setHatesAction = (res: any) => {
  return {
    type: setHates,
    payload: res,
  }
}
