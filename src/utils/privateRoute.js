/**
 * Sets a route to only be accessed by a logged in user.
 *
 * The below code is taken from
 * ClueMediator - Create login form in ReactJS: Login App Tutorial
 * by ClueMediator
 */

import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getToken } from "./session";

// Handle the private routes
function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        getToken() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
