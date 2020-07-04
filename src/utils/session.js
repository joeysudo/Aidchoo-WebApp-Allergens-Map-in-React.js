/**
 * Utilities for managing authentication and storage of the current user in session storage.
 *
 * The below code is heavily adapated from
 * ClueMediator - Create login form in ReactJS: Login App Tutorial
 * by ClueMediator
 */

// Return the user data from the session storage
export const getUser = () => {
  const userStr = sessionStorage.getItem("user");
  if (userStr) return JSON.parse(userStr);
  else return null;
};

// Return the token from the session storage
export const getToken = () => {
  return sessionStorage.getItem("token") || null;
};

// Remove the token and user from the session storage
export const removeUserSession = () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");
};

// Set the token and user from the session storage
export const setUserSession = (token, user) => {
  sessionStorage.setItem("token", token);
  sessionStorage.setItem("user", JSON.stringify(user));
};

// Update the user in the session but keep the same token
// For use in the event changes are made to their profile in the same session
export const updateUser = (user) => {
  sessionStorage.setItem("user", JSON.stringify(user));
};
