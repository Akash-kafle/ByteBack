import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { NavLink } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    dob: null,
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDateChange = (date) => {
    setFormData((prevData) => ({ ...prevData, dob: date }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      data = {
      // Format date to 'YYYY-MM-DD'
    }
      const response = await axios.post("http://127.0.0.1:8000/signup",  {
        username: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
        DOB: formData.dob.toISOString().split("T")[0]
      });

      if (response.data.status) {
        setSuccessMessage(response.data.message);
        setFormData({
          firstName: "",
          middleName: "",
          lastName: "",
          email: "",
          dob: null,
          password: "",
          confirmPassword: "",
        });
      }
    } catch (err) {
      setError(
        err.response?.data?.detail || "An error occurred during signup."
      );
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-r from-green-200 to-teal-200">
      <div className="p-6 max-w-7xl mx-auto">
        <form
          className="flex flex-col gap-6 max-w-sm mx-auto mt-[60px] p-6 rounded-x/60 backdrop-blur-md rounded-2xl bg-green-100"
          onSubmit={handleSubmit}
        >
          <p className="text-2xl font-semibold tracking-tight text-green-500 flex items-center justify-center mb-8">
            Register
          </p>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {successMessage && (
            <p className="text-green-500 text-sm">{successMessage}</p>
          )}

          <div className="flex gap-6">
            <div className="w-1/3">
              <label className="text-sm text-gray-500">First</label>
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg"
                type="text"
                required
              />
            </div>

            <div className="w-1/3">
              <label className="text-sm text-gray-500">Middle</label>
              <input
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg"
                type="text"
              />
            </div>

            <div className="w-1/3">
              <label className="text-sm text-gray-500">Last</label>
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg"
                type="text"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-500">Email</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg"
              type="email"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-500 mb-2">Date of Birth</label>
            <DatePicker
              selected={formData.dob}
              onChange={handleDateChange}
              className="w-full px-3 py-2 rounded-lg"
              dateFormat="MM/dd/yyyy"
              placeholderText="MM/DD/YYYY"
              required
              showYearDropdown
              scrollableYearDropdown
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">Password</label>
            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg"
              type="password"
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">Confirm Password</label>
            <input
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg"
              type="password"
              required
            />
          </div>

          <button className="bg-green-500 hover:bg-green-600 focus:outline-none py-3 px-6 rounded-lg border-none transition-all duration-300">
            Submit
          </button>

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
