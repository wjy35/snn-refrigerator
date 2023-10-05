export const setHouseCode = 'setHouseCode';
export const setHouseIngredients = 'setHouseIngredients';
export const setChanged = 'setChanged';

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

export const setChangedAction = (res: any) => {
    return {
        type: setChanged,
        payload: res,
    }
}
