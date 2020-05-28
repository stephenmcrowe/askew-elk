import axios from 'axios';
import { ActionTypes, ROOT_URL } from './index';

export function getNote(id) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      const url = `${ROOT_URL}/savednotes/${id}`;
      console.log(`GET: ${url}`);
      axios.get(url)
        .then((resp) => {
          const { response } = resp.data;
          dispatch({ type: ActionTypes.FETCH_NOTE, payload: response });
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
      const url = `${ROOT_URL}/savednotes`;
      console.log(`GET: ${url}`);
      axios.get(url, { params })
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

export function createNote(note, history) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      const url = `${ROOT_URL}/savednotes`;
      console.log(`POST: ${url}`);
      axios.post(url, note)
        .then((resp) => {
          const { response } = resp.data;
          dispatch({ type: ActionTypes.FETCH_NOTES, payload: response });
          resolve(response);
          history.push('/savednotes');
        })
        .catch((error) => {
          dispatch({ type: ActionTypes.ERROR_SET, error });
          reject(error);
        });
    });
  };
}

export function updateNote(note) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      const url = `${ROOT_URL}/savednotes/${note.id}?`;
      console.log(`UPDATE: ${url}`);
      axios.put(url, note)
        .then((resp) => {
          const { response } = resp.data;
          dispatch({ type: ActionTypes.FETCH_NOTE, payload: response });
          resolve(response);
        })
        .catch((error) => {
          dispatch({ type: ActionTypes.ERROR_SET, error });
          reject(error);
        });
    });
  };
}

export function deleteNote(id, history) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      const url = `${ROOT_URL}/savednotes/${id}`;
      console.log(`DELETE: ${url}`);
      axios.delete(url)
        .then((resp) => {
          const { response } = resp.data;
          dispatch({ type: ActionTypes.FETCH_NOTE, payload: response });
          resolve(response);
          history.push('/savednotes');
        })
        .catch((error) => {
          dispatch({ type: ActionTypes.ERROR_SET, error });
          reject(error);
        });
    });
  };
}
