/**
 * Component for the navigation menu that displays when a user is not logged in.
 * Has restricted nav options compared to UserMenu component for when user is logged in.
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
import { NavLink as ReactLink } from "react-router-dom";

function GuestMenu() {
  // Set states to toggle the navbar
  // Adapted from reactstrap docs
  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);

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
                tag={ReactLink}
                exact
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
                to="/login"
                onClick={toggleNavbar}
              >
                Login/Signup
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default GuestMenu;
