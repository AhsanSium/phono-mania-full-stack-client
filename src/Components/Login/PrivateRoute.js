import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router';
import { UserContext } from '../../App';

const PrivateRoute = ({ children, ...rest }) => {

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  console.log(JSON.parse(sessionStorage.getItem('user')))
  let userEmail = undefined;
  if (JSON.parse(sessionStorage.getItem('user'))) {
    userEmail = JSON.parse(sessionStorage.getItem('user')).email;
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        loggedInUser.email || userEmail ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;