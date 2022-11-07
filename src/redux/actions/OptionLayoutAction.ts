import { OptionLayoutTypes } from '../types/OptionLayoutTypes';

export const showChat = () => {
  return {
    type: OptionLayoutTypes.SHOW_CHAT,
  };
};

export const hideModal = (modal: any) => {
  return {
    type: OptionLayoutTypes.HIDE_MODAL,
  };
};

export const showFriends = () => {
  return {
    type: OptionLayoutTypes.SHOW_FRIENDS,
  };
};

export const showOptionOtherProfile = (value: boolean) => {
  return {
    type: OptionLayoutTypes.SHOW_OTHER_PROFILE,
    payload: value,
  };
};

export const showOptionGroupProfile = (value: boolean) => {
  return {
    type: OptionLayoutTypes.SHOW_GROUP_PROFILE,
    payload: value,
  };
};
