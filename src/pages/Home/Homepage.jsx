import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export default function Homepage() {
  const [user, setUser] = useState({});

  function handleCallbackResponse(response) {
    console.log("token: ", response.credential);
    var UserObject = jwtDecode(response.credential);
    console.log(UserObject);
    setUser(UserObject);
    document.getElementById("signIn").hidden = true;
  }

  function handleSignOut(e) {
    setUser({});
    document.getElementById("signIn").hidden = false;
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "417041141509-495v48nc29snmejlojgaj49pq8ck3ukn.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });
    google.accounts.id.renderButton(document.getElementById("signIn"), {
      theme: "outline",
      size: "large",
    });
  }, []);

  return (
    <>
      <div id="signIn"></div>
      {
        Object.keys(user).length !== 0 && <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
      }

      
      {user && 
        <div>
          <h3> {user.name} {user.email}</h3>
          <img src={user.picture}></img>
        </div>
      }
    </>
  );
}
