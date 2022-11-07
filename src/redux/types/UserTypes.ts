import { DateLocale } from 'yup/lib/locale';
import { User } from './ChatTypes';

export const UserTypes = {
  LOGIN_USER_REQUEST: 'LOGIN_USER_REQUEST',
  LOGIN_USER_SUCCESS: 'LOGIN_USER_SUCCESS',
  LOGIN_USER_FAILURE: 'LOGIN_USER_FAILURE',

  REGISTER_USER_REQUEST: 'REGISTER_USER_REQUEST',
  REGISTER_USER_SUCCESS: 'REGISTER_USER_SUCCESS',
  REGISTER_USER_FAILURE: 'REGISTER_USER_FAILURE',

  REGISTER_USER_FIREBASE_REQUEST: 'REGISTER_USER_FIREBASE_REQUEST',
  REGISTER_USER_FIREBASE_SUCCESS: 'REGISTER_USER_FIREBASE_SUCCESS',
  REGISTER_USER_FIREBASE_FAILURE: 'REGISTER_USER_FIREBASE_FAILURE',

  LOGOUT_USER_REQUEST: 'LOGOUT_USER_REQUEST',
  LOGOUT_USER_SUCCESS: 'LOGOUT_USER_SUCCESS',
  LOGOUT_USER_FAILURE: 'LOGOUT_USER_FAILURE',

  SEARCH_USER_REQUEST: 'SEARCH_USER_REQUEST',
  SEARCH_USER_SUCCESS: 'SEARCH_USER_SUCCESS',
  SEARCH_USER_FAILURE: 'SEARCH_USER_FAILURE',

  SEARCH_USER_EXIST_REQUEST: 'SEARCH_USER_EXIST_REQUEST',
  SEARCH_USER_EXIST_SUCCESS: 'SEARCH_USER_EXIST_SUCCESS',
  SEARCH_USER_EXIST_FAILURE: 'SEARCH_USER_EXIST_FAILURE',

  GET_EMAIL_REQUEST: 'GET_EMAIL_REQUEST',
  GET_EMAIL_SUCCESS: 'GET_EMAIL_SUCCESS',
  GET_EMAIL_FAILURE: 'GET_EMAIL_FAILURE',

  CHECK_OTP_REQUEST: 'CHECK_OTP_REQUEST',
  CHECK_OTP_SUCCESS: 'CHECK_OTP_SUCCESS',
  CHECK_OTP_FAILURE: 'CHECK_OTP_FAILURE',

  ADD_FRIEND_REQUEST: 'ADD_FRIEND_REQUEST',
  ADD_FRIEND_SUCCESS: 'ADD_FRIEND_SUCCESS',
  ADD_FRIEND_FAILURE: 'ADD_FRIEND_FAILURE',

  UPDATE_PASSWORD_REQUEST: 'UPDATE_PASSWORD_REQUEST',
  UPDATE_PASSWORD_SUCCESS: 'UPDATE_PASSWORD_SUCCESS',
  UPDATE_PASSWORD_FAILURE: 'UPDATE_PASSWORD_FAILURE',

  GET_NEW_TOKEN_REQUEST: 'GET_NEW_TOKEN_REQUEST',
  GET_NEW_TOKEN_SUCCESS: 'GET_NEW_TOKEN_SUCCESS',
  GET_NEW_TOKEN_FAILURE: 'GET_NEW_TOKEN_FAILURE',

  UPDATE_AVATAR_REQUEST: 'UPDATE_AVATAR_REQUEST',
  UPDATE_AVATAR_SUCCESS: 'UPDATE_AVATAR_SUCCESS',
  UPDATE_AVATAR_FAILURE: 'UPDATE_AVATAR_FAILURE',

  UPDATE_PROFILE_REQUEST: 'UPDATE_PROFILE_REQUEST',
  UPDATE_PROFILE_SUCCESS: 'UPDATE_PROFILE_SUCCESS',
  UPDATE_PROFILE_FAILURE: 'UPDATE_PROFILE_FAILURE',

  GET_USER_BY_ID_REQUEST: 'GET_USER_BY_ID_REQUEST',
  GET_USER_BY_ID_SUCCESS: 'GET_USER_BY_ID_SUCCESS',
  GET_USER_BY_ID_FAILURE: 'GET_USER_BY_ID_FAILURE',

  GET_CONVERSATION_BY_ID_REQUEST: 'GET_CONVERSATION_BY_ID_REQUEST',
  GET_CONVERSATION_BY_ID_SUCCESS: 'GET_CONVERSATION_BY_ID_SUCCESS',
  GET_CONVERSATION_BY_ID_FAILURE: 'GET_CONVERSATION_BY_ID_FAILURE',

  GET_FRIEND_BY_ID_REQUEST: 'GET_FRIEND_BY_ID_REQUEST',
  GET_FRIEND_BY_ID_SUCCESS: 'GET_FRIEND_BY_ID_SUCCESS',
  GET_FRIEND_BY_ID_FAILURE: 'GET_FRIEND_BY_ID_FAILURE',

  GET_ALL_FRIEND_REQUEST: 'GET_ALL_FRIEND_REQUEST',
  GET_ALL_FRIEND_SUCCESS: 'GET_ALL_FRIEND_SUCCESS',
  GET_ALL_FRIEND_FAILURE: 'GET_ALL_FRIEND_FAILURE',

  GET_ALL_PEOPLE_REQUEST_REQUEST: 'GET_ALL_PEOPLE_REQUEST_REQUEST',
  GET_ALL_PEOPLE_REQUEST_SUCCESS: 'GET_ALL_PEOPLE_REQUEST_SUCCESS',
  GET_ALL_PEOPLE_REQUEST_FAILURE: 'GET_ALL_PEOPLE_REQUEST_FAILURE',

  SAVE_EMAIL_USER: 'SAVE_EMAIL_USER',
  SAVE_EMAIL_USER_REGISTER: 'SAVE_EMAIL_USER_REGISTER',
  SAVE_INFO_USER: 'SAVE_INFO_USER',
  CLEAR_USER_STATE: 'CLEAR_USER_STATE',
};

