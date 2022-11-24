import { FriendTypes } from '../types/FriendTypes';

export const isMeAction = () => {
  return {
    type: FriendTypes.IS_ME,
  };
};

export const isFriendAction = () => {
  return {
    type: FriendTypes.IS_FRIEND,
  };
};

export const isMyRequestAction = () => {
  return {
    type: FriendTypes.IS_MY_REQUEST,
  };
};

export const isPeopleRequestAction = () => {
  return {
    type: FriendTypes.IS_PEOPLE_REQUEST,
  };
};

export const isStrangerAction = () => {
  return {
    type: FriendTypes.IS_STRANGER,
  };
};
