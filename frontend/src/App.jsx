import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/dashboard";
import Login from "./components/Login"
import Dropoff from "./components/Dropoff";
import Signup from "./components/Signup";


const App = () => {
  return (
    <>
      <div className="">
        <Routes>
          <Route path="/" element={<Dashboard />} />  
          <Route path="/login" element={<Login/>}/>
          <Route path="/sign-up" element={<Signup />}/>
          <Route path="/dropoff" element={<Dropoff />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
