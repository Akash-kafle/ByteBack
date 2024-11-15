import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/dashboard";
import Login from "./components/Login";
import Dropoff from "./components/Dropoff";
import Signup from "./components/Signup";
import Recycle from "./components/Recycle";
import Tracking from "./components/Tracking";
import Navbar from "./components/Navbar";
import About from "./components/About";

import Profile from "./components/Profile";
import Landing from "./components/Landing";

const App = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-[100vh]">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dash" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/dropoff" element={<Dropoff />} />
          <Route path="/tracking" element={<Tracking />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="tracking" element={<Tracking />} />
          <Route path="/about" element={<About />} />
          <Route path="/tracking" element={<Tracking />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/recycle" element={<Recycle />} />
          <Route path="/" element={<Dashboard />} />
          {/* <Route path="/navbar" element={<Navbar />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/dropoff" element={<Dropoff />} />
          <Route path="tracking" element={<Tracking />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
