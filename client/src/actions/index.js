export const ROOT_URL = 'http://localhost:3000';
// export const ROOT_URL = 'https://https://askew-elk.herokuapp.com';

export const ActionTypes = {
  AUTH_USER: 'AUTH_USER',
  DEAUTH_USER: 'DEAUTH_USER',

  FETCH_RECIPES: 'FETCH_RECIPES',
  FETCH_RECIPE: 'FETCH_RECIPE',
  RESET_RECIPE: 'RESET_RECIPE',

  ERROR_SET: 'ERROR_SET',
};


export function increment() {
  return {
    type: ActionTypes.INCREMENT,
    payload: null,
  };
}

export function decrement() {
  return {
    type: ActionTypes.DECREMENT,
    payload: null,
  };
}
