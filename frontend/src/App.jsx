import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./components/dashboard";


const App = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen w-full bg-gradient-to-r from-purple-100 to-slate-100 ">
        <Routes>
          <Route path="/" element={<Dashboard />} />  
          
        </Routes>
      </div>
    </>
  );
};

export default App;
