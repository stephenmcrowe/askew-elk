import { ActionTypes } from '../actions';

const ErrorReducer = (state = { type: '', message: '' }, error) => {
  switch (error.type) {
    case ActionTypes.ERROR_SET:
      return {
        ...state,
        type: error.name,
        message: error.message,
      };
    default:
      return state;
  }
};

export default ErrorReducer;
