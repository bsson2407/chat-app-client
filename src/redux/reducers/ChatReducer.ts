import { ChatTypes, Conversation, IMessage } from '../types/ChatTypes';
import { FriendItem, GroupItem, UserTypes } from '../types/UserTypes';
import { Actions } from '../types/CommonTypes';

interface ChatState {
  isloading: boolean;
  error: any;
  chatWith: FriendItem | GroupItem | null;
  listMessage: IMessage[];
  message: IMessage | null;
  listConversation: Conversation[];
  // chatGroup: GroupItem | null;
}

const initialState: ChatState = {
  isloading: false,
  error: null,
  chatWith: null,
  // chatGroup: null,
  listMessage: [],
  listConversation: [],
  message: null,
};

export const chatReducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    // -------------------- GET ALL MESSAGE BY CONVERSATION
    case ChatTypes.GET_ALL_MESSAGE_BY_CONVERSATION_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case ChatTypes.GET_ALL_MESSAGE_BY_CONVERSATION_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        listMessage: action.payload,
      };
    }
    case ChatTypes.GET_ALL_MESSAGE_BY_CONVERSATION_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }
    // -------------------- PUSH NEW MESSAGE TO LIST MESSAGE
    case ChatTypes.PUSH_NEW_CONVERSATION_TO_LIST_CONVERSATION: {
      const newListConversation = [...state.listConversation];
      newListConversation.unshift(action.payload);

      return {
        ...state,
        listConversation: newListConversation,
      };
    }

    // -------------------- PUSH NEW MESSAGE TO LIST MESSAGE
    case ChatTypes.PUSH_NEW_MESSAGE_TO_LIST_MESSAGE: {
      const newListMessage = [...state.listMessage];
      newListMessage.push(action.payload);
      return {
        ...state,
        listMessage: newListMessage,
      };
    }

    // -------------------- RECALL A MESSAGE TO LIST MESSAGE
    case ChatTypes.RECALL_A_MESSAGE_TO_LIST_MESSAGE: {
      const message = action.payload;
      const newListMessage = [...state.listMessage];
      const updateListMessage = newListMessage.map((mess) => {
        return mess._id === message._id ? message : mess;
      });
      return {
        ...state,
        listMessage: updateListMessage,
      };
    }

    //-------------- DELETE MESSAGE ONLY ME
    case ChatTypes.DELETE_MESSAGE_ONLY_ME_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case ChatTypes.DELETE_MESSAGE_ONLY_ME_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        message: action.payload,
      };
    }
    case ChatTypes.DELETE_MESSAGE_ONLY_ME_FAILURE: {
      return {
        ...state,
        isLoading: true,
      };
    }

    //-------------- DELETE MESSAGE ONLY ME
    case ChatTypes.DELETE_MESSAGE_ALL_ME_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case ChatTypes.DELETE_MESSAGE_ALL_ME_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        listMessage: action.payload,
      };
    }
    case ChatTypes.DELETE_MESSAGE_ALL_ME_FAILURE: {
      return {
        ...state,
        isLoading: true,
      };
    }

    // -------------------- GET ALL MESSAGE BY CONVERSATION
    case ChatTypes.GET_ALL_CONVERSATION_BY_USER_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case ChatTypes.GET_ALL_CONVERSATION_BY_USER_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        listConversation: action.payload,
      };
    }
    case ChatTypes.GET_ALL_CONVERSATION_BY_USER_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }

    //-------------- SEND IMAGE REQUEST
    case ChatTypes.SEND_IMAGES_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case ChatTypes.SEND_IMAGES_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        message: action.payload,
      };
    }
    case ChatTypes.SEND_IMAGES_FAILURE: {
      return {
        ...state,
        isLoading: true,
      };
    }

    //-------------- SEND VIDEO REQUEST
    case ChatTypes.SEND_MESSAGES_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case ChatTypes.SEND_MESSAGES_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        message: action.payload,
      };
    }
    case ChatTypes.SEND_MESSAGES_FAILURE: {
      alert('file gửi không lớn hơn 10MB');

      return {
        ...state,
        error: action.payload,
      };
    }

    //-------------- SEND FILE REQUEST
    case ChatTypes.SEND_FILE_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case ChatTypes.SEND_FILE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        message: action.payload,
      };
    }
    case ChatTypes.SEND_FILE_FAILURE: {
      alert('file gửi không lớn hơn 10MB');
      return {
        ...state,
        error: action.payload,
      };
    }

    // -------------------- SAVE INFO CHAT WITH
    case ChatTypes.SAVE_INFO_CHAT_WITH: {
      return {
        ...state,
        chatWith: action.payload,
      };
    }

    //-------------- UPDATE AVATAR REQUEST
    case UserTypes.GET_CONVERSATION_BY_ID_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case UserTypes.GET_CONVERSATION_BY_ID_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        chatWith: action.payload,
      };
    }
    case UserTypes.GET_CONVERSATION_BY_ID_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }

    //-------------- ADD MEMBER TO GROUP
    case ChatTypes.ADD_MEMBER_TO_GROUP_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case ChatTypes.ADD_MEMBER_TO_GROUP_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        chatWith: action.payload,
      };
    }
    case ChatTypes.ADD_MEMBER_TO_GROUP_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }

    //-------------- CHANGE LEADER TO GROUP
    case ChatTypes.CHANGE_LEADER_GROUP_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case ChatTypes.CHANGE_LEADER_GROUP_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        chatWith: action.payload,
      };
    }
    case ChatTypes.CHANGE_LEADER_GROUP_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }

    //-------------- KICK MEMBER OUT GROUP
    case ChatTypes.KICK_MEMBER_OUT_GROUP_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case ChatTypes.KICK_MEMBER_OUT_GROUP_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        chatWith: action.payload,
      };
    }
    case ChatTypes.KICK_MEMBER_OUT_GROUP_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }

    //-------------- LEAVE GROUP
    case ChatTypes.LEAVE_GROUP_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case ChatTypes.LEAVE_GROUP_SUCCESS: {
      const newListConversation = [...state.listConversation];
      const deleteGroup: GroupItem = action.payload;
      const index = newListConversation.findIndex((conver: GroupItem) => {
        return conver._id === deleteGroup.idConversation;
      });
      newListConversation.splice(index, 1);
      // newListConversation.unshift(conver);

      return {
        ...state,
        isLoading: false,
        listConversation: newListConversation,
      };
    }
    case ChatTypes.LEAVE_GROUP_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }

    //-------------- DELETE GROUP
    case ChatTypes.DELETE_GROUP_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case ChatTypes.DELETE_GROUP_SUCCESS: {
      // getCurrentSocket().
      return {
        ...state,
        isLoading: false,
        // listConversation: newListConversation,
      };
    }
    case ChatTypes.DELETE_GROUP_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }

    //-------------- CREATE GROUP
    case ChatTypes.CREATE_GROUP_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case ChatTypes.CREATE_GROUP_SUCCESS: {
      // const newListConversation = [...state.listConversation];
      // newListConversation.unshift(action.payload);

      return {
        ...state,
        // listConversation: newListConversation,
      };
    }
    case ChatTypes.CREATE_GROUP_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }

    //-------------- CHANGE_NAME GROUP
    case ChatTypes.CHANGE_NAME_GROUP_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case ChatTypes.CHANGE_NAME_GROUP_SUCCESS: {
      return {
        ...state,
        chatWith: action.payload,
      };
    }
    case ChatTypes.CHANGE_NAME_GROUP_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }

    //-------------- CHANGE_AVATAR GROUP
    case ChatTypes.CHANGE_AVATAR_GROUP_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case ChatTypes.CHANGE_AVATAR_GROUP_SUCCESS: {
      return {
        ...state,
        chatWith: action.payload,
      };
    }
    case ChatTypes.CHANGE_AVATAR_GROUP_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};
