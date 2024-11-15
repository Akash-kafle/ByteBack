import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import CSS for the datepicker
import { NavLink } from "react-router-dom";

const Signup = () => {
  const [dob, setDob] = useState(null); // State to store the selected date

  const handleDateChange = (date) => {
    setDob(date); // Update the dob state when the date is selected
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-200 to-teal-200">
      {/* Decorative background elements */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(45%_25%_at_50%_50%,rgba(34,197,94,0.05)_0%,rgba(126,231,135,0)_100%)] pointer-events-none" />
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(35%_35%_at_80%_20%,rgba(16,185,129,0.05)_0%,rgba(52,211,153,0)_100%)] pointer-events-none" />

      <div className="p-6 max-w-7xl mx-auto">
        {/* Registration Form */}
        <form className="flex flex-col gap-6 max-w-sm mx-auto mt-[60px] p-6 rounded-x/60 backdrop-blur-md rounded-2xl  bg-green-100">
          {/* Title Section */}
          <p className="text-2xl font-semibold tracking-tight  text-green-500 flex items-center justify-center mb-8">
            Register
          </p>

          {/* Name Fields Section */}
          <div className="flex gap-6">
            <div className="w-1/3">
              <label className="text-sm text-gray-500">First</label>
              <input
                className="  w-full px-3 py-2 rounded-lg"
                type="text"
                required
              />
            </div>

            <div className="w-1/3">
              <label className="text-sm text-gray-500">Middle</label>
              <input
                className="  w-full px-3 py-2 rounded-lg"
                type="text"
                required
              />
            </div>

            <div className="w-1/3">
              <label className="text-sm text-gray-500">Last</label>
              <input
                className="  w-full px-3 py-2 rounded-lg "
                type="text"
                required
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label className="text-sm text-gray-500">Email</label>
            <input
              className="  w-full px-3 py-2 rounded-lg"
              type="email"
              required
            />
          </div>

          {/* Date of Birth Field */}
          <div className="flex flex-col">
            <label className="text-sm text-gray-500 mb-2">Date of Birth</label>
            <DatePicker
              selected={dob}
              onChange={handleDateChange}
              className="  w-full px-3 py-2 rounded-lg "
              dateFormat="mm/dd/yyyy"
              placeholderText="mm/dd/yyyy"
              showYearDropdown
              yearDropdownItemNumber={100}
              scrollableYearDropdown
              calendarClassName="dark-datepicker"
            />
          </div>

          {/* Password Fields */}
          <div>
            <label className="text-sm text-gray-500">Password</label>
            <input
              className="  w-full px-3 py-2 rounded-lg"
              type="password"
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">Confirm Password</label>
            <input
              className="  w-full px-3 py-2 rounded-lg "
              type="password"
              required
            />
          </div>

          {/* Submit Button */}
          <button className=" bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500  py-3 px-6 rounded-lg border-none transition-all duration-300">
            Submit
          </button>

          {/* Sign-in Link */}
          <p className="text-sm text-gray-400 text-center mt-4">
            Already have an account?{" "}
            <NavLink
              to="/login"
              className="text-green-500 hover:text-green-600 font-semibold"
            >
              Sign in
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
