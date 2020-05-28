import { ActionTypes } from '../actions';

const ErrorReducer = (state = { error: {} }, error) => {
  switch (error.type) {
    case ActionTypes.ERROR_SET:
      return {
        ...state,
        error,
      };
    default:
      return state;
  }
};

export default ErrorReducer;
