import { CREATE_BOOKS, GET_BOOKS ,DELETE_BOOK } from "../BookTypes";

export const bookListAction = (payload) => {
  return {
    type: GET_BOOKS,
    payload,
  };
};

export const bookCreateAction = (payload) => {
  return {
    type: CREATE_BOOKS,
    payload,
  };
};

export const deleteBook = (payload) => {
  return {
    type: DELETE_BOOK,
    payload
  }
}