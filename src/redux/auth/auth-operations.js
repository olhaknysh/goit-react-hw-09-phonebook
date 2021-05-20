import axios from 'axios';
import { toast } from 'react-toastify';
import authActions from './auth-actions';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

const setToken = token => {
  axios.defaults.headers.common['Authorization'] = token;
};

export const login = ({ email, password }) => async dispatch => {
  dispatch(authActions.loginRequest());

  const user = {
    email,
    password,
  };

  try {
    const { data } = await axios.post('/users/login', user);
    setToken(data.token);
    dispatch(authActions.loginSuccess(data));
  } catch (error) {
    toast.error(error.message);
    dispatch(authActions.loginError(error.message));
  }
};

export const register = ({ name, email, password }) => async dispatch => {
  dispatch(authActions.registerRequest());

  const newUser = {
    name,
    email,
    password,
  };

  try {
    const { data } = await axios.post('/users/signup', newUser);
    setToken(data.token);
    dispatch(authActions.registerSuccess(data));
  } catch (error) {
    toast.error(error.message);
    dispatch(authActions.registerError(error.message));
  }
};

export const logout = () => async dispatch => {
  dispatch(authActions.logoutRequest());

  try {
    await axios.post('/users/logout');
    dispatch(authActions.logoutSuccess());
  } catch (error) {
    toast.error(error.message);
    dispatch(authActions.logoutError(error.message));
  }
};

export const getCurrentUser = () => async (dispatch, getState) => {
  const state = getState();
  const { token } = state.auth;

  if (!token) {
    return;
  }

  setToken(token);
  dispatch(authActions.getCurrentUserRequest());

  try {
    const { data } = await axios.get('/users/current');

    dispatch(authActions.getCurrentUserSuccess(data));
  } catch (error) {
    toast.error(error.message);
    dispatch(authActions.getCurrentUserError(error.message));
  }
};
