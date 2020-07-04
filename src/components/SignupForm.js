/**
 * Component for the edit version of a user's profile.
 * User can save changes and delete their page from this component.
 *
 * Parts of the below code are adapted from
 * ClueMediator.com - Create login form in ReactJS: Login App Tutorial
 * by ClueMediator
 */

import React, { useState } from "react";
import {
  CustomInput,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Button,
} from "reactstrap";
import { setUserSession } from "../utils/session";
import { useHistory, Link } from "react-router-dom";
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import axios from "axios";

import loginImg from "../assets/login.png";

// To stop using storing too short passwords
const MIN_PASS_LENGTH = 5;

function SignupForm(props) {
  // Use history to redirect
  let history = useHistory();
  // Set all form values initially to empty
  const email = useFormInput("");
  const password = useFormInput("");
  const confirmPassword = useFormInput("");
  const firstName = useFormInput("");
  const lastName = useFormInput("");
  const severity = useFormInput("");

  // As allergen is multi select, create custom Onchange handler
  const [allergens, setAllergens] = useState("");
  const handleAllergenChange = (e) => {
    if (typeof e === "undefined") {
      return;
    }
    // If no option selected don't store anything
    let currValue = e.target.value;
    if (currValue === "") {
      return;
    } else if (allergens.includes(currValue)) {
      // If box is unchecked after being checked, remove from selection list
      let removeUnChecked = allergens.toString().replace(currValue + ",", "");
      setAllergens(removeUnChecked);
      return;
    }
    // Add to selections list if it is new and valid choice
    setAllergens(allergens + currValue + ",");
  };

  // States to help with rendering request status
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSignUp = () => {
    setError(null);
    setLoading(true);

    // Make allergen data conform to server's expected input
    // Convert to array and remove duplicate entries
    let arrayAllergens = allergens.split(",");
    let processedAllergens = [...new Set(arrayAllergens)];
    // If array contains placeholder remove it
    const blankIndex = processedAllergens.indexOf("");
    if (blankIndex > -1) {
      processedAllergens.splice(blankIndex);
    }
    // If no allergens selected, make it null
    if (processedAllergens.length === 0) {
      processedAllergens = [];
    }

    // Ensure email is valid or return error
    if (
      isEmpty(email.value, { ignore_whitespace: true }) ||
      !isEmail(email.value)
    ) {
      setError("Please enter a valid email!");
      setLoading(false);
      return;
    }

    // Ensure password exists and is valid or return error
    if (isEmpty(password.value, { ignore_whitespace: true })) {
      setError("Please enter a password!");
      setLoading(false);
      return;
    } else if (
      password.value.length < MIN_PASS_LENGTH ||
      password.value.includes(" ")
    ) {
      setError(
        "Password must be at least 5 characters long and contain no spaces."
      );
      setLoading(false);
      return;
    } else if (password.value !== confirmPassword.value) {
      setError("Your re-entered password does not match.");
      setLoading(false);
      return;
    }

    // Ensure firstName exists or return error
    if (isEmpty(firstName.value, { ignore_whitespace: true })) {
      setError("Please enter your first name");
      setLoading(false);
      return;
    }

    // Set severity to none if none selected
    if (isEmpty(severity.value, { ignore_whitespace: true })) {
      severity.value = "None";
    }

    // Format form values to send to server
    const formData = {
      email: email.value,
      password: password.value,
      firstName: firstName.value,
      lastName: lastName.value,
      allergens: processedAllergens,
      severity: severity.value,
    };

    // Make request to the server to perform this update
    axios
      .post(process.env.REACT_APP_API_URL + "/user/register", formData)
      .then((response) => {
        setLoading(false);
        setUserSession(response.data.token, response.data.user);
        // Redirect to the dashboard and reload the page
        history.push("/dashboard");
        window.location.reload();
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        // If the error is due to duplicate emails set custom prompt
        if (error.response.status === 400)
          setError(error.response.data.message);
        else setError("Oops. Something went wrong try again.");
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-6 login-section-wrapper">
          <div className="login-wrapper my-auto">
            <h3 className="text-center login-title">Sign Up </h3>

            <Form id="loginForm">
              <FormGroup row className="form-group">
                <Label for="newEmail" sm={4}>
                  Email
                </Label>
                <Col sm={8}>
                  <Input
                    className="form-control"
                    type="email"
                    {...email}
                    aria-describedby="emailHelp"
                    name="email"
                    id="newEmail"
                    placeholder="Required"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="userPassword" sm={4}>
                  Password
                </Label>
                <Col sm={8}>
                  <Input
                    type="password"
                    {...password}
                    name="userPassword"
                    id="userPassword"
                    placeholder="Required"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="confirmPassword" sm={4}>
                  Re-enter Password
                </Label>
                <Col sm={8}>
                  <Input
                    type="password"
                    {...confirmPassword}
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="Required"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="newFirstName" sm={4}>
                  First Name
                </Label>
                <Col sm={8}>
                  <Input
                    type="text"
                    {...firstName}
                    name="firstName"
                    id="newFirstName"
                    placeholder="Required"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="newLastName" sm={4}>
                  Last Name
                </Label>
                <Col sm={8}>
                  <Input
                    type="text"
                    {...lastName}
                    name="lastName"
                    id="newLastName"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="newAllergens" sm={4}>
                  Allergens
                </Label>
                <Col sm={8}>
                  <CustomInput
                    type="checkbox"
                    onChange={handleAllergenChange}
                    name="allergens[]"
                    id="treeAllergen"
                    label="Tree"
                    value="Tree"
                  />
                  <CustomInput
                    type="checkbox"
                    onChange={handleAllergenChange}
                    name="allergens[]"
                    id="grassAllergen"
                    label="Grass"
                    value="Grass"
                  />
                  <CustomInput
                    type="checkbox"
                    onChange={handleAllergenChange}
                    name="allergens[]"
                    id="weedAllergen"
                    label="Weeds"
                    value="Weeds"
                  />
                  <CustomInput
                    type="checkbox"
                    onChange={handleAllergenChange}
                    name="allergens[]"
                    id="pollutionAllergen"
                    label="Pollution"
                    value="Pollution"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="newSeverity" sm={4}>
                  Symptom Severity
                </Label>
                <Col sm={8}>
                  <CustomInput
                    type="select"
                    {...severity}
                    name="severity"
                    id="newSeverity"
                  >
                    <option value="">Select</option>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                    <option>None</option>
                  </CustomInput>
                </Col>
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
                      onClick={handleSignUp}
                      disabled={loading}
                    >
                      {" "}
                      {loading ? "Loading..." : "Create Account"}
                    </Button>
                    <FormGroup>
                      <p className="login-wrapper-footer-text">
                        Existing User?
                        <Link to="/login"> Login!</Link>
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
    if (typeof e === "undefined") {
      return;
    }
    // Set the label's value to whatever the user has input
    setValue(e.target.value);
  };
  return {
    value,
    onChange: handleChange,
  };
};

export default SignupForm;
