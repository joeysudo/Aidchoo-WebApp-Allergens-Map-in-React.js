/**
 * Page which contains the map that marks out allergen trees.
 *
 * Location fetching code adapted from Google Maps Platform
 * - Geolocation: Displaying User or Device Position on Maps
 * by Google Developers
 */

import React, { useState } from "react";
import MapContainer from "../components/MapTrees";
import MapNearbyContainer from "../components/MapNearby";
import { Button, Alert } from "reactstrap";
import { getToken } from "../utils/session";

import mapGraphic from "../assets/location.svg";

// Define closeness threshold for trees fetched from users location
const NEARBY_METRES = 500;

export default function MapAllTree() {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [activeButton, setActiveButton] = useState("Emporium");
  const [selected, setSelected] = useState(0);
  const [locationErr, setLocationErr] = useState(null);

  const [visibleAlert, setVisible] = useState(true);
  const onDismiss = () => {
    setVisible(false);
    setLocationErr(null);
  };

  // Set the selected location as active when the relevant button clicked
  const setLocation = (name, index) => {
    setSelected(index);
    setActiveButton(name);
  };

  // Handle error when Geolocation fails
  const handleLocationError = (browserHasGeolocation) => {
    let error = browserHasGeolocation
      ? "Oops. The location service failed. Please check your browser settings."
      : "Oops. Your browser doesn't support getting your location.";
    setLocationErr(error);
    setVisible(true);
  };

  // Get the user's location from browser and save it
  const setUserLocation = () => {
    if (!getToken()) {
      setLocationErr("Oops. Please log in to view this feature!");
      setVisible(true);
      return;
    }

    // Try getting user's location from browser
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setActiveButton("UserLocation");
        },
        () => {
          // Location service error
          handleLocationError(true);
        },
        { enableHighAccuracy: true }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false);
    }
  };

  // Determine if should show standard locations map or user location map
  let map;
  if (activeButton === "UserLocation") {
    map = (
      <MapNearbyContainer lat={latitude} lon={longitude} dist={NEARBY_METRES} />
    );
  } else {
    map = <MapContainer selected={selected} />;
  }

  return (
    <section id="hero" className="d-flex align-items-center">
      <div className="container">
        <div className="row">
          <div
            className="col-lg-6 d-lg-flex flex-lg-column justify-content-center align-items-stretch pt-5 pt-lg-0 order-2 order-lg-1"
            data-aos="fade-up"
          >
            <div className="card-body">
              <h1>Allergen Trees in Melbourne</h1>
              <p>
                All marked trees have potential to trigger allergen symptoms.
                Click one to learn its name! Trees marked in orange are
                currently in peak pollen producing season and may be higher
                risk.
              </p>
            </div>
            <div className="mapbuttoncontainer">
              <p>
                Click a button to see the allergen trees nearby these popular
                locations:{" "}
              </p>
              <div className="dropdown">
                <button
                  type="button"
                  className="btn btn-primary dropdown-toggle"
                  data-toggle="dropdown"
                >
                  Find Allergen Tree By Location
                </button>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  <Button
                    id="map-btn"
                    color="warning"
                    onClick={() => setLocation("Emporium", 0)}
                    disabled={activeButton === "Emporium"}
                  >
                    Emporium
                  </Button>
                  <Button
                    id="map-btn"
                    color="success"
                    onClick={() => setLocation("Flinders", 1)}
                    disabled={activeButton === "Flinders"}
                  >
                    Flinders St Station
                  </Button>
                  <Button
                    id="map-btn"
                    color="info"
                    onClick={() => setLocation("StateLib", 2)}
                    disabled={activeButton === "StateLib"}
                  >
                    The State Library
                  </Button>
                  <Button
                    id="map-btn"
                    color="primary"
                    onClick={() => setLocation("NGV", 3)}
                    disabled={activeButton === "NGV"}
                  >
                    NGV
                  </Button>
                  <Button
                    id="map-btn"
                    color="success"
                    onClick={() => setLocation("SCross", 4)}
                    disabled={activeButton === "SCross"}
                  >
                    Southern Cross Station
                  </Button>
                  <Button
                    id="map-btn"
                    color="info"
                    onClick={() => setLocation("Flagstaff", 5)}
                    disabled={activeButton === "Flagstaff"}
                  >
                    Flagstaff Gardens
                  </Button>
                  <Button
                    id="map-btn"
                    color="primary"
                    onClick={() => setLocation("REB", 6)}
                    disabled={activeButton === "REB"}
                  >
                    Royal Exhibition Building
                  </Button>
                  <Button
                    id="map-btn"
                    color="success"
                    onClick={() => setLocation("Unimelb", 7)}
                    disabled={activeButton === "Unimelb"}
                  >
                    Unimelb Babel Building
                  </Button>
                </div>
              </div>
              <br />
              <p>Get allergen trees nearby your current location: </p>
              <div className="dropdown">
                <Button
                  id="map-btn"
                  color="warning"
                  onClick={() => setUserLocation()}
                  disabled={activeButton === "UserLocation"}
                >
                  See Trees Near Me!
                </Button>
                {locationErr && (
                  <>
                    <Alert
                      color="info"
                      isOpen={visibleAlert}
                      toggle={onDismiss}
                    >
                      {locationErr}
                    </Alert>
                  </>
                )}
              </div>
            </div>
          </div>
          <div
            className="col-lg-6 d-lg-flex flex-lg-column align-items-stretch order-1 order-lg-2 hero-img"
            data-aos="fade-up"
          >
            <img src={mapGraphic} className="img-fluid" alt=""></img>
          </div>
        </div>
        <div className="mapcontainer">{map}</div>
      </div>
    </section>
  );
}
