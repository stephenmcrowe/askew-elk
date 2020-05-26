// the starting point for your redux store
// this defines what your store state will look like
import { combineReducers } from 'redux';

import ErrorReducer from './errorReducer';
import RecipeReducer from './recipeReducer';
import UserReducer from './userReducer';
import NoteReducer from './noteReducer';

const rootReducer = combineReducers({
  errors: ErrorReducer,
  recipe: RecipeReducer,
  user: UserReducer,
  note: NoteReducer,
});

export default rootReducer;
