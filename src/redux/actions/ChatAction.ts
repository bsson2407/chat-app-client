// import { Socket } from 'socket.io-client';
import { getCurrentSocket } from '../reducers/SocketReducer';
import { ChatTypes, Conversation, IMessage } from '../types/ChatTypes';
import { FriendItem, GroupItem, Message, UserTypes } from '../types/UserTypes';

// --------------- GET ALL MESSAGE BY CONVERSATION
export const getAllMessageByConversationRequest = (idConversation: string) => {
  console.log(idConversation);
  return {
    type: ChatTypes.GET_ALL_MESSAGE_BY_CONVERSATION_REQUEST,
    payload: idConversation,
  };
};
export const getAllMessageByConversationSuccess = (data: IMessage[]) => {
  console.log(data);
  return {
    type: ChatTypes.GET_ALL_MESSAGE_BY_CONVERSATION_SUCCESS,
    payload: data,
  };
};
export const getAllMessageByConversationFailure = (error: Message) => {
  return {
    type: ChatTypes.GET_ALL_MESSAGE_BY_CONVERSATION_FAILURE,
    payload: error,
  };
};

export const pushNewMesssgeToListMessage = (message: IMessage) => {
  return {
    type: ChatTypes.PUSH_NEW_MESSAGE_TO_LIST_MESSAGE,
    payload: message,
  };
};

export const recallAMesssgeToListMessage = (message: IMessage) => {
  return {
    type: ChatTypes.RECALL_A_MESSAGE_TO_LIST_MESSAGE,
    payload: message,
  };
};

// --------------- DELETE MESSAGE ONLY ME
export const deleteMessageOnlyMeRequest = (data: any) => {
  console.log(data);
  return {
    type: ChatTypes.DELETE_MESSAGE_ONLY_ME_REQUEST,
    payload: data,
  };
};
export const deleteMessageOnlyMeSuccess = (data: IMessage) => {
  console.log(data);
  return {
    type: ChatTypes.DELETE_MESSAGE_ONLY_ME_SUCCESS,
    payload: data,
  };
};
export const deleteMessageOnlyMeFailure = (error: Message) => {
  return {
    type: ChatTypes.DELETE_MESSAGE_ONLY_ME_FAILURE,
    payload: error,
  };
};

// --------------- DELETE MESSAGE ALL ME
export const deleteMessageAllMeRequest = (data: any) => {
  return {
    type: ChatTypes.DELETE_MESSAGE_ALL_ME_REQUEST,
    payload: data,
  };
};
export const deleteMessageAllMeSuccess = (data: IMessage[]) => {
  console.log(data);
  return {
    type: ChatTypes.DELETE_MESSAGE_ALL_ME_SUCCESS,
    payload: data,
  };
};
export const deleteMessageAllMeFailure = (error: Message) => {
  return {
    type: ChatTypes.DELETE_MESSAGE_ALL_ME_FAILURE,
    payload: error,
  };
};

// --------------- GET ALL CONVERSATION BY USER
export const getAllConversationByUserRequest = (id: string) => {
  return {
    type: ChatTypes.GET_ALL_CONVERSATION_BY_USER_REQUEST,
    payload: id,
  };
};
export const getAllConversationByUserSuccess = (data: Conversation[]) => {
  // console.log(data);
  return {
    type: ChatTypes.GET_ALL_CONVERSATION_BY_USER_SUCCESS,
    payload: data,
  };
};
export const getAllConversationByUserFailure = (error: Message) => {
  return {
    type: ChatTypes.GET_ALL_CONVERSATION_BY_USER_FAILURE,
    payload: error,
  };
};

// -------------- UPDATE AVATAR
export const sendImagesRequest = (data: any) => {
  console.log(data);
  return {
    type: ChatTypes.SEND_IMAGES_REQUEST,
    payload: data,
  };
};
export const sendImagesSuccess = (data: IMessage) => {
  getCurrentSocket().emit('send_message', data);
  return {
    type: ChatTypes.SEND_IMAGES_SUCCESS,
    payload: data,
  };
};
export const sendImagesFailure = (message: Message) => {
  return {
    type: ChatTypes.SEND_IMAGES_FAILURE,
    payload: message,
  };
};

