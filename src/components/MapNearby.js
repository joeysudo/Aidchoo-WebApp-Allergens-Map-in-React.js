/**
 * Component to render trees that are nearby the user's provided location.
 *
 * This code is adapted from
 * DEV.TO - How to use the Google Maps API with React.js
 * by Jessica Betts
 */

import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import axios from "axios";
import Loading from "./Loading";

import InSeasonMarker from "../assets/pollen.svg";
import TreeMarker from "../assets/tree.svg";

// For default google map zoom
const DEFAULT_ZOOM = 18;

// Function to set the type of marker given the pollen season
const setMarkerURL = (tree) => {
  let markerURL;

  if (tree.inSeason) {
    markerURL = InSeasonMarker;
  } else {
    markerURL = TreeMarker;
  }
  return markerURL;
};

export class MapNearbyContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      error: null,
      selectedTree: "",
      visible: false,
    };
  }

  // Determine if a tree is high risk, based on whether it's in season
  pollenRisk(inSeason) {
    if (inSeason) {
      return "Yes. Avoid this tree if possible.";
    } else {
      return "No.";
    }
  }

  componentDidMount() {
    this.setState({ loading: true });

    axios
      .post(process.env.REACT_APP_API_URL + "/map/trees/nearby", {
        longitude: this.props.lon,
        latitude: this.props.lat,
        distance: this.props.dist,
      })
      .then((response) => {
        this.setState({ trees: response.data });
        this.setState({ loading: false });
      })
      .catch((error) => {
        this.setState({ loading: false });
        this.setState({
          error:
            "Oops. An error occurred while loading. Please try again later.",
        });
      });

    // If no trees are found, return error message instead
    if (this.state.data.length === 0) {
      this.setState({
        error: "Oh! It looks like you are too far away from the Melbourne CBD!",
      });
    }
  }

  render() {
    // If fetching data, return loading box
    if (this.state.loading) {
      return (
        <div>
          <Loading />
        </div>
      );
    }

    // If error occurrs, show error message
    if (this.state.error) {
      return (
        <div className="floating-panel">
          <br />
          <br />
          <br />
          <h1>
            <br />
            {this.state.error}
          </h1>
        </div>
      );
    }

    return (
      <Map
        google={this.props.google}
        zoom={DEFAULT_ZOOM}
        style={{ width: "100%", height: "480px", display: "block" }}
        initialCenter={{ lat: this.props.lat, lng: this.props.lon }}
      >
        <Marker position={{ lat: this.props.lat, lng: this.props.lon }} />

        {this.state.data.map((tree) => (
          <Marker
            key={tree._id}
            position={{
              lat: tree.latitude,
              lng: tree.longitude,
            }}
            icon={{
              url: setMarkerURL(tree),
              scaledSize: new window.google.maps.Size(30, 30),
            }}
            onClick={() => this.setState({ selectedTree: tree, visible: true })}
          />
        ))}

        <InfoWindow
          position={{
            lat: this.state.selectedTree.latitude,
            lng: this.state.selectedTree.longitude,
          }}
          visible={this.state.visible}
          onCloseClick={() =>
            this.setState({ selectedTree: null, visible: false })
          }
        >
          <div>
            <h2>{this.state.selectedTree.commonName}</h2>
            <p>
              Pollen Season: {this.state.selectedTree.season}
              <br />
              Currently high allergen risk?{" "}
              <strong>
                {this.pollenRisk(this.state.selectedTree.inSeason)}
              </strong>{" "}
            </p>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

// Create custom container for while the map loading
const loadingDiv = (props) => (
  <div>
    <Loading />
  </div>
);

export default GoogleApiWrapper({
  apiKey: "AIzaSyAsQQ8pFshOroZT4UgAwScz4Y1YtYYfRro",
  LoadingContainer: loadingDiv,
})(MapNearbyContainer);
