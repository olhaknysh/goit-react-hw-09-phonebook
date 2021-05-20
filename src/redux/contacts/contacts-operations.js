import axios from 'axios';
import { toast } from 'react-toastify';
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

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

const fetchContacts = () => async dispatch => {
  dispatch(fetchContactsRequest());

  try {
    const { data } = await axios.get('/contacts');

    dispatch(fetchContactsSuccess(data));
  } catch (error) {
    toast.error(error.message);
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
    toast.error(error.message);
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
    toast.error(error.message);
    dispatch(deleteContactsFailure(error.message));
  }
};

const patchContact = (contact, contactId) => async dispatch => {
  dispatch(patchContactsRequest());

  try {
    const { data } = await axios.patch(`/contacts/${contactId}`, contact);
    if (data) {
      dispatch(patchContactsSuccess(data));
    }
  } catch (error) {
    toast.error(error.message);
    dispatch(patchContactsFailure(error.message));
  }
};

export default {
  fetchContacts,
  addContact,
  deleteContact,
  patchContact,
};
