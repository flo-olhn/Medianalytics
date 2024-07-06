'use client'

import { useEffect } from "react";
import { getFacebookLoginStatus, initFacebookSdk, fbLogin } from "@/app/lib/initFBSDK";

export default function FBInit() {
    useEffect(() => {
      console.log("Started use effect");
      initFacebookSdk().then(() => {
        getFacebookLoginStatus().then((response) => {
          if (response == null) {
            console.log("No login status for the person");
          } else {
            console.log(response);
          }
        });
      });
    }, []);


    function login() {
        console.log("reached log in button");
        fbLogin().then((response) => {
        console.log(response);
        if (response.status === "connected") {
            console.log("Person is connected");
        } else {
            // something
        }
        });
    }

    
    return (
        <>
          <button onClick={login}>Login</button>
        </>
    );
}