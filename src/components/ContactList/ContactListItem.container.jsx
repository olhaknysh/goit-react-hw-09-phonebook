import { connect } from 'react-redux';
import contactOperations from '../../redux/contacts/contacts-operations';
import contactSelectors from '../../redux/contacts/contacts-selectors';

import ContactListItem from './ContactListItem';

const mapStateToProps = state => ({
  contacts: contactSelectors.getContacts(state),
});

const mapDispatchToProps = dispatch => ({
  onDelete: id => dispatch(contactOperations.deleteContact(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactListItem);
