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
  axiosClient.post(`/group/leavegroup`, data);
