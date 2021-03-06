import { ActionTypes } from '../actions';
// import { recipeState } from './mockStates';

const initialState = {
  all: [],
  current: {},
  favorite: false,
};

const RecipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_RECIPES:
      return { ...state, all: action.payload };
    case ActionTypes.FETCH_RECIPE:
      return { ...state, current: action.payload };
    case ActionTypes.FETCH_FAVORITE:
      return { ...state, favorite: action.payload };
    case ActionTypes.RESET_RECIPE:
      return initialState;
    default:
      return state;
  }
};
export default RecipeReducer;
