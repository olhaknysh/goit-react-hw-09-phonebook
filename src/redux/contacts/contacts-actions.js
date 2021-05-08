import { createAction } from '@reduxjs/toolkit';

export const fetchContactsRequest = createAction(
  'contacts/fetchContactsRequest',
);
export const fetchContactsSuccess = createAction(
  'contacts/fetchContactsSuccess',
);

export const fetchContactsFailure = createAction(
  'contacts/fetchContactsFailure',
);

export const addContactsRequest = createAction('contacts/addContactsRequest');
export const addContactsSuccess = createAction('contacts/addContactsSuccess');
export const addContactsFailure = createAction('contacts/addContactsFailure');

export const deleteContactsRequest = createAction(
  'contacts/deleteContactsRequest',
);
export const deleteContactsSuccess = createAction(
  'contacts/deleteContactsSuccess',
);
export const deleteContactsFailure = createAction(
  'contacts/deleteContactsFailure',
);
