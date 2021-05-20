import { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { useEffect } from 'react';

import AppBar from './components/AppBar';
import Container from '@material-ui/core/Container';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

import { getCurrentUser } from './redux/auth/auth-operations';
import routes from './utils/routes';

const HomePage = lazy(() =>
  import('./pages/HomePage' /* webpackChunkName: "HomePage */),
);

const ContactsPage = lazy(() =>
  import('./pages/ContactsPage' /* webpackChunkName: "ContactForm */),
);

const LoginPage = lazy(() =>
  import('./pages/LoginPage' /* webpackChunkName: "LoginPage */),
);

const RegisterPage = lazy(() =>
  import('./pages/RegisterPage' /* webpackChunkName: "RegisterPage */),
);

const App = ({ getCurrentUser }) => {
  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <Container>
      <AppBar />

      <Suspense fallback={<p>Loading...</p>}>
        <Switch>
          <Route exact path={routes.home} component={HomePage} />
          <PublicRoute
            restricted
            path={routes.register}
            redirectTo={routes.contacts}
            component={RegisterPage}
          />
          <PublicRoute
            restricted
            redirectTo={routes.contacts}
            path={routes.login}
            component={LoginPage}
          />
          <PrivateRoute
            redirectTo={routes.login}
            path={routes.contacts}
            component={ContactsPage}
          />
        </Switch>
      </Suspense>
    </Container>
  );
};

const mapDispatchToProps = {
  getCurrentUser: getCurrentUser,
};

export default connect(null, mapDispatchToProps)(App);
