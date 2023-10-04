export const setHouseCode = 'setHouseCode';
export const setHouseIngredients = 'setHouseIngredients';

export const setHouseCodeAction = (res: any) =>{
    return {
        type: setHouseCode,
        payload: res,
    }
}

export const setHouseIngredientsAction = (res: any) => {
    return {
        type: setHouseIngredients,
        payload: res,
    }
}
