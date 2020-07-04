/**
 * The home page. Contains basic about info and links to main features.
 */

import React from "react";

import homeGraphic from "../assets/home.png";
import treeGraphic from "../assets/botanical.png";
import mapGraphic from "../assets/pin.png";

export default function Home() {
  return (
    <div className="Home">
      <section id="hero" className="d-flex align-items-center">
        <div className="container">
          <div className="row">
            <div
              className="col-lg-6 d-lg-flex flex-lg-column justify-content-center align-items-stretch pt-5 pt-lg-0 order-2 order-lg-1"
              data-aos="fade-up"
            >
              <div>
                <h1>Helping Hay Fever sufferers in Melbourne</h1>
                <h2>
                  You sneezed and we listened! We're currently under
                  construction, but have look around.
                </h2>
                <a href="/login" className="download-btn">
                  {" "}
                  <nav>
                    <img src={treeGraphic} className="img-button" alt="" />{" "}
                  </nav>{" "}
                  Login/SignUp
                </a>
                <a href="/map" className="download-btn">
                  <nav>
                    <img src={mapGraphic} className="img-button" alt="" />
                  </nav>{" "}
                  Allergen Map
                </a>
              </div>
            </div>
            <div
              className="col-lg-6 d-lg-flex flex-lg-column align-items-stretch order-1 order-lg-2 hero-img"
              data-aos="fade-up"
            >
              <img src={homeGraphic} className="img-fluid" alt=""></img>
            </div>
          </div>
        </div>
      </section>

      <div id="homeMessage" className="jumbotron jumbotron-fluid">
        <div className="container">
          <h2> Hay Fever sucks. We want to make it easier.</h2>
          <p className="lead">
            Hay fever (allergic rhinitis) and asthma triggered by pollen, seeds
            of certain flora and weather conditions can cause great discomfort
            and reduction to quality of life. In Melbourne, a place colloquially
            regarded as an “allergy capital”, people with these conditions can
            run into areas that aggravate their symptoms when getting around the
            city. Due to limited resources available for sufferers to plan and
            prepare, they can often be blindsided by these environmental
            triggers. Our job is to offer all relevant information in one place
            in an easy-to-digest format.
          </p>
        </div>
      </div>
      <div className="container">
        <div className="d-flex">
          <div id="prompt" className="ml-auto p-2">
            <h3>
              "You're lucky if you get time to sneeze in this phenomenal world."
            </h3>
            <p>J.D. Salinger (Franny and Zooey)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
