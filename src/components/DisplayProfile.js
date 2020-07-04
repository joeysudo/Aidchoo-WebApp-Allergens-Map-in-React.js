/**
 * Component for the uneditable display version of a user's profile.
 */

import React from "react";
import { Form, FormGroup, Label, Input, Col } from "reactstrap";

export default function DisplayProfile(props) {
  // Get user details from the calling Profile page
  const user = props.user;

  // Make the allergens print in a more 'beautiful' way
  const prettyAllergens = user.allergens.toString().replace(",", ", ");

  return (
    <div className="staticProfile">
      <Form>
        <FormGroup row>
          <Label for="userEmail" sm={4}>
            Email
          </Label>
          <Col sm={8}>
            <Input
              plaintext
              type="email"
              name="email"
              id="userEmail"
              value={user.email}
              readonly
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="userFirstName" sm={4}>
            First Name
          </Label>
          <Col sm={8}>
            <Input
              plaintext
              type="text"
              name="firstName"
              id="userFirstName"
              value={user.firstName}
              readonly
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="userLastName" sm={4}>
            Last Name
          </Label>
          <Col sm={8}>
            <Input
              plaintext
              type="text"
              name="lastName"
              id="userLastName"
              value={user.lastName}
              readonly
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="userAllergens" sm={4}>
            Allergens
          </Label>
          <Col sm={8}>
            <Input
              plaintext
              type="text"
              name="allergens"
              id="userAllergens"
              value={prettyAllergens}
              readonly
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="userSeverity" sm={4}>
            Symptom Severity
          </Label>
          <Col sm={8}>
            <Input
              plaintext
              type="text"
              name="severity"
              id="userSeverity"
              value={user.severity}
              readonly
            />
          </Col>
        </FormGroup>
      </Form>
    </div>
  );
}
