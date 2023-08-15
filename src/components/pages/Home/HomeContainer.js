import React, { useState, useEffect, useMemo } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { UserContext } from '../../../context/UserContext';
import RenderHomePage from './RenderHomePage';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useAuth0 } from '@auth0/auth0-react';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    height: '2em',
    width: '2em',
    overflow: 'show',
    margin: 'auto',
    top: '0',
    left: '0',
    bottom: '0',
    right: '0',
    transform: 'scale(2)',
    color: '#215589',
  },
}));

const HRFBlueLoader = withStyles(() => ({
  root: {
    '& .MuiCircularProgress-circle': {
      color: '#215589',
    },
  },
}))(CircularProgress);

function HomeContainer() {
  console.log('HomeContainer.js: HomeContainer()');
  // const { oktaAuth, authState } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);
  const [token, setToken] = useState(null);
  const {
    isAuthenticated,
    user,
    isLoading,
    getAccessTokenSilently,
  } = useAuth0();
  // eslint-disable-next-line
  // const [memoOktaAuth] = useMemo(() => [oktaAuth], []);

  // useEffect(() => {
  //   let isSubscribed = true;

  //   memoOktaAuth
  //     .getUser()
  //     .then(info => {
  //       // if user is authenticated we can use the oktaAuth to snag some user info.
  //       // isSubscribed is a boolean toggle that we're using to clean up our useEffect.
  //       if (isSubscribed) {
  //         setUserInfo(info);
  //       }
  //     })
  //     .catch(err => {
  //       isSubscribed = false;
  //       return setUserInfo(null);
  //     });
  //   return () => (isSubscribed = false);
  // }, [memoOktaAuth]);
  useEffect(() => {
    if (isAuthenticated) {
      // You may want to retrieve additional user info here
      setUserInfo(user);
      console.log('user', user);
      // Example of how to get an access token if needed
      getAccessTokenSilently().then(token => {
        setToken(token);
        console.log(token);
      });
    }
  }, [isAuthenticated, user, getAccessTokenSilently]);

  const classes = useStyles();

  // JWT access token can be accessed from the authState object if needed
  return (
    <>
      {isLoading && (
        <div className={classes.root}>
          <HRFBlueLoader />
        </div>
      )}
      {isAuthenticated && userInfo && (
        <UserContext.Provider value={{ auth0: useAuth0, userInfo, token }}>
          <RenderHomePage />
        </UserContext.Provider>
      )}
    </>
  );
}

export default HomeContainer;
