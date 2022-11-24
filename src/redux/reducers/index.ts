import { combineReducers } from 'redux';
import callReducer from './CallReducer';
import { chatReducer } from './ChatReducer';
import { FriendReducer } from './FriendReducer';
import { OptionLayoutReducer } from './OptionLayoutReducer';
import peerReducer from './PeerReducer';
import { createSocket } from './SocketReducer';
import { UserReducer } from './UserReducer';

export const reducers: any = combineReducers({
  optionLayout: OptionLayoutReducer,
  user: UserReducer,
  chat: chatReducer,
  socket: createSocket,
  peer: peerReducer,
  call: callReducer,
  friend: FriendReducer,
});

export type RootState = ReturnType<typeof reducers>;
