import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login"
import Signup from "./components/Signup";
import Dropoff from "./components/Dropoff";


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
