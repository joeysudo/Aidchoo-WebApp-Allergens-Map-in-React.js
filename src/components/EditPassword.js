/**
 * Component for the edit version of a user's password.
 * User can supdate their password with this component.
 *
 * Parts of the below code are adapted from
 * ClueMediator.com - Create login form in ReactJS: Login App Tutorial
 * by ClueMediator
 */

import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Col, Button } from "reactstrap";
import { updateUser, getToken } from "../utils/session";
import axios from "axios";

// To stop using storing too short passwords
const MIN_PASS_LENGTH = 5;

function EditPassword(props) {
  // Set all form values initially to empty
  const newPassword = useFormInput("");
  const confirmPassword = useFormInput("");

  // States to help with rendering request status
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // States to help with notifying user their changes have been updated
  const [updated, setUpdated] = useState(null);

  const handleUpdate = () => {
    setError(null);
    setLoading(true);
    setUpdated(null);

    if (newPassword.value !== confirmPassword.value) {
      setError("Your re-entered password does not match.");
      setLoading(false);
      return;
    } else if (
      newPassword.value.length < MIN_PASS_LENGTH ||
      newPassword.value.includes(" ")
    ) {
      setError(
        "Password must be at least 5 characters long and contain no spaces."
      );
      setLoading(false);
      return;
    }

    // Verify user is logged in and has permission to update their password on request
    const token = getToken();
    const options = {
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    };

    // Make request to the server to perform this update
    axios
      .patch(
        process.env.REACT_APP_API_URL + "/auth/password/change",
        { password: newPassword.value },
        options
      )
      .then((response) => {
        setLoading(false);
        updateUser(response.data.user);
        setUpdated("Success! Your password is now up to date.");
      })
      .catch((error) => {
        setLoading(false);
        if (error.response.status === 400)
          setError(error.response.data.message);
        else setError("Oops. Something went wrong try again.");
      });
  };

  return (
    <div className="editProfile">
      <Form>
        <FormGroup row>
          <Label for="newPassword" sm={4}>
            New Password
          </Label>
          <Col sm={8}>
            <Input
              type="password"
              {...newPassword}
              name="newPassword"
              id="newPassword"
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="confirmPassword" sm={4}>
            Re-Enter Password
          </Label>
          <Col sm={8}>
            <Input
              type="password"
              {...confirmPassword}
              name="confirmPassword"
              id="confirmPassword"
            />
          </Col>
        </FormGroup>
        {error && (
          <>
            <small style={{ color: "red" }}>{error}</small>
            <br />
          </>
        )}
        <br />
        {updated && (
          <>
            <small style={{ color: "green" }}>{updated}</small>
            <br />
          </>
        )}
        <br />
        <FormGroup>
          <br />
          <Button
            type="button"
            color="warning"
            onClick={handleUpdate}
            disabled={loading}
          >
            {" "}
            {loading ? "Loading..." : "Save Changes"}
          </Button>
        </FormGroup>
      </Form>
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

export default EditPassword;
