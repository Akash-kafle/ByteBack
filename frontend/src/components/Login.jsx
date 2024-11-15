import React, { useState } from "react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-green-200 to-teal-200">
      <div className="bg-white shadow-md rounded-2xl px-8 pt-6 pb-8 mb-4 w-full max-w-md h-[600px] flex flex-col gap-[40px]">
        <div>
          <h2 className="text-3xl font-bold mb-6 text-center pt-[50px]">
            Login
          </h2>
        </div>
        <div className="flex flex-col justify-between">
          <form className="space-y-6 pt-[20px] flex flex-col justify-between">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                <span className="">Email address</span>
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email address"
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                >
                  <i
                    className={`fas ${
                      showPassword ? "fa-eye-slash" : "fa-eye"
                    }`}
                    aria-hidden="true"
                  ></i>
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Sign in
              </button>
            </div>

            {/* Or Section with Google Icon */}
            <div className="text-center mt-4">
              <p className="text-sm text-gray-500">Or</p>
              <div className="flex justify-center mt-2">
                <button className="bg-white hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  <img
                    src="/Google icon.png"
                    className="h-[80px] w-[80px] mr-2 inline"
                    alt="Google Icon"
                  />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
