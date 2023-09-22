import { combineReducers } from "redux";
import houseReducer from '@/reducers/houseReducer';


const rootReducer = combineReducers({
  houseReducer,
});
export default rootReducer;
