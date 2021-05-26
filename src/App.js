import { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

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

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

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
          >
            <RegisterPage />
          </PublicRoute>
          <PublicRoute
            restricted
            redirectTo={routes.contacts}
            path={routes.login}
          >
            <LoginPage />
          </PublicRoute>
          <PrivateRoute redirectTo={routes.login} path={routes.contacts}>
            <ContactsPage />
          </PrivateRoute>
        </Switch>
      </Suspense>
    </Container>
  );
};

export default App;
