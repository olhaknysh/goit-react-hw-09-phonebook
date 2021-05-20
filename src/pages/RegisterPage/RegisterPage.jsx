import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { register } from '../../redux/auth/auth-operations';
import { isLoading, error } from '../../redux/auth/auth-selectors';

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
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const initialValue = {
  name: '',
  email: '',
  password: '',
};

const RegisterPage = ({ isLoading, error, onRegister }) => {
  const [state, setState] = useState(initialValue);
  const { name, email, password } = state;

  const classes = useStyles();

  const handleChange = e => {
    setState(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    onRegister(state);

    setState(initialValue);
  };

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <EmojiEmotionsIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Please fill out the fields
      </Typography>
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
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          value={password}
          onChange={handleChange}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Register
        </Button>
      </form>

      {error && <ToastContainer />}
      {isLoading && <CircularProgress />}
    </div>
  );
};

const mapStateToProps = state => ({
  isLoading: isLoading(state),
  error: error(state),
});

const mapDispatchToProps = {
  onRegister: register,
};

RegisterPage.propTypes = {
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  onRegister: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
