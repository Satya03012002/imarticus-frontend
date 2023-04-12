import React from "react";

import {  Routes, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Course from "./MyComponents/Course";

import { GoogleOAuthProvider } from '@react-oauth/google';
import Login from "./MyComponents/Login";
import Page1 from "./MyComponents/Page1";


//https://accounts.google.com/gsi/select?client_id=875899315313-9fvbvpnb1psmi0efm9eht2oa98i1kd3i.apps.googleusercontent.com&ux_mode=popup&ui_mode=card&as=%2BiEax89VxoeBj6wruS%2FTNw&channel_id=67c5b141e60beb62e7c33d3f5107b6febaaa88e651ffe548a7fe10c8af54b42d&origin=http%3A%2F%2Flocalhost%3A3000


function App() {
  // const CLIENT_ID = process.env.CLIENT_ID
  // console.log(CLIENT_ID)
  const {  CLIENT_ID } = process.env;
  console.log(CLIENT_ID)

  return (
    <>
    <GoogleOAuthProvider clientId="1023644875961-6di7ndbrkr42rg9q2rd4u2n0je6b7kde.apps.googleusercontent.com">
      <Routes>
      
    
        <Route path="/course" exact={true} element={<Course />}></Route>
        <Route path="/" exact={true} element={<Login />}></Route>
        <Route path="/signin" exact={true} element={<Page1  />}></Route>
      </Routes>
      </GoogleOAuthProvider>
     
    </>
  );
}

export default App;
