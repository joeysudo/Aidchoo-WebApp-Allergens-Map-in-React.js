/**
 * Component for the Delete button on Edit profile.
 * On click, deletes user's profile.
 */
import React, { useState } from "react";
import { Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import { getToken, removeUserSession } from "../utils/session";
import axios from "axios";

export default function DeleteProfile() {
  // Use history for successful delete redirect
  let history = useHistory();

  // Set states for request status
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function that specifies behaviour if delete is clicked
  const handleDelete = () => {
    setError(null);
    setLoading(true);

    // Confirm the current user has rights to delete this profile
    const token = getToken();
    const options = {
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    };

    // Delete the user from the database
    axios
      .delete(process.env.REACT_APP_API_URL + "/user/profile", options)
      .then((response) => {
        removeUserSession();
        setLoading(false);
        // Redirect to Home and reload
        history.push("/");
        window.location.reload();
      })
      .catch((error) => {
        setLoading(false);
        setError("Oops. Something went wrong try again.");
      });
  };

  // Check if user is sure they want to proceed
  const confirmDelete = () => {
    if (
      window.confirm(
        "Are you sure you want to delete your profile? This can't be undone."
      )
    ) {
      handleDelete();
    }
  };

  return (
    <div>
      <Button
        type="button"
        color="danger"
        onClick={confirmDelete}
        disabled={loading}
      >
        {" "}
        {loading ? "Loading..." : "Delete"}
      </Button>
      {error && (
        <>
          <small style={{ color: "red" }}>{error}</small>
          <br />
        </>
      )}
      <br />
    </div>
  );
}
