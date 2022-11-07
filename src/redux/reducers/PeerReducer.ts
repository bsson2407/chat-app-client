import { ActionTypes } from '../types/ActionTypes';
import { Actions } from '../types/CommonTypes';
const initialState = null;

const peerReducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case ActionTypes.PEER:
      return action.payload;
    default:
      return state;
  }
};

export default peerReducer;
