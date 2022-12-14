export const ChatTypes = {
  GET_ALL_MESSAGE_BY_CONVERSATION_REQUEST:
    'GET_ALL_MESSAGE_BY_CONVERSATION_REQUEST',
  GET_ALL_MESSAGE_BY_CONVERSATION_SUCCESS:
    'GET_ALL_MESSAGE_BY_CONVERSATION_SUCCESS',
  GET_ALL_MESSAGE_BY_CONVERSATION_FAILURE:
    'GET_ALL_MESSAGE_BY_CONVERSATION_FAILURE',

  GET_ALL_CONVERSATION_BY_USER_REQUEST: 'GET_ALL_CONVERSATION_BY_USER_REQUEST',
  GET_ALL_CONVERSATION_BY_USER_SUCCESS: 'GET_ALL_CONVERSATION_BY_USER_SUCCESS',
  GET_ALL_CONVERSATION_BY_USER_FAILURE: 'GET_ALL_CONVERSATION_BY_USER_FAILURE',

  SEND_MESSAGES_REQUEST: 'SEND_MESSAGES_REQUEST',
  SEND_MESSAGES_SUCCESS: 'SEND_MESSAGES_SUCCESS',
  SEND_MESSAGES_FAILURE: 'SEND_MESSAGES_FAILURE',

  SEND_IMAGES_REQUEST: 'SEND_IMAGES_REQUEST',
  SEND_IMAGES_SUCCESS: 'SEND_IMAGES_SUCCESS',
  SEND_IMAGES_FAILURE: 'SEND_IMAGES_FAILURE',

  SEND_FILE_REQUEST: 'SEND_FILE_REQUEST',
  SEND_FILE_SUCCESS: 'SEND_FILE_SUCCESS',
  SEND_FILE_FAILURE: 'SEND_FILE_FAILURE',

  CREATE_GROUP_REQUEST: 'CREATE_GROUP_REQUEST',
  CREATE_GROUP_SUCCESS: 'CREATE_GROUP_SUCCESS',
  CREATE_GROUP_FAILURE: 'CREATE_GROUP_FAILURE',

  DELETE_GROUP_REQUEST: 'DELETE_GROUP_REQUEST',
  DELETE_GROUP_SUCCESS: 'DELETE_GROUP_SUCCESS',
  DELETE_GROUP_FAILURE: 'DELETE_GROUP_FAILURE',

  CHANGE_NAME_GROUP_REQUEST: 'CHANGE_NAME_GROUP_REQUEST',
  CHANGE_NAME_GROUP_SUCCESS: 'CHANGE_NAME_GROUP_SUCCESS',
  CHANGE_NAME_GROUP_FAILURE: 'CHANGE_NAME_GROUP_FAILURE',

  CHANGE_AVATAR_GROUP_REQUEST: 'CHANGE_AVATAR_GROUP_REQUEST',
  CHANGE_AVATAR_GROUP_SUCCESS: 'CHANGE_AVATAR_GROUP_SUCCESS',
  CHANGE_AVATAR_GROUP_FAILURE: 'CHANGE_AVATAR_GROUP_FAILURE',

  ADD_MEMBER_TO_GROUP_REQUEST: 'ADD_MEMBER_TO_GROUP_REQUEST',
  ADD_MEMBER_TO_GROUP_SUCCESS: 'ADD_MEMBER_TO_GROUP_SUCCESS',
  ADD_MEMBER_TO_GROUP_FAILURE: 'ADD_MEMBER_TO_GROUP_FAILURE',

  KICK_MEMBER_OUT_GROUP_REQUEST: 'KICK_MEMBER_OUT_GROUP_REQUEST',
  KICK_MEMBER_OUT_GROUP_SUCCESS: 'KICK_MEMBER_OUT_GROUP_SUCCESS',
  KICK_MEMBER_OUT_GROUP_FAILURE: 'KICK_MEMBER_OUT_GROUP_FAILURE',

  LEAVE_GROUP_REQUEST: 'LEAVE_GROUP_REQUEST',
  LEAVE_GROUP_SUCCESS: 'LEAVE_GROUP_SUCCESS',
  LEAVE_GROUP_FAILURE: 'LEAVE_GROUP_FAILURE',

  CHANGE_LEADER_GROUP_REQUEST: 'CHANGE_LEADER_GROUP_REQUEST',
  CHANGE_LEADER_GROUP_SUCCESS: 'CHANGE_LEADER_GROUP_SUCCESS',
  CHANGE_LEADER_GROUP_FAILURE: 'CHANGE_LEADER_GROUP_FAILURE',

  DELETE_MESSAGE_ONLY_ME_REQUEST: 'DELETE_MESSAGE_ONLY_ME_REQUEST',
  DELETE_MESSAGE_ONLY_ME_SUCCESS: 'DELETE_MESSAGE_ONLY_ME_SUCCESS',
  DELETE_MESSAGE_ONLY_ME_FAILURE: 'DELETE_MESSAGE_ONLY_ME_FAILURE',

  DELETE_MESSAGE_ALL_ME_REQUEST: 'DELETE_MESSAGE_ALL_ME_REQUEST',
  DELETE_MESSAGE_ALL_ME_SUCCESS: 'DELETE_MESSAGE_ALL_ME_SUCCESS',
  DELETE_MESSAGE_ALL_ME_FAILURE: 'DELETE_MESSAGE_ALL_ME_FAILURE',

  PUSH_NEW_MESSAGE_TO_LIST_MESSAGE: 'PUSH_NEW_MESSAGE_TO_LIST_MESSAGE',
  PUSH_NEW_CONVERSATION_TO_LIST_CONVERSATION:
    'PUSH_NEW_CONVERSATION_TO_LIST_CONVERSATION',
  RECALL_A_MESSAGE_TO_LIST_MESSAGE: 'RECALL_A_MESSAGE_TO_LIST_MESSAGE',
  SAVE_INFO_CHAT_WITH: 'SAVE_INFO_CHAT_WITH',
  SAVE_INFO_CHAT_GROUP: 'SAVE_INFO_CHAT_GROUP',
};

export interface IMessage {
  _id: string;
  idConversation: string;
  sender: string;
  message: string;
  seen: [string];
  type?: string;
  urlImage: [string];
  urlLink: string;
  deleteBy?: [];

  createdAt: string;
}
export interface User {
  _id: string;
  idUser: {
    _id: string;
    name: string;
    avatar: string;
  };
}

export interface Group {
  _id: string;
  name: string;
  avatar: string;
  leaderId: string;
  members: User[];
}
export interface Conversation {
  _id: string;
  type: string;
  lastMessage: IMessage;
  members: User[];
  name: string;
  avatar: string;
  leaderId: string;
}

// export interface Chat {
//   _id: string;
//   type: string;
//   lastMessage: IMessage;
//   members: User[];
//   name: string;
//   avatar: string;
//   leaderId: string;
// }
