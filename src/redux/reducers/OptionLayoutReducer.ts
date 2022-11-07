import { OptionLayout, OptionLayoutTypes } from '../types/OptionLayoutTypes';
import { Actions } from '../types/CommonTypes';

const initialState: OptionLayout = {
  showChat: true,
  showFriends: false,
  showOtherProfile: false,
  showGroupProfile: false,
};

export const OptionLayoutReducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case OptionLayoutTypes.SHOW_CHAT: {
      return {
        ...state,
        showChat: true,
        showFriends: false,
      };
    }

    case OptionLayoutTypes.SHOW_FRIENDS: {
      return {
        ...state,
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
    default:
      return state;
  }
};
