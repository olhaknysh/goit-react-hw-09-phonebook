import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import {
  fetchContactsRequest,
  fetchContactsSuccess,
  fetchContactsFailure,
  addContactsRequest,
  addContactsSuccess,
  addContactsFailure,
  deleteContactsRequest,
  deleteContactsSuccess,
  deleteContactsFailure,
} from './contacts-actions';

export const contacts = createReducer([], {
  [fetchContactsSuccess]: (_, { payload }) => payload,
  [addContactsSuccess]: (state, { payload }) => [...state, payload],
  [deleteContactsSuccess]: (state, { payload }) =>
    state.filter(({ id }) => id !== payload),
});

const loading = createReducer(false, {
  [fetchContactsRequest]: () => true,
  [fetchContactsSuccess]: () => false,
  [fetchContactsFailure]: () => false,
  [addContactsRequest]: () => true,
  [addContactsSuccess]: () => false,
  [addContactsFailure]: () => false,
  [deleteContactsRequest]: () => true,
  [deleteContactsSuccess]: () => false,
  [deleteContactsFailure]: () => false,
});

const error = createReducer('', {
  [fetchContactsFailure]: (_, { payload }) => payload,
  [addContactsFailure]: (_, { payload }) => payload,
  [deleteContactsFailure]: (_, { payload }) => payload,
  [fetchContactsSuccess]: () => '',
  [addContactsSuccess]: () => '',
  [deleteContactsSuccess]: () => '',
});

export default combineReducers({
  contacts,
  loading,
  error,
});
