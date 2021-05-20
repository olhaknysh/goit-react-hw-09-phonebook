import { connect } from 'react-redux';
import { useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import PropTypes from 'prop-types';

import ContactListItem from './ContactListItem';

import contactsSelectors from '../../redux/contacts/contacts-selectors';
import contactOperations from '../../redux/contacts/contacts-operations';

const useStyles = createUseStyles({
  list: {
    marginTop: 40,
  },
  listItem: {
    marginTop: 15,
    display: 'flex',
    justifyContent: 'space-between',
    padding: 10,
    border: '2px solid grey',
    borderRadius: '5px',
    alignItems: 'center',
  },
});

const ContactsList = ({ contacts, getContacts }) => {
  const classes = useStyles();

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <ul className={classes.list}>
      {contacts.map(({ name, number, id }) => (
        <ContactListItem key={id} name={name} number={number} id={id} />
      ))}
    </ul>
  );
};

const mapStateToProps = state => ({
  contacts: contactsSelectors.getVisibleContacts(state),
});

const mapDispatchToProps = {
  getContacts: contactOperations.fetchContacts,
};

ContactsList.propTypes = {
  contacts: PropTypes.array,
  getContacts: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactsList);
