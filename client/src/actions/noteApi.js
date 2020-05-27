import axios from 'axios';
import { ActionTypes, ROOT_URL } from './index';

export function fetchNote(id) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      const url = `${ROOT_URL}/savednotes/${id}`;
      console.log(`GET: ${url}`);
      const headers = { Authorization: `JWT ${localStorage.getItem('token')}` };
      axios.get(url, { headers })
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

export function fetchNotes(params) {
  /*
   * Params should look like:
   * {
   *    noteName: str
   * }
   */
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      const url = `${ROOT_URL}/savenotes`;
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

export function createNote(note, history) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      const url = `${ROOT_URL}/savednotes`;
      console.log(`POST: ${url}`);
      const headers = { Authorization: `JWT ${localStorage.getItem('token')}` };
      axios.post(url, note, { headers })
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
      const headers = { Authorization: `JWT ${localStorage.getItem('token')}` };
      axios.put(url, note, { headers })
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
      const headers = { Authorization: `JWT ${localStorage.getItem('token')}` };
      axios.delete(url, { headers })
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
