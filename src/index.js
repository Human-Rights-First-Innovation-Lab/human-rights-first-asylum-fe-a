import React from 'react';
import ReactDOM from 'react-dom';
import './reset.css';
import {
  BrowserRouter as Router,
  Route,
  useHistory,
  Switch,
} from 'react-router-dom';
import { Security, LoginCallback, SecureRoute } from '@okta/okta-react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import GlobalStyle from './globalStyles';

import 'antd/dist/antd.less';

import { NotFoundPage } from './components/pages/NotFound';
import { ExampleListPage } from './components/pages/ExampleList';
import { ProfileListPage } from './components/pages/ProfileList';
import { LoginPage } from './components/pages/Login';
import { HomePage } from './components/pages/Home';
import { ExampleDataViz } from './components/pages/ExampleDataViz';
import { config } from './utils/oktaConfig';
import { LoadingComponent } from './components/common';
import SignupPage from './components/pages/Login/SignupPage';

// const oktaAuth = new OktaAuth(config);

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Router>,
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
    // <Security
    //   oktaAuth={oktaAuth}
    //   restoreOriginalUri={restoreOriginalUri}
    //   onAuthRequired={authHandler}
    // >
    <>
      <GlobalStyle />
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/implicit/callback" component={LoginCallback} />
        {/* any of the routes you need secured should be registered as SecureRoutes */}
        <Route
          path="/"
          // exact
          component={() => <HomePage LoadingComponent={LoadingComponent} />}
        />
        <Route
          path="/cases"
          // exact
          component={() => <HomePage LoadingComponent={LoadingComponent} />}
        />
        <Route
          path="/judges"
          // exact
          component={() => <HomePage LoadingComponent={LoadingComponent} />}
        />
        <Route path="/example-list" component={ExampleListPage} />
        <Route path="/profile-list" component={ProfileListPage} />
        <Route path="/datavis" component={ExampleDataViz} />
        <Route component={NotFoundPage} />
      </Switch>
    </>
    // </Security>
  );
}
