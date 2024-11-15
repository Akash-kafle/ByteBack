import React from "react";
import {
  MapPin,
  QrCode,
  Award,
  Activity,
  Truck,
  Recycle,
  ChevronUp,
  Package,
} from "lucide-react";

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
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          E-Waste Management Dashboard
        </h1>
        <p className="text-gray-600">
          Welcome back! Here's your recycling overview
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex justify-between items-start">
              <h3 className="text-gray-500 text-sm">{stat.label}</h3>
              <span className="text-green-500 flex items-center text-sm">
                {stat.trend} <ChevronUp className="h-4 w-4" />
              </span>
            </div>
            <p className="text-2xl font-bold text-gray-800 mt-2">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Drop-offs */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Drop-offs</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500 border-b">
                  <th className="pb-3">ID</th>
                  <th className="pb-3">Location</th>
                  <th className="pb-3">Type</th>
                  <th className="pb-3">Points</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentDropoffs.map((dropoff) => (
                  <tr key={dropoff.id} className="border-b last:border-0">
                    <td className="py-3 text-sm">{dropoff.id}</td>
                    <td className="py-3 text-sm">{dropoff.location}</td>
                    <td className="py-3 text-sm">{dropoff.type}</td>
                    <td className="py-3 text-sm">{dropoff.points}</td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
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
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">
            Nearby Drop-off Locations
          </h2>
          <div className="space-y-4">
            {nearbyLocations.map((location, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium">{location.name}</p>
                    <p className="text-xs text-gray-500">{location.distance}</p>
                  </div>
                </div>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
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
          { icon: MapPin, label: "Find Drop-off", color: "text-blue-500" },
          { icon: QrCode, label: "Scan QR Code", color: "text-purple-500" },
          { icon: Award, label: "View Points", color: "text-green-500" },
          { icon: Activity, label: "Track Items", color: "text-orange-500" },
        ].map((action, index) => (
          <button
            key={index}
            className="flex items-center justify-center space-x-2 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <action.icon className={`h-5 w-5 ${action.color}`} />
            <span className="text-gray-700">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
