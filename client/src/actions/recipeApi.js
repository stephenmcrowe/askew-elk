import axios from 'axios';
import { ActionTypes, ROOT_URL } from './index';

export function getRecipe(id) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      const url = `${ROOT_URL}/recipe/${id}`;
      console.log(`GET: ${url}`);
      const headers = { Authorization: `JWT ${localStorage.getItem('token')}` };
      axios.get(url, { headers })
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
   *    RecipeName: str
   * }
   */
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      const url = `${ROOT_URL}/recipes`;
      console.log(`GET: ${url}`);
      const headers = { Authorization: `JWT ${localStorage.getItem('token')}` };
      axios.get(url, { params, headers })
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

export function getFavorites(params) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      const url = `${ROOT_URL}/favorites`;
      console.log(`GET: ${url}`);
      const headers = { Authorization: `JWT ${localStorage.getItem('token')}` };
      axios.get(url, { params, headers })
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

export function getFavorite(recipeId) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      const url = `${ROOT_URL}/favorite/${recipeId}`;
      console.log(`GET: ${url}`);
      const headers = { Authorization: `JWT ${localStorage.getItem('token')}` };
      axios.get(url, { headers })
        .then((resp) => {
          const { response } = resp.data;
          const haveFavorite = Boolean(response);
          dispatch({ type: ActionTypes.FETCH_FAVORITE, payload: haveFavorite });
          resolve(response);
        })
        .catch((error) => {
          dispatch({ type: ActionTypes.ERROR_SET, error });
          reject(error);
        });
    });
  };
}

export function createFavorite(recipeId) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      const url = `${ROOT_URL}/favorites`;
      console.log(`POST: ${url}`);
      const headers = { Authorization: `JWT ${localStorage.getItem('token')}` };
      axios.post(url, { RecipeID: recipeId }, { headers })
        .then((resp) => {
          const { response } = resp.data;
          dispatch({ type: ActionTypes.FETCH_FAVORITE, payload: true });
          resolve(response);
        })
        .catch((error) => {
          dispatch({ type: ActionTypes.ERROR_SET, error });
          reject(error);
        });
    });
  };
}

export function deleteFavorite(recipeId) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      const url = `${ROOT_URL}/favorite/${recipeId}`;
      console.log(`DELETE: ${url}`);
      const headers = { Authorization: `JWT ${localStorage.getItem('token')}` };
      axios.delete(url, { headers })
        .then((resp) => {
          const { response } = resp.data;
          resolve(response);
        })
        .catch((error) => {
          dispatch({ type: ActionTypes.ERROR_SET, error });
          reject(error);
        });
    });
  };
}

export function createRecipe(recipe) {
  /*
   * recipe should look like:
   * RecipeName: str
   * Description: str,
   * Directions: {
   *   "1": "Get Shik",
   *   "2": "Get JT",
   *   "3": "Get Julian"
   * },
   * Ingredients: array of strs
   * Categories": array of strs
   */
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      const url = `${ROOT_URL}/recipes`;
      console.log(`POST: ${url}`);
      const headers = { Authorization: `JWT ${localStorage.getItem('token')}` };
      axios.post(url, recipe, { headers })
        .then((resp) => {
          const { response } = resp.data;
          resolve(response);
        })
        .catch((error) => {
          dispatch({ type: ActionTypes.ERROR_SET, error });
          reject(error);
        });
    });
  };
}

export function updateRecipe(recipe) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      const url = `${ROOT_URL}/recipe/${recipe.id}`;
      console.log(`UPDATE: ${url}`);
      const headers = { Authorization: `JWT ${localStorage.getItem('token')}` };
      axios.put(url, recipe, { headers })
        .then((resp) => {
          const { response } = resp.data;
          // dispatch({ type: ActionTypes.FETCH_RECIPE, payload: response });
          resolve(response);
        })
        .catch((error) => {
          dispatch({ type: ActionTypes.ERROR_SET, error });
          reject(error);
        });
    });
  };
}

export function deleteRecipe(id) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      const url = `${ROOT_URL}/recipe/${id}`;
      console.log(`DELETE: ${url}`);
      const headers = { Authorization: `JWT ${localStorage.getItem('token')}` };
      axios.delete(url, { headers })
        .then((resp) => {
          const { response } = resp.data;
          resolve(response);
        })
        .catch((error) => {
          dispatch({ type: ActionTypes.ERROR_SET, error });
          reject(error);
        });
    });
  };
}
