import axios from 'axios';
import { ActionTypes, ROOT_URL } from './index';

export function signupUser(user) {
  /*
   * Payload should look like:
   * const payload = {
   *   username: user.username,   // str
   *   password: user.password,   // str
   * }
   */
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      const url = `${ROOT_URL}/signup`;
      console.log(`POST: ${url}`);
      axios.post(url, user)
        .then((resp) => {
          const { response } = resp.data;
          localStorage.setItem('token', response.token);
          localStorage.setItem('username', response.username);
          resolve(response);
        })
        .catch((error) => {
          dispatch({ type: ActionTypes.ERROR_SET, error });
          reject(error);
        });
    });
  };
}

export function signinUser(user) {
  /*
   * Payload should look like:
   * const payload = {
   *   username: user.username,   // str
   *   password: user.password,   // str
   * }
   */
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      const url = `${ROOT_URL}/signin`;
      console.log(`POST: ${url}`);
      axios.post(url, user)
        .then((resp) => {
          const { response } = resp.data;
          localStorage.setItem('token', response.token);
          localStorage.setItem('username', response.username);
          resolve(response);
        })
        .catch((error) => {
          dispatch({ type: ActionTypes.ERROR_SET, error });
          reject(error);
        });
    });
  };
}

// deletes token from localstorage
// and deauths
export function signoutUser() {
  return (dispatch) => {
    return new Promise((resolve) => {
      localStorage.removeItem('token');
      dispatch({ type: ActionTypes.DEAUTH_USER });
      resolve();
    });
  };
}
