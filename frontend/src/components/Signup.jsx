import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import CSS for the datepicker

const Signup = () => {
  const [dob, setDob] = useState(null); // State to store the selected date

  const handleDateChange = (date) => {
    setDob(date); // Update the dob state when the date is selected
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <form className="flex flex-col gap-6 max-w-sm p-6 rounded-xl bg-gray-900 border border-gray-700 relative">
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
              className="input bg-gray-800 text-white w-full px-3 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              type="text"
              required
            />
          </div>

          <div className="w-1/3">
            <label className="text-sm text-gray-500">Middlename</label>
            <input
              className="input bg-gray-800 text-white w-full px-3 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              type="text"
              required
            />
          </div>

          <div className="w-1/3">
            <label className="text-sm text-gray-500">Lastname</label>
            <input
              className="input bg-gray-800 text-white w-full px-3 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              type="text"
              required
            />
          </div>
        </div>

        {/* Email Field */}
        <div>
          <label className="text-sm text-gray-500">Email</label>
          <input
            className="input bg-gray-800 text-white w-full px-3 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            type="email"
            required
          />
        </div>

        {/* Date of Birth Field */}
        <div className="flex flex-col">
          <label className="text-sm text-gray-500 mb-2">Date of Birth</label> {/* Added margin-bottom */}
          <DatePicker
            selected={dob}
            onChange={handleDateChange}
            className="input bg-gray-800 text-white w-full px-3 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            dateFormat="mm/dd/yyyy"
            placeholderText="mm/dd/yyyy"
            showYearDropdown
            yearDropdownItemNumber={100}
            scrollableYearDropdown
            calendarClassName="dark-datepicker" // Apply custom class for the calendar
          />
        </div>

        {/* Password Fields */}
        <div>
          <label className="text-sm text-gray-500">Password</label>
          <input
            className="input bg-gray-800 text-white w-full px-3 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            type="password"
            required
          />
        </div>

        <div>
          <label className="text-sm text-gray-500">Confirm Password</label>
          <input
            className="input bg-gray-800 text-white w-full px-3 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            type="password"
            required
          />
        </div>

        {/* Submit Button */}
        <button className="submit bg-cyan-500 text-white py-3 px-6 rounded-lg border-none hover:bg-cyan-400 transition-all duration-300">
          Submit
        </button>

        {/* Sign-in Link */}
        <p className="signin text-sm text-gray-400 text-center mt-4">
          Already have an account?{' '}
          <a href="#" className="text-cyan-400 hover:underline">
            Sign in
          </a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