// -------------- UPDATE AVATAR
export const sendVideoRequest = (data: any) => {
  console.log(data);
  return {
    type: ChatTypes.SEND_VIDEO_REQUEST,
    payload: data,
  };
};
export const sendVideoSuccess = (data: IMessage) => {
  getCurrentSocket().emit('send_message', data);
  return {
    type: ChatTypes.SEND_VIDEO_SUCCESS,
    payload: data,
  };
};
export const sendVideoFailure = (message: Message) => {
  return {
    type: ChatTypes.SEND_VIDEO_FAILURE,
    payload: message,
  };
};

// -------------- SEND FILE
export const sendFileRequest = (data: any) => {
  console.log(data);
  return {
    type: ChatTypes.SEND_FILE_REQUEST,
    payload: data,
  };
};
export const sendFileSuccess = (data: IMessage) => {
  getCurrentSocket().emit('send_message', data);
  return {
    type: ChatTypes.SEND_FILE_SUCCESS,
    payload: data,
  };
};
export const sendFileFailure = (message: Message) => {
  return {
    type: ChatTypes.SEND_FILE_FAILURE,
    payload: message,
  };
};

// --------------- SAVE INFO USER CURRENT CHATTING
export const saveInfoChatWith = (friend: FriendItem | GroupItem) => {
  return {
    type: ChatTypes.SAVE_INFO_CHAT_WITH,
    payload: friend,
  };
};

// --------------- SAVE INFO USER CURRENT CHATTING
export const saveInfoChatGroup = (group: GroupItem) => {
  console.log(group);
  return {
    type: ChatTypes.SAVE_INFO_CHAT_GROUP,
    payload: group,
  };
};

// -------------- GET USER BY ID
export const getConversationByIdRequest = (id: string) => {
  console.log(id);
  return {
    type: UserTypes.GET_CONVERSATION_BY_ID_REQUEST,
    payload: id,
  };
};
export const getConversationByIdSuccess = (data: FriendItem | GroupItem) => {
  console.log(data);
  return {
    type: UserTypes.GET_CONVERSATION_BY_ID_SUCCESS,
    payload: data,
  };
};
export const getConversationByIdFailure = (message: Message) => {
  return {
    type: UserTypes.GET_CONVERSATION_BY_ID_FAILURE,
    payload: message,
  };
};

// -------------- ADD MEMBER TO GROUP
export const addMemberToGroupRequest = (data: any) => {
  return {
    type: ChatTypes.ADD_MEMBER_TO_GROUP_REQUEST,
    payload: data,
  };
};
export const addMemberToGroupSuccess = (data: FriendItem | GroupItem) => {
  data.idConversation = data._id;
  return {
    type: ChatTypes.ADD_MEMBER_TO_GROUP_SUCCESS,
    payload: data,
  };
};
export const addMemberToGroupFailure = (message: Message) => {
  return {
    type: ChatTypes.ADD_MEMBER_TO_GROUP_FAILURE,
    payload: message,
  };
};

// -------------- KICK MEMBER OUT GROUP
export const kickMemberOutGroupRequest = (data: any) => {
  console.log(data);
  return {
    type: ChatTypes.KICK_MEMBER_OUT_GROUP_REQUEST,
    payload: data,
  };
};
export const kickMemberOutGroupSuccess = (data: FriendItem | GroupItem) => {
  console.log(data);
  data.idConversation = data._id;
  return {
    type: ChatTypes.KICK_MEMBER_OUT_GROUP_SUCCESS,
    payload: data,
  };
};
export const kickMemberOutGroupFailure = (message: Message) => {
  return {
    type: ChatTypes.KICK_MEMBER_OUT_GROUP_FAILURE,
    payload: message,
  };
};

// -------------- LEAVE GROUP
export const leaveGroupRequest = (data: any) => {
  return {
    type: ChatTypes.LEAVE_GROUP_REQUEST,
    payload: data,
  };
};
export const leaveGroupSuccess = (data: FriendItem | GroupItem) => {
  return {
    type: ChatTypes.LEAVE_GROUP_SUCCESS,
    payload: data,
  };
};
export const leaveGroupFailure = (message: Message) => {
  return {
    type: ChatTypes.LEAVE_GROUP_FAILURE,
    payload: message,
  };
};
