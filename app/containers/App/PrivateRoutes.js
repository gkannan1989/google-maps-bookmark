import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = props => {
  const { component: Component, hasPermission, redirectTo, ...rest } = props;
  return (
    <Route
      {...rest}
      render={() =>
        hasPermission ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: redirectTo,
              state: {
                from: props.location.pathname,
              },
            }}
          />
        )
      }
    />
  );
};
PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
  hasPermission: PropTypes.bool.isRequired,
  redirectTo: PropTypes.string.isRequired,
};
export default PrivateRoute;
