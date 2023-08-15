import React from 'react';
import ReactDOM from 'react-dom';
import './reset.css';
import {
  BrowserRouter as Router,
  Route,
  useHistory,
  Switch,
} from 'react-router-dom';
import GlobalStyle from './globalStyles';
import { Auth0Provider } from '@auth0/auth0-react';
import 'antd/dist/antd.less';

import { NotFoundPage } from './components/pages/NotFound';
import { ExampleListPage } from './components/pages/ExampleList';
import { ProfileListPage } from './components/pages/ProfileList';
import { LoginPage } from './components/pages/Login';
import { HomePage } from './components/pages/Home';
import { ExampleDataViz } from './components/pages/ExampleDataViz';
import { LoadingComponent } from './components/common';
import SignupPage from './components/pages/Login/SignupPage';
import { ProtectedRoute } from './utils/ProtectedRoute';

// const oktaAuth = new OktaAuth(config);
ReactDOM.render(
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH0_DOMAIN_URL}
    clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
    scope="email"
    responseType="token id_token"
  >
    <Router>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Router>
  </Auth0Provider>,
  document.getElementById('root')
);

function App() {
  // The reason to declare App this way is so that we can use any helper functions we'd need for business logic, in our case auth.
  // React Router has a nifty useHistory hook we can use at this level to ensure we have security around our routes.
  const history = useHistory();

  // const restoreOriginalUri = async (_oktaAuth, originalUri) => {
  //   history.replace(toRelativeUrl(originalUri, window.location.origin));
  // };

  const authHandler = () => {
    // We pass this to our <Security /> component that wraps our routes.
    // It'll automatically check if userToken is available and push back to login if not :)
    history.push('/login');
  };

  return (
    <>
      <GlobalStyle />
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignupPage} />
        <ProtectedRoute
          path="/"
          component={HomePage}
          LoadingComponent={LoadingComponent}
        />
        <ProtectedRoute
          path="/cases"
          component={HomePage}
          LoadingComponent={LoadingComponent}
        />
        <ProtectedRoute
          path="/judges"
          component={HomePage}
          LoadingComponent={LoadingComponent}
        />
        <ProtectedRoute path="/example-list" component={ExampleListPage} />
        <ProtectedRoute path="/profile-list" component={ProfileListPage} />
        <ProtectedRoute path="/datavis" component={ExampleDataViz} />
        <Route component={NotFoundPage} />
      </Switch>
    </>
  );
}
