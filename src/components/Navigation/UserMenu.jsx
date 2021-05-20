import { connect } from 'react-redux';
import { createUseStyles } from 'react-jss';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';

import { getUsername, getUserEmail } from '../../redux/auth/auth-selectors';
import { logout } from '../../redux/auth/auth-operations';

const useStyles = createUseStyles({
  userMenu: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: 10,
    border: '2px solid grey',
    borderRadius: '5px',
    alignItems: 'center',
    flexDirection: 'column',
    height: 100,
  },
});

const UserMenu = ({ name, email, onLogout }) => {
  const classes = useStyles();

  const handleLogout = () => {
    onLogout();
  };

  return (
    <div className={classes.userMenu}>
      <p>Hello, {name}!</p>
      <p>{email}</p>
      <Button size="small" type="button" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

const mapStateToProps = state => ({
  name: getUsername(state),
  email: getUserEmail(state),
});

const mapDisptachToProps = {
  onLogout: logout,
};

UserMenu.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  onLogout: PropTypes.func,
};

export default connect(mapStateToProps, mapDisptachToProps)(UserMenu);
