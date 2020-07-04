/**
 * Component to render the menu based on whether a user is logged in our not
 */

import React, { Component } from "react";
import UserMenu from "./UserMenu";
import GuestMenu from "./GuestMenu";
import { getUser } from "../utils/session";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = { type: "user" };
  }

  componentDidMount() {
    // Get the current user from session storage
    const user = getUser();
    if (user) {
      this.setState({ type: "user" });
    } else {
      // If none exist, set user status to guest
      this.setState({ type: "guest" });
    }
  }

  render() {
    if (this.state.type === "user") {
      return <UserMenu />;
    }
    return <GuestMenu />;
  }
}

export default Menu;
