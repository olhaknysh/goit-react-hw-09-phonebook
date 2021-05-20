import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import authActions from './auth-actions';

const initialState = { name: null, email: null };

const user = createReducer(initialState, {
  [authActions.getCurrentUserSuccess]: (_, { payload }) => payload,
  [authActions.registerSuccess]: (_, { payload }) => payload.user,
  [authActions.loginSuccess]: (_, { payload }) => payload.user,
  [authActions.logoutSuccess]: () => initialState,
});

const token = createReducer(null, {
  [authActions.registerSuccess]: (_, { payload }) => payload.token,
  [authActions.loginSuccess]: (_, { payload }) => payload.token,
  [authActions.logoutSuccess]: () => null,
});

const setError = (_, { payload }) => payload;

const error = createReducer(null, {
  [authActions.registerError]: setError,
  [authActions.loginError]: setError,
  [authActions.logoutError]: setError,
  [authActions.getCurrentUserError]: setError,
  [authActions.registerSuccess]: () => null,
  [authActions.loginSuccess]: () => null,
  [authActions.logoutSuccess]: () => null,
});

const isAuthenticated = createReducer(false, {
  [authActions.registerSuccess]: () => true,
  [authActions.loginSuccess]: () => true,
  [authActions.getCurrentUserSuccess]: () => true,
  [authActions.registerError]: () => false,
  [authActions.loginError]: () => false,
  [authActions.getCurrentUserError]: () => false,
  [authActions.logoutSuccess]: () => false,
});

const isLoading = createReducer(false, {
  [authActions.getCurrentUserRequest]: () => true,
  [authActions.loginRequest]: () => true,
  [authActions.logoutRequest]: () => true,
  [authActions.registerRequest]: () => true,
  [authActions.getCurrentUserSuccess]: () => false,
  [authActions.getCurrentUserError]: () => false,
  [authActions.loginSuccess]: () => false,
  [authActions.loginError]: () => false,
  [authActions.logoutSuccess]: () => false,
  [authActions.logoutError]: () => false,
  [authActions.registerSuccess]: () => false,
  [authActions.registerError]: () => false,
});

export default combineReducers({
  user,
  token,
  error,
  isAuthenticated,
  isLoading,
});
