// import { Email } from '../types/UserTypes';
import { Friend, refeshToken, UserData } from '../types/UserTypes';
import axiosClient from './AxiosClient';

interface ListResponse<T> {
  data: T[];
}

interface User {
  name: string;
  email: string;
  password: string;
}

interface Email {
  email: string;
}

interface EmailPass {
  email: string;
  newPassword?: string;
}

interface OTP {
  otp: string;
  email: string;
}

interface resultGetEmail {
  message: string;
}
export const getAllUsers = (): Promise<ListResponse<User>> =>
  axiosClient.get('/user');
export const login = (user: User): Promise<ListResponse<User>> =>
  axiosClient.post('/user/login', user);
export const register = (user: User): Promise<ListResponse<User>> =>
  axiosClient.post('/user/register', user);

export const getUserById = (id: string): Promise<ListResponse<User>> =>
  axiosClient.get(`/user/me/${id}`);
export const getConversationById = (id: string): Promise<ListResponse<User>> =>
  axiosClient.get(`/user/conver/${id}`);
export const updateAvatar = (data: any): Promise<resultGetEmail> =>
  axiosClient.patch('/user/avatar', data);
export const searchUser = (data: any): Promise<User> =>
  axiosClient.post('/user/search', data);
export const searchUserExist = (data: any): Promise<User> =>
  axiosClient.post('/user/searchExist', data);
export const addFriend = (data: any): Promise<User> =>
  axiosClient.post('/user/invite', data);
export const updateProfile = (data: any): Promise<User> =>
  axiosClient.post('/user/update', data);
export const getEmail = (email: Email): Promise<resultGetEmail> =>
  axiosClient.post('/user/sendmail', email);
export const checkOtp = (otp: OTP): Promise<resultGetEmail> =>
  axiosClient.post('/user/checkotp', otp);
export const updatePassword = (data: EmailPass): Promise<resultGetEmail> =>
  axiosClient.post('/user/updatepassword', data);
export const getNewToken = (
  refeshToken: refeshToken
): Promise<resultGetEmail> =>
  axiosClient.post('/user/getnewtoken', refeshToken);

export const getAllPeopleRequest = (id: string): Promise<Friend> =>
  axiosClient.get(`/user/getAllPeopleRequest/${id}`);
// export const addFriendRequest = (
//   userToId: string,
//   userFromId: string
// ): Promise<Friend> => axiosClient.post(`/user/invite/${userToId}`, userFromId);
export const getAllFriend = (id: string): Promise<Friend> =>
  axiosClient.get(`/user/getAllFriend/${id}`);
