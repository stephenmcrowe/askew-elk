// the starting point for your redux store
// this defines what your store state will look like
import { combineReducers } from 'redux';

import CountReducer from './count-reducer';
import ErrorReducer from './errorReducer';
import UserReducer from './userReducer';

const rootReducer = combineReducers({
  count: CountReducer,
  errors: ErrorReducer,
  user: UserReducer,
});

export default rootReducer;
