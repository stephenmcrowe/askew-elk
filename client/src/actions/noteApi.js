import axios from 'axios';
import { ActionTypes, ROOT_URL } from './index';

export function getNote(recipeId) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      const url = `${ROOT_URL}/history/${recipeId}`;
      console.log(`GET: ${url}`);
      const headers = { Authorization: `JWT ${localStorage.getItem('token')}` };
      axios.get(url, { headers })
        .then((resp) => {
          console.log(resp);
          const { response } = resp.data;
          dispatch({ type: ActionTypes.FETCH_NOTES, payload: response });
          resolve(response);
        })
        .catch((error) => {
          dispatch({ type: ActionTypes.ERROR_SET, error });
          reject(error);
        });
    });
  };
}

export function getNotes(params) {
  /*
   * Params should look like:
   * {
   *    noteName: str
   * }
   */
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      const url = `${ROOT_URL}/histories`;
      console.log(`GET: ${url}`);
      const headers = { Authorization: `JWT ${localStorage.getItem('token')}` };
      axios.get(url, { params, headers })
        .then((resp) => {
          const { response } = resp.data;
          dispatch({ type: ActionTypes.FETCH_NOTES, payload: response });
          resolve(response);
        })
        .catch((error) => {
          dispatch({ type: ActionTypes.ERROR_SET, error });
          reject(error);
        });
    });
  };
}

export function createNote(note, recipeId) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      const url = `${ROOT_URL}/history/${recipeId}`;
      console.log(`POST: ${url}`);
      const headers = { Authorization: `JWT ${localStorage.getItem('token')}` };
      axios.post(url, note, { headers })
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

export function updateNote(note, recipeId) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      const url = `${ROOT_URL}/history/${recipeId}?`;
      console.log(`UPDATE: ${url}`);
      const headers = { Authorization: `JWT ${localStorage.getItem('token')}` };
      axios.put(url, note, { headers })
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

export function deleteNote(recipeId) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      const url = `${ROOT_URL}/savednotes/${recipeId}`;
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