export type SignUpStart = {
  email: string;
  password: string;
  displayName: string;
};

export type refeshToken = {
  refeshToken: string;
};

export type Friend = {
  _id: string;
  idUser: string;
};

export type UserData = {
  _id?: string;
  name?: string;
  email?: string;
  password?: string;
  token?: string | null;
  refeshToken?: string | null;
  isOnline?: false;
  // otp?: string;
  gender?: boolean;
  dateOfBirth?: string;
  avatar?: string;
  updatedAt?: string;
  createAt?: string;
  friends?: [];
  myRequest?: [];
  peopleRequest?: [];
};

export type UserState = {
  isLoading?: Boolean;
  userCurrent?: any;
  error?: string;
  result?: Message;
  errorResetPass?: Message;
};

export type Message = {
  message: string;
};

export type Email = {
  email?: string;
};
export type EmailPass = {
  email: string;
  newPassword?: string;
};
export type OTP = {
  email?: string;
  otp: string;
};

export type Tokens = {
  accessToken: string;
  refeshToken: string;
};

export type phone = {
  phone: string;
};

export type FriendItem = {
  _id: string;
  idUser: {
    _id: string;
    name: string;
    avatar: string;
  };
  idConversation?: Object;
  type: string;
};

export type GroupItem = {
  _id: string;
  name: string;
  avatar: string;
  leaderId: string;
  members: User[];
  idConversation?: string;
  type: string;
};

// export type listFriend = [Friend];

export type listFriend = {
  _id: string;
  idUser: {
    _id: string;
    name: string;
    avatar: string;
  };
  idConversation?: string;
};
