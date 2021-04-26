import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';

import { connect } from 'react-redux';
import * as actions from '../../redux/contacts/contacts-actions';

const useStyles = createUseStyles({
  contact: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: 5,
  },
  button: {
    marginLeft: 10,
  },
});

const ContactListItem = ({ id, name, number, onDelete }) => {
  const classes = useStyles();
  const handleDelete = () => onDelete(id);

  return (
    <li className={classes.contact}>
      <p>
        {name} : {number}
      </p>
      <button className={classes.button} type="button" onClick={handleDelete}>
        X
      </button>
    </li>
  );
};

const mapStateToProps = state => ({
  contacts: state.items,
});

const mapDispatchToProps = dispatch => ({
  onDelete: id => dispatch(actions.deleteContact(id)),
});

ContactListItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactListItem);
