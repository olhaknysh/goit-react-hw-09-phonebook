import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import AddContact from './AddContact.container';
import ContactsList from './ContactsList';
import Filter from '../../components/Filter';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { isLoading, error } from '../../redux/auth/auth-selectors';
import contactsSelectors from '../../redux/contacts/contacts-selectors';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 600,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  container: {
    paddingTop: 40,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 400,
  },
  top: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}));

const ContactsPage = ({
  authError,
  authLoading,
  contactsError,
  contactsIsLoading,
}) => {
  const classes = useStyles();

  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.container}>
      <div className={classes.top}>
        <Button onClick={handleOpen} variant="outlined">
          Add contact
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div style={modalStyle} className={classes.paper}>
            <AddContact onClose={handleClose} />
          </div>
        </Modal>

        <Filter />
      </div>
      <ContactsList />

      {authError && <ToastContainer />}
      {contactsError && <ToastContainer />}
      {authLoading && <CircularProgress />}
      {contactsIsLoading && <CircularProgress />}
    </div>
  );
};

const mapStateToProps = state => ({
  authError: error(state),
  authLoading: isLoading(state),
  contactsError: contactsSelectors.getError(state),
  contactsIsLoading: contactsSelectors.getIsLoading(state),
});

ContactsPage.propTypes = {
  authError: PropTypes.string,
  contactsError: PropTypes.string,
  authLoading: PropTypes.bool,
  contactsIsLoading: PropTypes.bool,
};

export default connect(mapStateToProps)(ContactsPage);
