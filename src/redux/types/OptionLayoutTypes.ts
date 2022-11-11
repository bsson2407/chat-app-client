export const OptionLayoutTypes = {
  SHOW_CHAT: 'SHOW_CHAT',
  SHOW_FRIENDS: 'SHOW_FRIENDS',
  SHOW_CONVERSATION: 'SHOW_CONVERSATION',
  SHOW_OTHER_PROFILE: 'SHOW_OTHER_PROFILE',
  SHOW_GROUP_PROFILE: 'SHOW_GROUP_PROFILE',
  HIDE_MODAL: 'HIDE_MODAL',
  OFF_SHOW: 'OFF_SHOW',
};

export type OptionLayout = {
  showChat: boolean;
  showFriends: boolean;
  showOtherProfile: boolean;
  showGroupProfile: boolean;
  showConversation: boolean;
};
