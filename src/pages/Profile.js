/**
 * Profile page. User can view and edit their profile from here.
 * Displays static profile initially and editable version once "Edit" is pressed.
 */

import React, { useState } from "react";
import { getUser } from "../utils/session";
import DisplayProfile from "../components/DisplayProfile";
import EditProfile from "../components/EditProfile";
import EditPassword from "../components/EditPassword";
import { Button } from "reactstrap";
import profileGraphic from "../assets/person.svg";

export default function Profile(props) {
  // Get details of the current user stored in the session
  const currUser = getUser();
  // State to help determine if edit mode is on or off
  const [edit, setEdit] = useState(false);
  const [newPassword, setPassword] = useState(false);

  // If edit is pressed, update edit state
  const handleEdit = () => {
    setEdit(true);
  };
  const handlePassword = () => {
    setPassword(true);
  };

  // If cancel is pressed, revert to display state
  const handleCancel = () => {
    setEdit(false);
    setPassword(false);
  };

  // Render different profiles and buttons depending on edit or display mode
  let profile;
  let donebutton;
  let pwbutton;
  let editbutton;
  if (edit) {
    profile = <EditProfile user={currUser} />;
    donebutton = (
      <Button
        style={{
          paddingLeft: 40,
          paddingRight: 40,
          paddingTop: 10,
          paddingBottom: 10,
          backgroundColor: "#515f7d",
          color: "#fff",
          fontWeight: 900,
          border: 0,
          margin: 20,
        }}
        onClick={handleCancel}
      >
        {" "}
        Done{" "}
      </Button>
    );
  } else if (newPassword) {
    profile = <EditPassword user={currUser} />;
    donebutton = (
      <Button
        style={{
          paddingLeft: 60,
          paddingRight: 60,
          paddingTop: 10,
          paddingBottom: 10,
          backgroundColor: "#515f7d",
          color: "#fff",
          fontWeight: 900,
          border: 0,
          margin: 20,
        }}
        onClick={handleCancel}
      >
        {" "}
        Done{" "}
      </Button>
    );
  } else {
    profile = <DisplayProfile user={currUser} />;
    editbutton = (
      <Button
        style={{
          paddingLeft: 80,
          paddingRight: 80,
          paddingTop: 10,
          paddingBottom: 10,
          backgroundColor: "#515f7d",
          color: "#fff",
          fontWeight: 900,
          border: 0,
          margin: 20,
        }}
        onClick={handleEdit}
      >
        Edit Profile
      </Button>
    );
    pwbutton = (
      <Button
        style={{
          paddingLeft: 60,
          paddingRight: 60,
          paddingTop: 10,
          paddingBottom: 10,
          backgroundColor: "#515f7d",
          color: "#fff",
          fontWeight: 900,
          border: 0,
          margin: 20,
        }}
        onClick={handlePassword}
      >
        Update Password
      </Button>
    );
  }

  return (
    <section id="hero" className="d-flex align-items-center">
      <div className="container">
        <div className="row">
          <div
            className="col-lg-6 d-lg-flex flex-lg-column justify-content-center align-items-stretch pt-5 pt-lg-0 order-2 order-lg-1"
            data-aos="fade-up"
          >
            <h1> Hi {currUser.firstName}!</h1>
            <h2>You can view and edit your profile below.</h2>
            <div className="row justify-content-md-center">
              {profile}
              <br />
            </div>
          </div>
          <div
            className="col-lg-6 d-lg-flex flex-lg-column align-items-stretch order-1 order-lg-2 hero-img"
            data-aos="fade-up"
          >
            <img src={profileGraphic} className="img-fluid" alt=""></img>
          </div>
        </div>
        {pwbutton}
        {editbutton}
        {donebutton}
      </div>
    </section>
  );
}
