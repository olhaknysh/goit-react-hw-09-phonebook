import { NavLink } from 'react-router-dom';
import { createUseStyles } from 'react-jss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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

const Navigation = ({ isAuthenticated }) => {
  const classes = useStyles();

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

const mapStateToProps = state => ({
  isAuthenticated: getIsAuthenticated(state),
});

Navigation.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Navigation);
