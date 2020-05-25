import { ActionTypes } from '../actions';

const initialState = {
  username: '',
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.AUTH_USER:
      return { ...state, ...action.payload };
    case ActionTypes.DEAUTH_USER:
      return initialState;
    default:
      return state;
  }
};
export default UserReducer;
