import { NavLink } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import { useSelector } from 'react-redux';

import AuthNav from './AuthNav';
import UserMenu from './UserMenu';

import { getIsAuthenticated } from '../../redux/auth/auth-selectors';
import routes from '../../utils/routes';

const useStyles = createUseStyles({
  nav: {
    paddingTop: 20,
    paddingBottom: 20,
    display: 'flex',
    justifyContent: 'space-evenly',
  },
});

const Navigation = () => {
  const classes = useStyles();
  const isAuthenticated = useSelector(getIsAuthenticated);

  return (
    <div className={classes.nav}>
      <NavLink exact to={routes.home}>
        Home
      </NavLink>
      {isAuthenticated && <NavLink to={routes.contacts}>Contacts</NavLink>}
      {isAuthenticated ? <UserMenu /> : <AuthNav />}
    </div>
  );
};

export default Navigation;
