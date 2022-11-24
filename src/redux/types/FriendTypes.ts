export const FriendTypes = {
  IS_STRANGER: 'IS_STRANGER',
  IS_FRIEND: 'IS_FRIEND',
  IS_MY_REQUEST: 'REQUEST',
  IS_PEOPLE_REQUEST: 'IS_PEOPLE_REQUEST',
  IS_ME: 'IS_ME',
};

export type IsFriend = {
  isFriend: boolean;
  isStranger: boolean;
  isMyRequest: boolean;
  isPeopleRequest: boolean;
  isMe: boolean;
};
