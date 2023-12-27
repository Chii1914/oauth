import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; // Corrected import
import Foo from "../Foo/Fooelement";
import { Outlet } from "react-router";

export default function Homepage() {
  const win = window.sessionStorage;
  const [user, setUser] = useState({});
  const [showSignIn, setShowSignIn] = useState(!win.getItem("token")); // Show if no token

  useEffect(() => {
    if (win.getItem("token")) {
      console.log("Token exists: ", win.getItem("token"));
      const userObject = jwtDecode(win.getItem("token"));
      setUser(userObject);
      setShowSignIn(false); // Hide signIn button
    }
  }, []);

  function handleCallbackResponse(response) {
    console.log("token: ", response.credential);
    const UserObject = jwtDecode(response.credential);
    console.log(UserObject);
    setUser(UserObject);
    win.setItem("token", response.credential);
    setShowSignIn(false); // Hide signIn button
  }

  function handleSignOut() {
    setUser({});
    win.clear();
    setShowSignIn(true); // Show signIn button
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "417041141509-495v48nc29snmejlojgaj49pq8ck3ukn.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    if (showSignIn) {
      google.accounts.id.renderButton(document.getElementById("signIn"), {
        theme: "outline",
        size: "large",
      });

      google.accounts.id.prompt();
    }
  }, [showSignIn]);

  return (
    <>
      {showSignIn && (
        <div>
          <h1>Home</h1>
          <h2>Página de lógin</h2>
          <div id="signIn"></div>
        </div>
      )}

      {Object.keys(user).length !== 0 && (
        <>
          <div>
            <h1>Página hija</h1>
            <h3>
              {user.name} {user.email}
            </h3>
            <Outlet />
            <img src={user.picture} alt="User" />
            <button onClick={handleSignOut}>Sign Out</button>
          </div>
        </>
      )}
    </>
  );
}
