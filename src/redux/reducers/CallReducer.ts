import { Actions } from '../types/CommonTypes';
import { ActionTypes } from '../types/ActionTypes';
const initialState = null;
const callReducer = (state = initialState, action: Actions) => {
  switch (action.type) {
    case ActionTypes.CALL: {
      return action.payload;
    }
    default:
      return state;
  }
};

export default callReducer;
