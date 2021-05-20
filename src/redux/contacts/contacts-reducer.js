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
  patchContactsRequest,
  patchContactsSuccess,
  patchContactsFailure,
} from './contacts-actions';

export const contacts = createReducer([], {
  [fetchContactsSuccess]: (_, { payload }) => payload,
  [addContactsSuccess]: (state, { payload }) => [...state, payload],
  [deleteContactsSuccess]: (state, { payload }) =>
    state.filter(({ id }) => id !== payload),
  [patchContactsSuccess]: (state, { payload }) =>
    state.map(item => (item.id === payload.id ? payload : item)),
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
  [patchContactsRequest]: () => true,
  [patchContactsSuccess]: () => false,
  [patchContactsFailure]: () => false,
});

const error = createReducer('', {
  [fetchContactsFailure]: (_, { payload }) => payload,
  [addContactsFailure]: (_, { payload }) => payload,
  [deleteContactsFailure]: (_, { payload }) => payload,
  [patchContactsFailure]: (_, { payload }) => payload,
  [fetchContactsSuccess]: () => '',
  [addContactsSuccess]: () => '',
  [deleteContactsSuccess]: () => '',
  [patchContactsSuccess]: () => '',
});

export default combineReducers({
  contacts,
  loading,
  error,
});
