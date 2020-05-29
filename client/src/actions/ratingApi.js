import axios from 'axios';
import { ActionTypes, ROOT_URL } from './index';

export const rateRecipe = (rating, recipeId) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      const url = `${ROOT_URL}/ratings`;
      console.log(`POST: ${url}`);
      const payload = {
        Rating: rating,
        RecipeID: recipeId,
      };
      const headers = { Authorization: `JWT ${localStorage.getItem('token')}` };
      axios.post(url, payload, { headers })
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
};

export const updateRating = (rating, recipeId) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      const url = `${ROOT_URL}/ratings`;
      console.log(`PUT: ${url}`);
      const payload = {
        Rating: rating,
        RecipeID: recipeId,
      };
      const headers = { Authorization: `JWT ${localStorage.getItem('token')}` };
      axios.put(url, payload, { headers })
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
};
