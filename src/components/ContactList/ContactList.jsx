import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ContactListItem from './ContactListItem';

const ContactList = ({ contacts, filter }) => {
  const visibleContacts = () => {
    if (filter) {
      const normalisedFilter = filter.toLowerCase();
      const filteredContacts = contacts.filter(({ name }) =>
        name.toLowerCase().includes(normalisedFilter),
      );
      return filteredContacts;
    }

    return contacts;
  };

  return (
    <ul>
      {visibleContacts().map(({ id, name, number }) => (
        <ContactListItem key={id} id={id} name={name} number={number} />
      ))}
    </ul>
  );
};

const mapStateToProps = state => ({
  contacts: state.items,
  filter: state.filter,
});

ContactList.propTypes = {
  contacts: PropTypes.array,
  filter: PropTypes.string,
};

export default connect(mapStateToProps)(ContactList);
