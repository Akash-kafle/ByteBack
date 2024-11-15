import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login"
<<<<<<< HEAD
import Signup from "./components/Signup";
=======
import Dropoff from "./components/Dropoff";
>>>>>>> 0d0040acd69c82f611257fbce7fa8e023829d9eb


const App = () => {
  return (
    <>
      <div className="">
        <Routes>
          <Route path="/" element={<Dashboard />} />  
          <Route path="/login" element={<Login/>}/>
<<<<<<< HEAD
          <Route path="/sign-up" element={<Signup />}/>
=======
          <Route path="/dropoff" element={<Dropoff />} />
>>>>>>> 0d0040acd69c82f611257fbce7fa8e023829d9eb
        </Routes>
      </div>
    </>
  );
};

export default App;
