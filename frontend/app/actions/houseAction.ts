export const setHouseCode = 'setHouseCode';

export const setHouseCodeAction = (res: any) =>{
    return {
        type: setHouseCode,
        payload: res,
    }
}
