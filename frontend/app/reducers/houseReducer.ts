import {setHouseCode, setHouseIngredients, setChanged} from "@/actions/houseAction";

const houseState = {
  houseCode: "492f9401-c684-4966-936e-56f0941eaffe",
  houseIngredients: [],
  changed: true,
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
      const _houseIngredients = [...action.payload]
      return {
        ...state,
        houseIngredients: _houseIngredients
      }
    }
    case setChanged: {
      return {
        ...state,
        changed: action.payload
      }
    }
    default:
        return state
  }
}
export default houseReducer;
