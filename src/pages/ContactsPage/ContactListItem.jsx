import { connect } from 'react-redux';
import { createUseStyles } from 'react-jss';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';

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
  modal: {
    position: 'absolute',
    top: '50%',
    left: '40%',
    backgroundColor: 'white',
    width: 400,
    height: 100,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

const ContactListItem = ({ name, number, id, deleteContact, patchContact }) => {
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [open, setOpen] = React.useState(false);

  const classes = useStyles();

  const handleNameChange = e => setNewName(e.currentTarget.value);
  const handleNumberChange = e => setNewNumber(e.currentTarget.value);

  const handleChangeContact = () => {
    const newContact = {
      name: newName,
      number: newNumber,
    };
    patchContact(newContact, id);
    handleClose();
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <li className={classes.listItem}>
      <p>{name}</p>
      <p>{number}</p>

      <Button type="button" onClick={() => deleteContact(id)}>
        Delete
      </Button>
      <Button type="button" onClick={handleOpen}>
        Change contact
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <form className={classes.modal}>
          <label>
            <span>Name</span>
            <input value={newName} onChange={handleNameChange} type="text" />
          </label>
          <label>
            <span>Number</span>
            <input
              value={newNumber}
              onChange={handleNumberChange}
              type="number"
            />
          </label>

          <Button onClick={handleChangeContact}>Change contact</Button>
        </form>
      </Modal>
    </li>
  );
};

const mapDispatchToProps = {
  deleteContact: contactOperations.deleteContact,
  patchContact: contactOperations.patchContact,
};

ContactListItem.propTypes = {
  name: PropTypes.string,
  number: PropTypes.string,
  id: PropTypes.string,
  deleteContact: PropTypes.func,
  patchContact: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(ContactListItem);
