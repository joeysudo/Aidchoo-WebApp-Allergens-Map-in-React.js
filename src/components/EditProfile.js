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
  FormText,
  CustomInput,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Button,
} from "reactstrap";
import { updateUser, getToken } from "../utils/session";
import DeleteProfile from "./DeleteProfile";
import isEmail from "validator/lib/isEmail";
import isEmpty from "validator/lib/isEmpty";
import axios from "axios";

function EditProfile(props) {
  // Set all form values initially to empty
  const email = useFormInput("");
  const firstName = useFormInput("");
  const lastName = useFormInput("");
  const severity = useFormInput("");

  let initialAllergens;
  if (isEmpty(props.user.allergens.toString())) {
    initialAllergens = "";
  } else {
    initialAllergens = props.user.allergens.toString() + ",";
  }

  // As allergen is multi select, create custom on change handler
  const [allergens, setAllergens] = useState(initialAllergens);
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

  // States to help with notifying user their changes have been updated
  const [updated, setUpdated] = useState(null);
  const [user, setUser] = useState(props.user);

  const handleUpdate = () => {
    setError(null);
    setLoading(true);
    setUpdated(null);

    // Make allergen update data conform to server's expected input
    // Convert to array and remove duplicate entries
    let arrayAllergens = allergens.split(",");
    let processedAllergens = [...new Set(arrayAllergens)];
    // If array contains placeholder remove it
    const blankIndex = processedAllergens.indexOf("");
    const spaceIndex = processedAllergens.indexOf(" ");
    if (blankIndex > -1) {
      processedAllergens.splice(blankIndex);
    } else if (spaceIndex > -1) {
      processedAllergens.splice(spaceIndex);
    }
    // If no allergens selected, make it an empty string
    if (processedAllergens.length === 0) {
      processedAllergens = [];
    }

    // Ensure email is valid or return error
    if (email.value !== "" && !isEmail(email.value)) {
      setError("Please enter a valid email!");
      setLoading(false);
      return;
    }

    // Format form values to send to server
    const formData = {
      email: email.value,
      firstName: firstName.value,
      lastName: lastName.value,
      allergens: processedAllergens,
      severity: severity.value,
    };

    // Process form data so only user updated key value pairs are sent
    Object.keys(formData).forEach(
      (key) => formData[key] === "" && delete formData[key]
    );

    // Verify user is logged in and has permission to update their profile on request
    const token = getToken();
    const options = {
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    };

    // Make request to the server to perform this update
    axios
      .patch(process.env.REACT_APP_API_URL + "/user/profile", formData, options)
      .then((response) => {
        setLoading(false);
        updateUser(response.data.user);
        setUpdated("Success! Your profile is now up to date.");
        setUser(response.data.user);
      })
      .catch((error) => {
        setLoading(false);
        // If the error is due to duplicate emails set custom prompt
        if (error.response.status === 400)
          setError(error.response.data.message);
        else setError("Oops. Something went wrong try again.");
      });
  };

  // To print user's allergens in a more 'beautiful' way
  const prettyAllergens = JSON.stringify(user.allergens).replace(",", ", ");

  return (
    <div className="editProfile">
      <Form>
        <FormGroup row>
          <Label for="newEmail" sm={4}>
            Email
          </Label>
          <Col sm={8}>
            <Input
              type="email"
              {...email}
              aria-describedby="emailHelp"
              name="email"
              id="newEmail"
              placeholder={user.email}
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
              placeholder={user.firstName}
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
              placeholder={user.lastName}
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
              checked={allergens.includes("Tree")}
            />
            <CustomInput
              type="checkbox"
              onChange={handleAllergenChange}
              name="allergens[]"
              id="grassAllergen"
              label="Grass"
              value="Grass"
              checked={allergens.includes("Grass")}
            />
            <CustomInput
              type="checkbox"
              onChange={handleAllergenChange}
              name="allergens[]"
              id="weedAllergen"
              label="Weeds"
              value="Weeds"
              checked={allergens.includes("Weed")}
            />
            <CustomInput
              type="checkbox"
              onChange={handleAllergenChange}
              name="allergens[]"
              id="pollutionAllergen"
              label="Pollution"
              value="Pollution"
              checked={allergens.includes("Pollution")}
            />
            <FormText color="muted">
              Currently saved as: {prettyAllergens}
            </FormText>
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
            <FormText color="muted">
              Currently saved as: {user.severity}
            </FormText>
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
        <FormGroup>
          <DeleteProfile />
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

export default EditProfile;
