import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { LoginPage } from '../components/pages/Login';

export function ProtectedRoute(props) {
  const { isAuthenticated, isLoading } = useAuth0();
  const { component: Component, ...rest } = props;
  console.log('isAuthenticated', isAuthenticated);
  console.log('rest', rest);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return <Component {...rest} />;
}
