/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { withRouter, Route, Redirect } from 'react-router-dom';

// Router Wrapper
const PrivateRoute = ({ component: Child, ...props }) => {
  const token = localStorage.getItem('token');
  return (
    <Route
      {...props}
      render={(routeProps) => (token ? (
        <Child {...routeProps} />
      ) : (
        <Redirect to="/homepage" />
      ))}
    />
  );
};

export default withRouter(PrivateRoute);
