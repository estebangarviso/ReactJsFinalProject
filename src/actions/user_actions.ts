import { auth } from '@/firebase';
import { REGISTER_USER, LOGIN_USER, AUTH_USER, LOGOUT_USER } from './types';

export function registerUser(dataToSubmit: UserProps) {
  const { email, password } = dataToSubmit;

  const response = auth.createUserWithEmailAndPassword(email, password);
  return {
    type: REGISTER_USER,
    payload: response,
  };
}

export function loginUser(dataToSubmit) {
  const response = auth.signInWithEmailAndPassword(
    dataToSubmit.email,
    dataToSubmit.password
  );

  return {
    type: LOGIN_USER,
    payload: response,
  };
}

export function authUser() {
  return (dispatch: any) => {
    const response = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch({
          type: AUTH_USER,
          payload: userAuth,
        });
      } else {
        dispatch({
          type: AUTH_USER,
          payload: null,
        });
      }
    });

    return response;
  };
}

export function logoutUser() {
  auth.signOut();
  return {
    type: LOGOUT_USER,
  };
}
