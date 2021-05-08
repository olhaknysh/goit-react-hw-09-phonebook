import { createSelector } from '@reduxjs/toolkit';

const getContacts = state => state.items.contacts;

const getIsLoading = state => state.items.loading;

const getError = state => state.items.error;

const getFilter = state => state.filter;

const getVisibleContacts = createSelector(
  [getContacts, getFilter],
  (contacts, filter) => {
    const normalisedFilter = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalisedFilter),
    );
  },
);

export default {
  getContacts,
  getIsLoading,
  getError,
  getFilter,
  getVisibleContacts,
};
