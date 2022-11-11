import { Conversation, IMessage } from '../types/ChatTypes';
import axiosClient from './AxiosClient';

export const getAllMessageByConversation = (id: string): Promise<IMessage[]> =>
  axiosClient.get(`/chat/allmessage/${id}`);
export const getAllConversationByUser = (id: string): Promise<Conversation[]> =>
  axiosClient.get(`/chat/conver/${id}`);

export const postAddMemberToGroup = (data: any): Promise<Conversation> =>
  axiosClient.post(`/group/addmembers`, data);
export const postKickMemberOutGroup = (data: any): Promise<Conversation> =>
  axiosClient.post(`/group/delmembers`, data);
export const postLeaveGroup = (data: any): Promise<Conversation> =>
  axiosClient.post(`/group/leave`, data);
export const postCreateGroup = (data: any): Promise<Conversation> =>
  axiosClient.post(`/group/create`, data);

export const postChangeAvatar = (data: any): Promise<Conversation> =>
  axiosClient.post(`/group/changeavatar`, data);
export const postChangeName = (data: any): Promise<Conversation> =>
  axiosClient.post(`/group/changename`, data);
export const postDeleteGroup = (data: any): Promise<Conversation> =>
  axiosClient.post(`/group/delete`, data);
export const postChangeLeader = (data: any): Promise<Conversation> =>
  axiosClient.post(`/group/changeleader`, data);
