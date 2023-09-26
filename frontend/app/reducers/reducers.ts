import { combineReducers } from "redux";
import houseReducer from "@/reducers/houseReducer";


const rootReducer = combineReducers({
  houseReducer,
});


export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;
