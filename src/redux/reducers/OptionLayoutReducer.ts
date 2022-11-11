import { OptionLayout, OptionLayoutTypes } from '../types/OptionLayoutTypes';
import { Actions } from '../types/CommonTypes';

const initialState: OptionLayout = {
  showChat: false,
  showFriends: false,
  showOtherProfile: false,
  showGroupProfile: false,
  showConversation: true,
};

export const OptionLayoutReducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case OptionLayoutTypes.SHOW_CHAT: {
      return {
        showOtherProfile: false,
        showGroupProfile: false,
        showChat: true,
        showFriends: false,
        showConversation: true,
      };
    }

    case OptionLayoutTypes.SHOW_FRIENDS: {
      return {
        showGroupProfile: false,
        showConversation: false,
        showChat: false,
        showFriends: true,
        showOtherProfile: false,
      };
    }

    case OptionLayoutTypes.SHOW_OTHER_PROFILE: {
      return {
        ...state,
        showOtherProfile: action.payload,
      };
    }

    case OptionLayoutTypes.SHOW_GROUP_PROFILE: {
      return {
        ...state,
        showGroupProfile: action.payload,
      };
    }

    case OptionLayoutTypes.HIDE_MODAL: {
      return {
        ...state,
        // showOtherProfile: action.payload,
      };
    }

    case OptionLayoutTypes.OFF_SHOW:
      return {
        showGroupProfile: false,
        showConversation: true,
        showChat: false,
        showFriends: false,
        showOtherProfile: false,
      };
    default:
      return state;
  }
};
