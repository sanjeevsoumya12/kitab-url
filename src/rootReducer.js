import { combineReducers } from "redux";
import bookDetailsReducer from "./redux/Reducers/bookDetailsReducer";
import bookListReducer from "./redux/Reducers/bookListReducer";
import userLoginReducer from "./redux/Reducers/userLoginReducer";

const rootReducer = combineReducers({
  books: bookListReducer,
  bookDetails: bookDetailsReducer,
  userDetails: userLoginReducer
});

export default rootReducer;
