/**
 * Component for the page footer that displays Copyright information
 *
 * The below code is adapted from
 * StartBoostrap - Flexbox Sticky Footer - by David Miller
 */

import React from "react";

export default function Footer() {
  return (
    <div className="footer">
      <footer id="sticky-footer" className="py-4 text-dark-50">
        <div className="container text-center">
          <small>
            Copyright &copy; Aidchoo 2020 - A project for INFO30005{" "}
          </small>
        </div>
      </footer>
    </div>
  );
}
