import { createReducer } from '@reduxjs/toolkit';
import * as actions from './contacts-actions';

const contactsReducer = createReducer([], {
  [actions.addNewContact]: (state, { payload }) => [...state, payload],
  [actions.deleteContact]: (state, { payload }) =>
    state.filter(contact => contact.id !== payload),
});

export default contactsReducer;
