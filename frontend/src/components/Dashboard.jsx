import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapPin,
  faQrcode,
  faAward,
  faChartLine,
  faTruck,
  faRecycle,
  faChevronUp,
  faBox,
} from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  // Sample data
  const stats = [
    { label: "Total Drop-offs", value: "1,234", trend: "+12%" },
    { label: "Eco Points Earned", value: "45.2K", trend: "+8%" },
    { label: "Active Users", value: "892", trend: "+15%" },
    { label: "Recycling Rate", value: "78%", trend: "+5%" },
  ];

  const recentDropoffs = [
    {
      id: "DR001",
      location: "EcoCycle Center",
      type: "Electronics",
      points: 150,
      status: "In Transit",
    },
    {
      id: "DR002",
      location: "GreenTech Hub",
      type: "Batteries",
      points: 75,
      status: "Collected",
    },
    {
      id: "DR003",
      location: "RecycleNow",
      type: "Computers",
      points: 200,
      status: "Processing",
    },
  ];

  const nearbyLocations = [
    { name: "EcoCycle Center", distance: "0.8 km", status: "Open" },
    { name: "GreenTech Hub", distance: "1.2 km", status: "Open" },
    { name: "RecycleNow", distance: "2.5 km", status: "Closed" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Decorative background elements */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(45%_25%_at_50%_50%,rgba(34,197,94,0.05)_0%,rgba(126,231,135,0)_100%)] pointer-events-none" />
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(35%_35%_at_80%_20%,rgba(16,185,129,0.05)_0%,rgba(52,211,153,0)_100%)] pointer-events-none" />

      <div className="p-6 max-w-7xl mx-auto">
        {/* Header with modern styling */}
        <div className="mb-8 bg-white/40 p-6 rounded-2xl backdrop-blur-sm border border-white/20">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 inline-block text-transparent bg-clip-text">
            E-Waste Management Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Welcome back! Here's your recycling overview
          </p>
        </div>

        {/* Stats Grid with glassmorphism */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/60 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex justify-between items-start">
                <h3 className="text-gray-600 text-sm font-medium">
                  {stat.label}
                </h3>
                <span className="text-green-500 flex items-center text-sm font-medium">
                  {stat.trend}{" "}
                  <FontAwesomeIcon
                    icon={faChevronUp}
                    className="h-4 w-4 ml-1"
                  />
                </span>
              </div>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Main Content Grid with modern cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Drop-offs */}
          <div className="lg:col-span-2 bg-white/60 backdrop-blur-md rounded-xl border border-white/20 p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Recent Drop-offs
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-600 border-b border-gray-200">
                    <th className="pb-3 font-medium">ID</th>
                    <th className="pb-3 font-medium">Location</th>
                    <th className="pb-3 font-medium">Type</th>
                    <th className="pb-3 font-medium">Points</th>
                    <th className="pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentDropoffs.map((dropoff) => (
                    <tr
                      key={dropoff.id}
                      className="border-b border-gray-100 last:border-0"
                    >
                      <td className="py-3 text-sm">{dropoff.id}</td>
                      <td className="py-3 text-sm">{dropoff.location}</td>
                      <td className="py-3 text-sm">{dropoff.type}</td>
                      <td className="py-3 text-sm">{dropoff.points}</td>
                      <td className="py-3">
                        <span
                          className={`px-3 py-1 text-xs rounded-full font-medium ${
                            dropoff.status === "In Transit"
                              ? "bg-blue-100 text-blue-600"
                              : dropoff.status === "Collected"
                              ? "bg-green-100 text-green-600"
                              : "bg-yellow-100 text-yellow-600"
                          }`}
                        >
                          {dropoff.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Nearby Locations */}
          <div className="bg-white/60 backdrop-blur-md rounded-xl border border-white/20 p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Nearby Drop-off Locations
            </h2>
            <div className="space-y-4">
              {nearbyLocations.map((location, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-white/40 rounded-lg hover:bg-white/60 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <FontAwesomeIcon
                        icon={faMapPin}
                        className="h-5 w-5 text-green-600"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        {location.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {location.distance}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 text-xs rounded-full font-medium ${
                      location.status === "Open"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {location.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {[
            {
              icon: faMapPin,
              label: "Find Drop-off",
              color: "text-blue-600",
              bg: "bg-blue-100",
            },
            {
              icon: faQrcode,
              label: "Scan QR Code",
              color: "text-purple-600",
              bg: "bg-purple-100",
            },
            {
              icon: faAward,
              label: "View Points",
              color: "text-green-600",
              bg: "bg-green-100",
            },
            {
              icon: faChartLine,
              label: "Track Items",
              color: "text-orange-600",
              bg: "bg-orange-100",
            },
          ].map((action, index) => (
            <button
              key={index}
              className="flex items-center justify-center space-x-3 bg-white/60 backdrop-blur-md p-4 rounded-xl border border-white/20 hover:bg-white/80 transition-all duration-300"
            >
              <div className={`${action.bg} p-2 rounded-lg`}>
                <FontAwesomeIcon
                  icon={action.icon}
                  className={`h-5 w-5 ${action.color}`}
                />
              </div>
              <span className="text-gray-700 font-medium">{action.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
