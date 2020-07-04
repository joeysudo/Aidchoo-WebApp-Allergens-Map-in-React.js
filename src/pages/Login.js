/**
 * Page to render the login form.
 * Redirects to the user's dashboard if successful login occurs.
 *
 * The below code is adapated from
 * ClueMediator.com - Create login form in ReactJS: Login App Tutorial
 * by ClueMediator
 *
 */

import React, { useState } from "react";
import axios from "axios";
import { setUserSession } from "../utils/session";
import { useHistory, Link } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

import loginImg from "../assets/login.png";

function Login() {
  // Use history to redirect to home on login
  let history = useHistory();

  // Set initial form values
  const email = useFormInput("");
  const password = useFormInput("");

  // States to assist with communication of request status
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle login if the bottom is clicked
  const handleLogin = () => {
    setError(null);
    setLoading(true);

    axios
      .post(process.env.REACT_APP_API_URL + "/auth/login", {
        email: email.value,
        password: password.value,
      })
      .then((response) => {
        setLoading(false);
        setUserSession(response.data.token, response.data.user);
        // Redirect to the dashboard and reload the page
        history.push("/dashboard");
        window.location.reload();
      })
      .catch((error) => {
        setLoading(false);
        // If the error is due to a bad email or password display error message
        if (error.response.status === 400)
          setError(error.response.data.message);
        else setError("Oops. Something went wrong. Please try again later!");
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-6 login-section-wrapper">
          <div className="login-wrapper my-auto">
            <h2 className="login-title">Login</h2>

            <Form id="loginForm">
              <FormGroup className="form-group">
                <Label for="email">Email</Label>
                <Input
                  className="form-control"
                  type="email"
                  {...email}
                  aria-describedby="emailHelp"
                  name="email"
                  id="email"
                  placeholder="Enter email"
                  required
                />
              </FormGroup>

              <FormGroup className="form-group mb-4">
                <Label for="email">Password</Label>
                <Input
                  className="form-control"
                  type="password"
                  {...password}
                  name="password"
                  id="password"
                  placeholder="Enter password"
                  required
                />
              </FormGroup>
              {error && (
                <>
                  <small style={{ color: "red" }}>{error}</small>
                  <br />
                </>
              )}
              <br />
              <FormGroup>
                <br />
                <div className="row d-flex align-items-center mb-4">
                  <div className="text-center mb-3 col-md-12">
                    <Button
                      type="button"
                      onClick={handleLogin}
                      disabled={loading}
                      style={{
                        paddingLeft: 100,
                        paddingRight: 100,
                        paddingTop: 10,
                        paddingBottom: 10,
                        backgroundColor: "#fdbb28",
                        color: "#fff",
                        fontWeight: 900,
                        border: 0,
                        margin: 20,
                      }}
                    >
                      {" "}
                      {loading ? "Loading..." : "Go!"}
                    </Button>
                    <FormGroup>
                      <p className="login-wrapper-footer-text">
                        New User?
                        <Link to="/signup" className="text-reset">
                          {" "}
                          Click here to signup!
                        </Link>
                      </p>
                    </FormGroup>
                  </div>
                </div>
              </FormGroup>
            </Form>
          </div>
        </div>
        <div className="col-sm-6 px-0 d-none d-sm-block">
          <img src={loginImg} alt="login" className="login-img" />
        </div>
      </div>
    </div>
  );
}

// Function to dynamically handle and save user's updates to the form's input
// Adapted from code by ClueMediator.com
const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return {
    value,
    onChange: handleChange,
  };
};

export default Login;
