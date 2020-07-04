/**
 * Component for the navigation menu that displays when a user is logged in.
 * Expanded selection of page links displayed and handles log out.
 */

import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { removeUserSession } from "../utils/session";
import { useHistory, Link } from "react-router-dom";
import { NavLink as ReactLink } from "react-router-dom";

function UserMenu(props) {
  // Use history for successful logout redirect
  let history = useHistory();

  // Set states to toggle the navbar
  // Adapted from reactstrap docs
  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);

  // Upon log out, destroy the session and redirect to home
  const handleLogout = () => {
    removeUserSession();
    history.push("/");
    window.location.reload();
  };

  return (
    <div>
      <Navbar color="faded" light>
        <NavbarBrand href="/" className="mr-auto">
          Aidchoo
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink
                exact
                tag={ReactLink}
                activeClassName="active"
                to="/map"
                onClick={toggleNavbar}
              >
                {" "}
                Map
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                tag={ReactLink}
                activeClassName="active"
                to="/dashboard"
                onClick={toggleNavbar}
              >
                Dashboard
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                tag={ReactLink}
                activeClassName="active"
                to="/profile"
                onClick={toggleNavbar}
              >
                Profile
              </NavLink>
            </NavItem>
            <NavItem>
              <br />
              <Link tag={ReactLink} onClick={handleLogout} to="/">
                Logout
              </Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default UserMenu;
