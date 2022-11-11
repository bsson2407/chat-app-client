import {
  Message,
  UserData,
  UserTypes,
  OTP,
  Email,
  refeshToken,
  Tokens,
  listFriend,
  EmailPass,
} from '../types/UserTypes';

import { Actions } from '../types/CommonTypes';

// -------------- LOGIN
export const loginUserRequest = (data: UserData, callback: any): Actions => {
  return {
    type: UserTypes.LOGIN_USER_REQUEST,
    payload: data,
    callback,
  };
};

export const loginUserSuccess = (data: UserData): Actions => {
  return {
    type: UserTypes.LOGIN_USER_SUCCESS,
    payload: data,
  };
};

export const loginUserFailure = (error: string): Actions => {
  return {
    type: UserTypes.LOGIN_USER_FAILURE,
    payload: error,
  };
};

// -------------- REGISTER
export const registerUserRequest = (data: UserData, callback: any): Actions => {
  return {
    type: UserTypes.REGISTER_USER_REQUEST,
    payload: data,
    callback: callback,
  };
};

export const registerUserSuccess = (data: UserData): Actions => {
  return {
    type: UserTypes.REGISTER_USER_SUCCESS,
    payload: data,
  };
};

export const registerUserFailure = (error: string): Actions => {
  return {
    type: UserTypes.REGISTER_USER_FAILURE,
    payload: error,
  };
};

// -------------- LOGOUT
export const logoutUserRequest = (): Actions => {
  localStorage.removeItem('token');
  localStorage.removeItem('refeshToken');
  return {
    type: UserTypes.LOGOUT_USER_REQUEST,
  };
};

export const logoutUserSuccess = (message: Message): Actions => {
  return {
    type: UserTypes.LOGOUT_USER_SUCCESS,
    payload: message,
  };
};

export const logoutUserFailure = (error: Error): Actions => {
  return {
    type: UserTypes.LOGOUT_USER_FAILURE,
    payload: error,
  };
};

// -------------- SEARCH USER BY PHONE OR EMAIL
export const searchUserRequest = (data: Email) => {
  return {
    type: UserTypes.SEARCH_USER_REQUEST,
    payload: data,
  };
};
export const searchUserSuccess = (data: UserData) => {
  return {
    type: UserTypes.SEARCH_USER_SUCCESS,
    payload: data,
  };
};
export const searchUserFailure = (error: string) => {
  return {
    type: UserTypes.SEARCH_USER_FAILURE,
    payload: error,
  };
};

// -------------- SEARCH USER BY PHONE OR EMAIL
export const searchUserExistRequest = (data: Email) => {
  return {
    type: UserTypes.SEARCH_USER_EXIST_REQUEST,
    payload: data,
  };
};
export const searchUserExistSuccess = (data: boolean) => {
  return {
    type: UserTypes.SEARCH_USER_EXIST_SUCCESS,
    payload: data,
  };
};
export const searchUserExistFailure = (error: Message) => {
  return {
    type: UserTypes.SEARCH_USER_EXIST_FAILURE,
    payload: error,
  };
};

// -------------- CHECK OTP
export const checkOtpRequest = (data: OTP, callback: any): Actions => {
  return {
    type: UserTypes.CHECK_OTP_REQUEST,
    payload: data,
    callback,
  };
};

export const checkOtpSuccess = (data: Message): Actions => {
  return {
    type: UserTypes.CHECK_OTP_SUCCESS,
    payload: data,
  };
};

export const checkOtpFailure = (error: Error): Actions => {
  return {
    type: UserTypes.CHECK_OTP_FAILURE,
    payload: error,
  };
};

// -------------- UPDATE PASWORD
export const updatePasswordRequest = (
  data: EmailPass,
  callback: any
): Actions => {
  return {
    type: UserTypes.UPDATE_PASSWORD_REQUEST,
    payload: data,
    callback,
  };
};

export const updatePasswordSuccess = (data: EmailPass): Actions => {
  return {
    type: UserTypes.UPDATE_PASSWORD_SUCCESS,
    payload: data,
  };
};

export const updatePasswordFailure = (error: Error): Actions => {
  return {
    type: UserTypes.UPDATE_PASSWORD_FAILURE,
    payload: error,
  };
};

// -------------- UPDATE PROFILE
export const updateProfileRequest = (data: UserData): Actions => {
  return {
    type: UserTypes.UPDATE_PROFILE_REQUEST,
    payload: data,
  };
};

export const updateProfileSuccess = (data: UserData): Actions => {
  return {
    type: UserTypes.UPDATE_PROFILE_SUCCESS,
    payload: data,
  };
};

export const updateProfileFailure = (error: Error): Actions => {
  return {
    type: UserTypes.UPDATE_PROFILE_FAILURE,
    payload: error,
  };
};

