import { ActionTypes } from '../actions';
import { recipeState } from './mockStates';

const initialState = {
  all: [],
  current: {},
};

const RecipeReducer = (state = recipeState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_RECIPES:
      return { ...state, all: action.payload };
    case ActionTypes.FETCH_RECIPE:
      return { ...state, current: action.payload };
    case ActionTypes.RESET_RECIPE:
      return initialState;
    default:
      return state;
  }
};
export default RecipeReducer;
