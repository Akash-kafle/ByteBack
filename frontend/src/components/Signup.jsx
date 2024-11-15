import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import CSS for the datepicker

const Signup = () => {
  const [dob, setDob] = useState(null); // State to store the selected date

  const handleDateChange = (date) => {
    setDob(date); // Update the dob state when the date is selected
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Decorative background elements */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(45%_25%_at_50%_50%,rgba(34,197,94,0.05)_0%,rgba(126,231,135,0)_100%)] pointer-events-none" />
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(35%_35%_at_80%_20%,rgba(16,185,129,0.05)_0%,rgba(52,211,153,0)_100%)] pointer-events-none" />

      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 bg-white/40 p-6 rounded-2xl backdrop-blur-sm border border-white/20">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 inline-block text-transparent bg-clip-text">
            Register for E-Waste Management
          </h1>
          <p className="text-gray-600 mt-2">
            Please fill in the details to get started with recycling
          </p>
        </div>

        {/* Registration Form */}
        <form className="flex flex-col gap-6 max-w-sm mx-auto p-6 rounded-xl bg-white/60 backdrop-blur-md border border-white/20">
          {/* Title Section */}
          <p className="text-2xl font-semibold tracking-tight text-cyan-400 pl-8 flex items-center relative justify-center mb-8">
            Register
            <span className="absolute left-0 w-4 h-4 bg-cyan-400 rounded-full"></span>
            <span className="absolute right-0 w-4 h-4 bg-cyan-400 rounded-full"></span>
          </p>

          {/* Name Fields Section */}
          <div className="flex gap-6">
            <div className="w-1/3">
              <label className="text-sm text-gray-500">Firstname</label>
              <input
                className="bg-gray-800 text-white w-full px-3 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                type="text"
                required
              />
            </div>

            <div className="w-1/3">
              <label className="text-sm text-gray-500">Middlename</label>
              <input
                className="bg-gray-800 text-white w-full px-3 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                type="text"
                required
              />
            </div>

            <div className="w-1/3">
              <label className="text-sm text-gray-500">Lastname</label>
              <input
                className="bg-gray-800 text-white w-full px-3 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                type="text"
                required
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label className="text-sm text-gray-500">Email</label>
            <input
              className="bg-gray-800 text-white w-full px-3 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
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
              className="bg-gray-800 text-white w-full px-3 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
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
              className="bg-gray-800 text-white w-full px-3 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              type="password"
              required
            />
          </div>

          <div>
            <label className="text-sm text-gray-500">Confirm Password</label>
            <input
              className="bg-gray-800 text-white w-full px-3 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              type="password"
              required
            />
          </div>

          {/* Submit Button */}
          <button className="bg-cyan-500 text-white py-3 px-6 rounded-lg border-none hover:bg-cyan-400 transition-all duration-300">
            Submit
          </button>

          {/* Sign-in Link */}
          <p className="text-sm text-gray-400 text-center mt-4">
            Already have an account?{' '}
            <a href="#" className="text-cyan-400 hover:underline">
              Sign in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
