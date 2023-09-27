import { combineReducers } from "redux";
import houseReducer from "@/reducers/houseReducer";
import userReducer from "@/reducers/userReducer";


const rootReducer = combineReducers({
  houseReducer,
  userReducer,
});


export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;
