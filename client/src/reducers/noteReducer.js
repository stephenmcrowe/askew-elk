import { ActionTypes } from '../actions';
import { noteState } from './mockStates';

const initialState = {
  all: [],
  current: {},
};

const NoteReducer = (state = noteState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_NOTES:
      return { ...state, all: action.payload };
    case ActionTypes.FETCH_NOTE:
      return { ...state, current: action.payload };
    case ActionTypes.RESET_NOTE:
      return initialState;
    default:
      return state;
  }
};
export default NoteReducer;
