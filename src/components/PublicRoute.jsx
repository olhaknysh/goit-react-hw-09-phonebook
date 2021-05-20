import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getIsAuthenticated } from '../redux/auth/auth-selectors';

const PublicRoute = ({
  component: Component,
  isAuthenticated,
  redirectTo,
  ...routeProps
}) => (
  <Route
    {...routeProps}
    render={props =>
      isAuthenticated && routeProps.restricted ? (
        <Redirect to={redirectTo} />
      ) : (
        <Component {...props} />
      )
    }
  />
);

const mapStateToProps = state => ({
  isAuthenticated: getIsAuthenticated(state),
});

PublicRoute.propTypes = {
  isAuthenticated: PropTypes.bool,
};

export default connect(mapStateToProps)(PublicRoute);
