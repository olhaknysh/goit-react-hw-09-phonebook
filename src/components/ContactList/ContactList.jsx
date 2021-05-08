import { useEffect } from 'react';
import PropTypes from 'prop-types';

import ContactListItem from './ContactListItem.container';

const ContactList = ({ contacts, fetchContacts }) => {
  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <ul>
      {contacts.map(({ id, name, number }) => (
        <ContactListItem key={id} id={id} name={name} number={number} />
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.array,
  fetchContacts: PropTypes.func,
};

export default ContactList;
