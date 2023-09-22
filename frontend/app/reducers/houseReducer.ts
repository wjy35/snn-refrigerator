import {toggleVisible} from "@/actions/houseAction"

const houseState = {
  isVisible: false,
}

const houseReducer = (state=houseState, action: any) => {
  switch (action.type) {
    case toggleVisible:
      return {
        ...state,
        isVisible: !state.isVisible,
      }

    default:
      return state
  }
}

export default houseReducer;
