import {sample} from "@/actions/houseAction"

const houseState = {
  test: 'test',
}

const houseReducer = (state=houseState, action: any) => {
  switch (action.type) {
    case sample:
      return {
        ...state
      }

    default:
      return state
  }
}

export default houseReducer;
