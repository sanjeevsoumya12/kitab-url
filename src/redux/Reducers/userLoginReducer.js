import { USER_INFO, USER_LOGOUT, USER_UPDATE } from "../UserType";

const userLoginReducer = (state = [], action) => {
  switch (action.type) {
    case USER_INFO:
    case USER_LOGOUT:
    case USER_UPDATE:
      return action.payload;
    default:
      return state;
  }
};

export default userLoginReducer;