// -------------- GET NEW ACCESS TOKEN
export const getNewTokenRequest = (refeshToken: refeshToken): Actions => {
  return {
    type: UserTypes.GET_NEW_TOKEN_REQUEST,
    payload: refeshToken,
  };
};

export const getNewTokenSuccess = (tokens: Tokens): Actions => {
  return {
    type: UserTypes.GET_NEW_TOKEN_SUCCESS,
    payload: tokens,
  };
};

export const getNewTokenFailure = (error: Error): Actions => {
  return {
    type: UserTypes.GET_NEW_TOKEN_FAILURE,
    payload: error,
  };
};

// -------------- GET USER BY ID
export const getUserByIdRequest = (id: string) => {
  return {
    type: UserTypes.GET_USER_BY_ID_REQUEST,
    payload: id,
  };
};
export const getUserByIdSuccess = (data: UserData) => {
  return {
    type: UserTypes.GET_USER_BY_ID_SUCCESS,
    payload: data,
  };
};
export const getUserByIdFailure = (message: Message) => {
  return {
    type: UserTypes.GET_USER_BY_ID_REQUEST,
    payload: message,
  };
};

// -------------- GET USER BY ID
export const getFriendByIdRequest = (id: string) => {
  return {
    type: UserTypes.GET_FRIEND_BY_ID_REQUEST,
    payload: id,
  };
};
export const getFriendByIdSuccess = (data: UserData) => {
  return {
    type: UserTypes.GET_FRIEND_BY_ID_SUCCESS,
    payload: data,
  };
};
export const getFriendByIdFailure = (message: Message) => {
  return {
    type: UserTypes.GET_FRIEND_BY_ID_FAILURE,
    payload: message,
  };
};

// -------------- UPDATE AVATAR
export const updateAvatarRequest = (data: any) => {
  return {
    type: UserTypes.UPDATE_AVATAR_REQUEST,
    payload: data,
  };
};
export const updateAvatarSuccess = (data: UserData) => {
  return {
    type: UserTypes.UPDATE_AVATAR_SUCCESS,
    payload: data,
  };
};
export const updateAvatarFailure = (message: Message) => {
  return {
    type: UserTypes.UPDATE_AVATAR_FAILURE,
    payload: message,
  };
};

// -------------- GET ALL FRIENDS
export const getAllFriendRequest = (id: string) => {
  return {
    type: UserTypes.GET_ALL_FRIEND_REQUEST,
    payload: id,
  };
};
export const getAllFriendSuccess = (data: listFriend[]) => {
  return {
    type: UserTypes.GET_ALL_FRIEND_SUCCESS,
    payload: data,
  };
};
export const getAllFriendFailure = (error: Message) => {
  return {
    type: UserTypes.GET_ALL_FRIEND_FAILURE,
    payload: error,
  };
};

// -------------- GET ALL PEOPLE REQUEST
export const getAllPeopleRequestRequest = (id: string) => {
  return {
    type: UserTypes.GET_ALL_PEOPLE_REQUEST_REQUEST,
    payload: id,
  };
};
export const getAllPeopleRequestSuccess = (data: listFriend) => {
  return {
    type: UserTypes.GET_ALL_PEOPLE_REQUEST_SUCCESS,
    payload: data,
  };
};
export const getAllPeopleRequestFailure = (error: Message) => {
  return {
    type: UserTypes.GET_ALL_PEOPLE_REQUEST_FAILURE,
    payload: error,
  };
};

// -------------- SAVE INFO USER TO STATE
export const saveInfoUser = (user: UserData) => {
  return {
    type: UserTypes.SAVE_INFO_USER,
    payload: user,
  };
};

// -------------- DELETE USER STATE
export const clearUserState = (): Actions => {
  return {
    type: UserTypes.CLEAR_USER_STATE,
  };
};

// -------------- GET OTP
export const getEmailRequest = (data: Email): Actions => {
  return {
    type: UserTypes.GET_EMAIL_REQUEST,
    payload: data,
  };
};

export const getEmailSuccess = (data: Message): Actions => {
  return {
    type: UserTypes.GET_EMAIL_SUCCESS,
    payload: data,
  };
};

export const getEmailFailure = (error: Error): Actions => {
  return {
    type: UserTypes.GET_EMAIL_FAILURE,
    payload: error,
  };
};

// -------------- SAVE EMAIL USER TO STATE
export const saveEmailUser = (data: Email): Actions => {
  localStorage.setItem('emailUserResetPass', JSON.stringify(data));
  return {
    type: UserTypes.SAVE_EMAIL_USER,
    payload: data,
  };
};

// -------------- SAVE EMAIL USER TO STATE
export const saveEmailUserRegister = (data: Email): Actions => {
  const flag = {
    email: data.email,
  };
  localStorage.setItem('emailUserRegister', JSON.stringify(flag));
  return {
    type: UserTypes.SAVE_EMAIL_USER_REGISTER,
    payload: flag,
  };
};
