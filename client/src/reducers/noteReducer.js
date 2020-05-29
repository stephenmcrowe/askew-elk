import { ActionTypes } from '../actions';

const initialState = {
  all: [],
};

const NoteReducer = (state = initialState, action) => {
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
