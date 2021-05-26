import { createUseStyles } from 'react-jss';
import { useSelector, useDispatch } from 'react-redux';

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

const UserMenu = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const name = useSelector(getUsername);
  const email = useSelector(getUserEmail);

  const handleLogout = () => {
    dispatch(logout());
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

export default UserMenu;
