/**
 * Component to render the loading messages while
 * the map feature is fetching and marking trees.
 *
 * Parts of the below code are adapted from
 * UpMostly - setInterval in React Components Using Hooks
 * by James King
 */

import React, { useState, useEffect } from "react";
import { Spinner } from "reactstrap";

// Loading messages for the component to cycle through
const LOADING_MESSAGES = [
  "Finding Trees",
  "Smelling the Flowers",
  "Taking an Antihistamine",
  "Meditating in The Systems Garden",
  "Catching a Tram",
  "Watching an Attenborough Doco",
  "Having an Espresso Somewhere in Fitzroy",
  "Admiring Magpies",
  "Sprinting Through Carlton Gardens",
  "Painting Local Fauna",
  "Harnessing Flower Power",
  "Embracing The Chaos",
  "Buying Dip at QVM",
  "Catching a Gig at The Jazzlab",
  "Eating a 5 & Dime Bagel",
  "Brushing Up On Our Biology",
  "Wearing a Kathmandu Puffer Jacket",
];

function Loading() {
  const [loadingMsg, setLoadingMsg] = useState(LOADING_MESSAGES[0]);

  // Every 2 or so seconds, change the loading message
  useEffect(() => {
    let currMsg = 0;
    const interval = setInterval(() => {
      setLoadingMsg(LOADING_MESSAGES[currMsg]);
      if (currMsg === LOADING_MESSAGES.length - 1) {
        currMsg = 0;
      } else {
        currMsg += 1;
      }
    }, 2300);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-container">
      <div className="mapLoading">
        <div className="loadingMessage">
          <h1>{loadingMsg}</h1>
        </div>
        <br />
        <div className="spinner">
          <Spinner color="secondary" />
        </div>
      </div>
    </div>
  );
}

export default Loading;
