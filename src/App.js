import React from "react";

import {  Routes, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Course from "./MyComponents/Course";






function App() {
 

  return (
    <>
    
      <Routes>
    
        <Route path="/" exact={true} element={<Course />}></Route>
      </Routes>
   
     
    </>
  );
}

export default App;
