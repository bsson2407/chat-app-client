export const FriendTypes = {
  IS_STRANGER: 'IS_STRANGER',
  IS_FRIEND: 'IS_FRIEND',
  REQUEST: 'REQUEST',
  IS_PEOPLE_REQUEST: 'IS_PEOPLE_REQUEST',
  IS_ME: 'IS_ME',
};

export type IsFriend = {
  isFriend: boolean;
  isStranger: boolean;
  requested: boolean;
  isPeopleRequest: boolean;
  isMe: boolean;
};
