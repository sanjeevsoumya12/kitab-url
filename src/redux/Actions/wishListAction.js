import { WISH_LIST } from "../BookTypes";

export const wishList = (payload) => {
    return {
      type: WISH_LIST,
      payload,
    };
  };
  