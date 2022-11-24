import { FriendTypes, IsFriend } from '../types/FriendTypes';
import { Actions } from '../types/CommonTypes';

const initialState: IsFriend = {
  isFriend: false,
  isStranger: false,
  isMyRequest: false,
  isPeopleRequest: false,
  isMe: false,
};

export const FriendReducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case FriendTypes.IS_FRIEND: {
      return {
        isFriend: true,
        isStranger: false,
        isMyRequest: false,
        isPeopleRequest: false,
        isMe: false,
      };
    }

    case FriendTypes.IS_ME: {
      return {
        isFriend: false,
        isStranger: false,
        isMyRequest: false,
        isPeopleRequest: false,
        isMe: true,
      };
    }

    case FriendTypes.IS_MY_REQUEST: {
      return {
        isFriend: false,
        isStranger: false,
        isMyRequest: true,
        isPeopleRequest: false,
        isMe: false,
      };
    }

    case FriendTypes.IS_PEOPLE_REQUEST: {
      return {
        isFriend: false,
        isStranger: false,
        isMyRequest: false,
        isPeopleRequest: true,
        isMe: false,
      };
    }
    case FriendTypes.IS_STRANGER: {
      return {
        isFriend: false,
        isStranger: true,
        isMyRequest: false,
        isPeopleRequest: false,
        isMe: false,
      };
    }

    default:
      return state;
  }
};
