import { combineReducers } from "redux";
import bookDetailsReducer from "./redux/Reducers/bookDetailsReducer";
import bookListReducer from "./redux/Reducers/bookListReducer";

const rootReducer = combineReducers({
  books: bookListReducer,
  bookDetails: bookDetailsReducer,
});

export default rootReducer;
