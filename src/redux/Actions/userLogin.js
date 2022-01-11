import {  USER_INFO, USER_LOGOUT, USER_UPDATE } from "../UserType";

export const userLogin = (payload) => {
  return {
    type: USER_INFO,
    payload,
  };
};

export const userLogout = (payload) => {
  return {
    type: USER_LOGOUT,
    payload,
  }
}
export const userUpdate = (payload) => {
  debugger
  return {
    type: USER_UPDATE,
    payload
  }
}
