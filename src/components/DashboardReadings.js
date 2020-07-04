/**
 * Component that renders the dashboard of daily allergen readings.
 */

import React, { useState, useEffect } from "react";
import { Alert, Card, CardImg, CardText, CardBody, CardDeck } from "reactstrap";
import { getToken } from "../utils/session";
import axios from "axios";

import dashGraphic from "../assets/search.svg";
import treeImg from "../assets/tree2.svg";
import grassImg from "../assets/grass.svg";
import pollutionImg from "../assets/co2.svg";
import EmptyPic from "../assets/empty.jpg";
import VLowPic from "../assets/darkgreen-test.jpg";
import LowPic from "../assets/green-test.jpg";
import ModPic from "../assets/yellow-test.jpg";
import HighPic from "../assets/orange-test.jpg";
import VHighPic from "../assets/red-test.jpg";

// To circumvent errors when initially loading the component
const EMPTY_DATA = {
  treePollen: { index: "", level: "" },
  grassPollen: { index: "", level: "" },
  pollution: { index: "", level: "" },
  tip: { allergen: "", severity: "", message: "" },
};

// Gets the appropriate picture asset for the level
function getLevelColour(level) {
  if (level === 1) {
    return VLowPic;
  } else if (level === 2) {
    return LowPic;
  } else if (level === 3) {
    return ModPic;
  } else if (level === 4) {
    return HighPic;
  } else if (level === 5) {
    return VHighPic;
  } else {
    return EmptyPic;
  }
}

// Gets the appropriate alert colour based on user severity
// Output based on the types of alerts in reactstrap
function getAlertColour(severity) {
  if (severity === "High") {
    return "danger";
  } else if (severity === "Medium") {
    return "warning";
  } else if (severity === "Low") {
    return "success";
  } else {
    return "secondary";
  }
}

export default function Dashboard(props) {
  const [error, setError] = useState(null);
  const [data, setData] = useState(EMPTY_DATA);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(props.user);

  // Get dashboard data from back end
  useEffect(() => {
    setUser(props.user);
    const token = getToken();
    const options = {
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    };
    axios
      .post(
        process.env.REACT_APP_API_URL + "/dashboard",
        { severity: props.user.severity, allergens: props.user.allergens },
        options
      )
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(
          "Oops. An error occurred while loading. Please try again later"
        );
        setLoading(false);
      });
  }, [props.user, user]);

  // If data hasn't been fetched yet, we want to wait
  if (loading) {
    return <h1 className="text-center">Loading dashboard...</h1>;
  }

  // Determine tip header line depending on whether user has allergens saved
  let tipHeader;
  let disclaimer;
  if (data !== "" && data.tip.allergen === "None") {
    tipHeader = <p>Todays' custom tip: </p>;
    disclaimer = (
      <small>Tips for sensititvity to Weeds not yet supported</small>
    );
  } else {
    tipHeader = (
      <p>
        Today's tip for those with {user.severity} symptom severity and{" "}
        {data.tip.allergen} sensitivity:{" "}
      </p>
    );
    disclaimer = null;
  }

  // Get the appropriate picture for each pollen type
  const treePic = getLevelColour(data.treePollen.index.level);
  const grassPic = getLevelColour(data.grassPollen.index.level);
  const polPic = getLevelColour(data.pollution.index.level);
  const alertColour = getAlertColour(user.severity);

  return (
    <section id="hero" className="d-flex align-items-center">
      <div className="container">
        <div className="row">
          <div
            className="col-lg-6 d-lg-flex flex-lg-column justify-content-center align-items-stretch pt-5 pt-lg-0 order-2 order-lg-1"
            data-aos="fade-up"
          >
            <h1>Allergen Dashboard</h1>
            <h2>Welcome. Here are today's allergen readings for Melbourne.</h2>
            {error && (
              <>
                <small style={{ color: "red" }}>{error}</small>
              </>
            )}
            <p>{tipHeader}</p>
            <Alert color={alertColour}>
              <p>{data.tip.message}</p>
              {disclaimer}
            </Alert>
          </div>
          <div
            className="col-lg-6 d-lg-flex flex-lg-column align-items-stretch order-1 order-lg-2 hero-img"
            data-aos="fade-up"
          >
            <img src={dashGraphic} className="img-fluid" alt=""></img>
          </div>
        </div>

        <CardDeck>
          <Card>
            <CardImg
              top
              className="card-img-top"
              width="100%"
              src={treePic}
              alt="tree level colour"
            />
            <CardBody>
              <div className="card-img-overlay">
                <img className="card-img" src={treeImg} alt="Tree Pollen" />
                <h3 className="heading">Level {data.treePollen.index.level}</h3>
              </div>
              <CardText>
                Tree pollen levels are {data.treePollen.index.category}.
              </CardText>
              <p> Sourced from Aidchoo Labs</p>
            </CardBody>
          </Card>
          <Card>
            <CardImg
              top
              className="card-img-top"
              width="100%"
              src={grassPic}
              alt="grass level colour"
            />
            <CardBody>
              <div className="card-img-overlay">
                <img className="card-img" src={grassImg} alt="Tree Pollen" />
                <h3 className="heading">
                  Level {data.grassPollen.index.level}
                </h3>
              </div>
              <CardText>
                Grass pollen levels are {data.grassPollen.index.category}.
              </CardText>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.melbournepollen.com.au/"
              >
                Sourced from Melbourne Pollen (UoM)
              </a>
            </CardBody>
          </Card>
          <Card>
            <CardImg
              top
              className="card-img-top"
              width="100%"
              src={polPic}
              alt="pollution level colour"
            />
            <CardBody>
              <div className="card-img-overlay">
                <img
                  className="card-img"
                  src={pollutionImg}
                  alt="Tree Pollen"
                />
                <h3 className="heading">Level {data.pollution.index.level}</h3>
              </div>
              <CardText>
                Pollution levels are {data.pollution.index.category}.
              </CardText>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.epa.vic.gov.au/EPAAirWatch"
              >
                Sourced from EPA VIC
              </a>
            </CardBody>
          </Card>
        </CardDeck>
      </div>
    </section>
  );
}
