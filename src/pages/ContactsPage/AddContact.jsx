import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import contactOperations from '../../redux/contacts/contacts-operations';
import contactSelectors from '../../redux/contacts/contacts-selectors';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '50%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const initialValue = {
  name: '',
  number: '',
};

const AddContact = ({ onClose }) => {
  const dispatch = useDispatch();
  const [state, setState] = useState(initialValue);
  const { name, number } = state;
  const contacts = useSelector(contactSelectors.getContacts);

  const classes = useStyles();

  const handleChange = e => {
    setState(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!checkPossibleRepeat(name)) {
      dispatch(contactOperations.addContact({ name, number }));
    }

    onClose();

    setState(initialValue);
  };

  const checkPossibleRepeat = newName => {
    const isNameExist = !!contacts.find(contact => contact.name === newName);

    if (isNameExist) {
      alert(`${newName} is already in contacts.`);
    }
    return isNameExist;
  };

  return (
    <div className={classes.paper}>
      <form className={classes.form} onSubmit={handleSubmit} noValidate>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="name"
          label="Name"
          name="name"
          autoFocus
          value={name}
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Number"
          name="number"
          autoFocus
          value={number}
          onChange={handleChange}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Add contact
        </Button>
      </form>
    </div>
  );
};

AddContact.propTypes = {
  onClose: PropTypes.func,
};

export default AddContact;
