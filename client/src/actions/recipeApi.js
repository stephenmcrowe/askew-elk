import axios from 'axios';
import { ActionTypes, ROOT_URL } from './index';

export function getRecipe(id) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      const url = `${ROOT_URL}/recipe/${id}`;
      console.log(`GET: ${url}`);
      axios.get(url)
        .then((resp) => {
          const { response } = resp.data;
          dispatch({ type: ActionTypes.FETCH_RECIPE, payload: response });
          resolve(response);
        })
        .catch((error) => {
          dispatch({ type: ActionTypes.ERROR_SET, error });
          reject(error);
        });
    });
  };
}

export function getRecipes(params) {
  /*
   * Params should look like:
   * {
   *    recipeName: str
   *    recipeAuthor: username (str)
   * }
   */
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      const url = `${ROOT_URL}/recipes`;
      console.log(`GET: ${url}`);
      axios.get(url, { params })
        .then((resp) => {
          const { response } = resp.data;
          dispatch({ type: ActionTypes.FETCH_RECIPES, payload: response });
          resolve(response);
        })
        .catch((error) => {
          dispatch({ type: ActionTypes.ERROR_SET, error });
          reject(error);
        });
    });
  };
}

export function createRecipe(recipe, history) {
  /*
   * Params should look like:
   * {
   *    recipeName: str
   *    recipeAuthor: username (str)
   * }
   */
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      const url = `${ROOT_URL}/recipes`;
      console.log(`GET: ${url}`);
      axios.post(url, recipe)
        .then((resp) => {
          const { response } = resp.data;
          dispatch({ type: ActionTypes.CREATE_RECIPE, payload: response });
          resolve(response);
          history.push('/userpage');
        })
        .catch((error) => {
          dispatch({ type: ActionTypes.ERROR_SET, error });
          reject(error);
        });
    });
  };
}
