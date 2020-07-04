/**
 * The Aidchoo app!
 */

import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PrivateRoute from "./utils/privateRoute";
import PublicRoute from "./utils/publicRoute";

import Map from "./pages/Map";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";

import Menu from "./components/Menu";
import Footer from "./components/Footer";

import { getToken, removeUserSession, setUserSession } from "./utils/session";
import axios from "axios";

export default function App() {
  // Handle browser refresh as adapted from ClueMediator
  useEffect(() => {
    // If no token, skip this check
    const token = getToken();
    if (!token) {
      return;
    }

    // If token, verify if it's expired
    const options = {
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    };
    axios
      .get(process.env.REACT_APP_API_URL + "/user/profile", options)
      .then((response) => {
        // If not expired, set user session
        setUserSession(response.data.token, response.data.user);
      })
      .catch((error) => {
        // If expired, delete session
        removeUserSession();
      });
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <div className="header">
            <Menu />
          </div>
        </div>
        <div className="content">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/map" component={Map} />
            <PublicRoute path="/login" component={Login} />
            <PublicRoute path="/signup" component={Signup} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <PrivateRoute path="/profile" component={Profile} />
            <Route component={NotFound} />
          </Switch>
        </div>
        <div>
          <div className="footer">
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}
