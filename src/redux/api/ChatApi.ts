import { Conversation, IMessage } from '../types/ChatTypes';
import axiosClient from './AxiosClient';

export const getAllMessageByConversation = (id: string): Promise<IMessage[]> =>
  axiosClient.get(`/chat/allmessage/${id}`);
export const getAllConversationByUser = (id: string): Promise<Conversation[]> =>
  axiosClient.get(`/chat/conver/${id}`);
export const sendMessage = (data: any): Promise<IMessage> =>
  axiosClient.post(`/chat/message`, data);

export const sendImage = (data: any): Promise<IMessage> =>
  axiosClient.post(`/chat/images`, data);
export const sendVideo = (data: any): Promise<IMessage> =>
  axiosClient.post(`/chat/video`, data);
export const sendFile = (data: any): Promise<IMessage> =>
  axiosClient.post(`/chat/file`, data);
export const deleteOnlyMe = (data: any): Promise<IMessage> =>
  axiosClient.post(`/chat/delete`, data);
export const deleteAllMe = (data: any): Promise<IMessage[]> =>
  axiosClient.post(`/chat/deleteAll`, data);
