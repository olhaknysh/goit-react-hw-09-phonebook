import { useEffect } from 'react';
import { createUseStyles } from 'react-jss';
import { useSelector, useDispatch } from 'react-redux';

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

const ContactsList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const contacts = useSelector(contactsSelectors.getVisibleContacts);

  useEffect(() => {
    dispatch(contactOperations.fetchContacts());
  }, [dispatch]);

  return (
    <ul className={classes.list}>
      {contacts.map(({ name, number, id }) => (
        <ContactListItem key={id} name={name} number={number} id={id} />
      ))}
    </ul>
  );
};

export default ContactsList;
