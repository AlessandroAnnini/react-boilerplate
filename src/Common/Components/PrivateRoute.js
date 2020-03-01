import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import useAwsCredentials from 'Common/Hooks/useAwsCredentials';
import Loader from 'Common/Components/Loader';

export default ({ component: Component, ...rest }) => {
  const awsCredentials = useAwsCredentials();
  if (!awsCredentials) return <Loader />;
  const isAuthenticated = awsCredentials.authenticated;

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/signup',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};
