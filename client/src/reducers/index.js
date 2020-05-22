// the starting point for your redux store
// this defines what your store state will look like
import { combineReducers } from 'redux';

import ErrorReducer from './errorReducer';
import RecipeReducer from './recipeReducer';
import UserReducer from './userReducer';

const rootReducer = combineReducers({
  errors: ErrorReducer,
  recipe: RecipeReducer,
  user: UserReducer,
});

export default rootReducer;
