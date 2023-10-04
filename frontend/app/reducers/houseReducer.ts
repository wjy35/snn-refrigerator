import {setHouseCode, setHouseIngredients} from "@/actions/houseAction";

const houseState = {
    houseCode: "492f9401-c684-4966-936e-56f0941eaffe",
    houseIngredients: []
}

const houseReducer = (state=houseState, action: any) => {
  switch (action.type) {
    case setHouseCode: {
      return {
          ...state,
          houseCode: action.payload,
      };
    }
    case setHouseIngredients: {
      return {
        ...state,
        houseIngredients: [...action.payload]
      }
    }
    default:
        return state
  }
}
export default houseReducer;
