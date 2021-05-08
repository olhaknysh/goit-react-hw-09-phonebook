import { connect } from 'react-redux';
import contactOperations from '../../redux/contacts/contacts-operations';
import contactSelectors from '../../redux/contacts/contacts-selectors';

import ContactList from './ContactList';

const mapStateToProps = state => ({
  contacts: contactSelectors.getVisibleContacts(state),
  filter: contactSelectors.getFilter(state),
});

const mapDispatchToProps = dispatch => ({
  fetchContacts: () => dispatch(contactOperations.fetchContacts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
