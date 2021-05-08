import axios from 'axios';
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

axios.defaults.baseURL = 'http://localhost:4040';

const fetchContacts = () => async dispatch => {
  dispatch(fetchContactsRequest());

  try {
    const { data } = await axios.get('/contacts');

    dispatch(fetchContactsSuccess(data));
  } catch (error) {
    dispatch(fetchContactsFailure(error.message));
  }
};

const addContact = contact => async dispatch => {
  const { name, number } = contact;
  const newContact = {
    name,
    number,
  };

  dispatch(addContactsRequest());

  try {
    const { data } = await axios.post('/contacts', newContact);
    dispatch(addContactsSuccess(data));
  } catch (error) {
    dispatch(addContactsFailure(error.message));
  }
};

const deleteContact = contactId => async dispatch => {
  dispatch(deleteContactsRequest());

  try {
    const deleted = await axios.delete(`/contacts/${contactId}`);
    if (deleted) {
      dispatch(deleteContactsSuccess(contactId));
    }
  } catch (error) {
    dispatch(deleteContactsFailure(error.message));
  }
};

export default {
  fetchContacts,
  addContact,
  deleteContact,
};
