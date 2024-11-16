import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import default styles

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
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

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const payload = {
        name: formData.fullName,
        email: formData.email,
        DOB: formData.dob ? formData.dob.toISOString().split("T")[0] : null,
        password: formData.password,
      };

      const response = await axios.post(
        "http://127.0.0.1:8000/signup",
        payload
      );

      if (response.data.status) {
        setSuccessMessage(response.data.message);
        setFormData({
          fullName: "",
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
    <div className="min-h-screen shadow-md rounded-2xl bg-gradient-to-r from-green-200 to-teal-200">
      <div className="p-6 max-w-7xl mx-auto">
        <form
          className="flex flex-col gap-6 max-w-sm mx-auto mt-[60px] p-6 rounded-xl backdrop-blur-md bg-green-100"
          onSubmit={handleSubmit}
        >
          <p className="text-2xl font-semibold tracking-tight text-green-500 flex items-center justify-center mb-8">
            Register
          </p>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {successMessage && (
            <p className="text-green-500 text-sm">{successMessage}</p>
          )}

          <div>
            <label className="text-sm text-gray-500">Full Name</label>
            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-gray-300"
              type="text"
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">Email</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-gray-300"
              type="email"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-500 mb-2">Date of Birth</label>
            <DatePicker
              selected={formData.dob}
              onChange={handleDateChange}
              className="w-full px-3 py-2 rounded-lg border border-gray-300"
              dateFormat="MM/dd/yyyy"
              placeholderText="MM/DD/YYYY"
              required
              showYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={100} // Allow scrolling through 100 years
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">Password</label>
            <div className="relative">
              <input
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg border border-gray-300"
                type={showPassword ? "text" : "password"}
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
              >
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  className="text-lg"
                />
              </button>
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-500">Confirm Password</label>
            <div className="relative">
              <input
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg border border-gray-300"
                type={showConfirmPassword ? "text" : "password"}
                required
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
              >
                <FontAwesomeIcon
                  icon={showConfirmPassword ? faEyeSlash : faEye}
                  className="text-lg"
                />
              </button>
            </div>
          </div>

          <button className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg">
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
