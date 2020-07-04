/**
 * Sets a route to only be accessed by a guest.
 * Redirects to dashboard if user a logged in user attempts to use it.
 *
 * The below code is taken from
 * ClueMediator - Create login form in ReactJS: Login App Tutorial
 * by ClueMediator
 */

import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getToken } from "./session";

// handle the public routes
function PublicRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        !getToken() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/dashboard" }} />
        )
      }
    />
  );
}

export default PublicRoute;
