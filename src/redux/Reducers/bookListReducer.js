import { CREATE_BOOKS, GET_BOOKS ,DELETE_BOOK} from "../BookTypes";

const bookListReducer = (state = [], action) => {
  switch (action.type) {
    case GET_BOOKS:
      return action.payload;

    case CREATE_BOOKS:
      return [...state, action.payload];

    case DELETE_BOOK:
      const newList = state.filter((book)=> book.id != action.payload.id)
      return newList

    default:
      return state;
  }
};

export default bookListReducer;
