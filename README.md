# Aidchoo

This repo houses the assets used to build the Aidchoo front end, available at https://aidchoo.netlify.app/

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

To check our back end repository see https://github.com/joeysudo/aidchoo-back

You can access our backend API https://aidchoo2.herokuapp.com/

## Problem Statement

Hay fever (allergic rhinitis) and pollen sensitivity causes great discomfort and reduction to quality of life. In Melbourne, a city colloquially regarded as an allergy capital, people with the condition run into areas that aggravate their symptoms when getting around the city. Due to limited resources available for sufferers to plan and prepare, they are often blindsided by pollen hotspots and other environmental triggers.

## References

The frontend portion of this project lives with the great help of these resources.

### React.js

- React docs - [source](https://reactjs.org/docs/getting-started.html)

### Styling Libraries

- Boostrap Frontend - [source](https://getbootstrap.com/)
- reactstrap - [source](https://reactstrap.github.io/)

### Tutorials

- ClueMediator.com - Login App – Create login form in ReactJS using secure REST API – Part 3 - by Clue Mediator [source](https://www.cluemediator.com/)
- StartBoostrap - Flexbox Sticky Footer - by David Miller [source](https://startbootstrap.com/snippets/sticky-footer-flexbox/)
- UpMostly - setInterval in React Components Using Hooks - by James King [source](https://upmostly.com/tutorials/setinterval-in-react-components-using-hooks)
- DEV.TO - How to use the Google Maps API with React.js - by Jessica Betts [source](https://dev.to/jessicabetts/how-to-use-google-maps-api-and-react-js-26c2)
- Google Maps Platform - Geolocation: Displaying User or Device Position on Maps - by Google Developers [source](https://developers.google.com/maps/documentation/javascript/geolocation)

### Assests

- PNGFuel - Boy Sneezing Clipart - [source](https://www.pngfuel.com/free-png/rjdmi)
- PNGFuel - Girl Allergy Clipart - [source](https://www.pngfuel.com/free-png/rjdat)
- FLATICON - Map Icon - [source](https://www.flaticon.com/free-icon/location_2928892?term=location&page=1&position=2)
- FLATICON - User Icon - [source](https://www.flaticon.com/free-icon/man_2922510?term=profile&page=2&position=12)
- FLATICON - Magnifying Glass - [source](https://www.flaticon.com/free-icon/statistics_2920349?term=data%20graph&page=1&position=2)
- Icons8 - Big Tree Icon - [source](https://icons8.com/icon/pack/plants/doodle)
- Icons8 - Tree in Wind Icon - [source](https://icons8.com/icon/pack/plants/doodle)

## Main features

To test, go to https://aidchoo.netlify.app/ and try these features out for yourself!

### 1. User Feature

#### a. Log in and Log out

<br>https://aidchoo.netlify.app/login

From the front end, a user is able to login.
Once logged in, they can access the dashboard feature.

Log out is accessible from within the nav bar once logged in and should work as expected.

Here's a demo account to test this:
<br>email: "marker@goodmarks.com" passowrd: "ajay1"

#### b. Sign up

<br>https://aidchoo.netlify.app/signup

If a user doesn't have an account they can create one by signing up.
Upon successful sign-up user gets logged in and redirected to the dashboard page.

#### c. Edit Profile

<br>https://aidchoo.netlify.app/profile

A user can edit their profile by heading to the profile page once logged in.
From here they are able to adjust any fields.

### 2. Dashboard Feature

<br>https://aidchoo.netlify.app/dashboard

Once logged, in a user is able to access the daily pollen readings and a custom tip from the allergen dashboard.
For information on how these readings are sourced, please check out our back end repository.

### 3. Map

<br>https://aidchoo.netlify.app/map

Select a button from the drop down to view allergen trees within 500m of popular locations in Melb or
(if you are close enough to the CBD) click the button to view trees via your browser fetched
location.
