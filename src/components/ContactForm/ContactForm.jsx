import { useState } from 'react';
import { createUseStyles } from 'react-jss';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import * as actions from '../../redux/contacts/contacts-actions';

const useStyles = createUseStyles({
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: 10,
  },
  labelName: {
    marginRight: 8,
  },
});

const initialValue = {
  name: '',
  number: '',
};

const ContactForm = ({ contacts, onSubmit }) => {
  const [state, setState] = useState(initialValue);
  const { name, number } = state;
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
      onSubmit({
        name,
        number,
      });
    }

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
    <form className={classes.form} onSubmit={handleSubmit}>
      <label className={classes.label}>
        <span className={classes.labelName}>Name</span>
        <input
          value={name}
          onChange={handleChange}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          required
        />
      </label>

      <label className={classes.label}>
        <span className={classes.labelName}>Phone</span>
        <input
          value={number}
          onChange={handleChange}
          type="tel"
          name="number"
          pattern="(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})"
          title="Номер телефона должен состоять из 11-12 цифр и может содержать цифры, пробелы, тире, пузатые скобки и может начинаться с +"
          required
        />
      </label>

      <button type="submit">Add contact</button>
    </form>
  );
};

const mapStateToProps = state => ({
  contacts: state.items,
});

const mapDispatchToProps = dispatch => ({
  onSubmit: contact => dispatch(actions.addNewContact(contact)),
});

ContactForm.propTypes = {
  contacts: PropTypes.array,
  onSubmit: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
