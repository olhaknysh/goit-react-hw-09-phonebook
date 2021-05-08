import { connect } from 'react-redux';
import contactOperations from '../../redux/contacts/contacts-operations';
import contactSelectors from '../../redux/contacts/contacts-selectors';

import ContactForm from './ContactForm';

const mapStateToProps = state => ({
  contacts: contactSelectors.getContacts(state),
  loading: contactSelectors.getIsLoading(state),
  error: contactSelectors.getError(state),
});

const mapDispatchToProps = dispatch => ({
  onSubmit: contact => dispatch(contactOperations.addContact(contact)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
