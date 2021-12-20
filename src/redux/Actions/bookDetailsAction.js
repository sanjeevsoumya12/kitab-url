import { BOOK_DETAILS, UPDATE_BOOK } from "../BookTypes";

export const bookDetailsAction = (payload) => {
  return {
    type: BOOK_DETAILS,
    payload,
  };
};

export const updateBook = (payload) => {
  return {
    type: UPDATE_BOOK,
    payload,
  };
};
