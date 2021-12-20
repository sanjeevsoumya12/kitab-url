import { BOOK_DETAILS, UPDATE_BOOK } from "../BookTypes";
const bookDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case BOOK_DETAILS:
    case UPDATE_BOOK:
      return action.payload;
    default:
      return state;
  }
};

export default bookDetailsReducer;
