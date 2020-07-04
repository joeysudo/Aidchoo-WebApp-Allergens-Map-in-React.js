/**
 * Page that renders the dashboard of daily allergen readings.
 * User must be logged in to access this page as tip feature is calculated from
 * their registered allergens.
 */

import React, { Component } from "react";
import { getUser } from "../utils/session";
import DashboardReadings from "../components/DashboardReadings";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { user: getUser() };
  }

  componentDidMount() {
    // Get the current user from session storage
    const currUser = getUser();
    if (this.state.user !== currUser) {
      this.setState({ user: currUser });
    }
  }

  render() {
    return (
      <div>
        {" "}
        <DashboardReadings user={this.state.user} />{" "}
      </div>
    );
  }
}
