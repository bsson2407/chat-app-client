export const OptionLayoutTypes = {
  SHOW_CHAT: 'SHOW_CHAT',
  SHOW_FRIENDS: 'SHOW_FRIENDS',
  SHOW_OTHER_PROFILE: 'SHOW_OTHER_PROFILE',
  SHOW_GROUP_PROFILE: 'SHOW_GROUP_PROFILE',
  HIDE_MODAL: 'HIDE_MODAL',
};

export type OptionLayout = {
  showChat: boolean;
  showFriends: boolean;
  showOtherProfile: boolean;
  showGroupProfile: boolean;
};
