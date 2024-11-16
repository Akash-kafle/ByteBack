import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapPin,
  faQrcode,
  faAward,
  faChartLine,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const dropoffLocations = [
  {
    name: "Doko Recyclers",
    latitude: 27.6818,
    longitude: 85.3147,
    address: "Jhamsikhel, Lalitpur-3",
    status: "Open",
  },
  {
    name: "Blue Waste to Value",
    latitude: 27.6785,
    longitude: 85.3178,
    address: "Chakupat, Lalitpur",
    status: "Open",
  },
  {
    name: "Waste Management Resource Mobilization Center",
    latitude: 27.7041,
    longitude: 85.3145,
    address: "Pulchowk, Lalitpur",
    status: "Open",
  },
  {
    name: "Recycler Sathi",
    latitude: 27.7149,
    longitude: 85.3455,
    address: "Baneshwor, Kathmandu",
    status: "Open",
  },
  {
    name: "Nepal Pollution Control & Environment Management Center",
    latitude: 27.6929,
    longitude: 85.3212,
    address: "Kupondole, Lalitpur",
    status: "Open",
  },
  {
    name: "Pragati Recyclers",
    latitude: 27.7216,
    longitude: 85.3395,
    address: "Putalisadak, Kathmandu",
    status: "Closed",
  },
  {
    name: "Green City Recyclers",
    latitude: 27.7067,
    longitude: 85.3476,
    address: "Thapagaun, Kathmandu",
    status: "Open",
  },
  {
    name: "Sustainable Recycling Hub",
    latitude: 27.6751,
    longitude: 85.3052,
    address: "Ekantakuna, Lalitpur",
    status: "Open",
  },
];

const Dashboard = () => {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [nearbyLocations, setNearbyLocations] = useState([]);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(2);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;
          setCurrentPosition([userLat, userLng]);

          const locationsWithDistance = dropoffLocations.map((location) => ({
            ...location,
            distance: calculateDistance(
              userLat,
              userLng,
              location.latitude,
              location.longitude
            ),
          }));

          const sorted = locationsWithDistance
            .sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance))
            .slice(0, 3);

          setNearbyLocations(sorted);
        },
        (error) => {
          console.error("Error getting location:", error);
          setNearbyLocations(dropoffLocations.slice(0, 3));
        }
      );
    }
  }, []);

  const stats = [
    { label: "Total Drop-offs", value: "1,234", trend: "+12%" },
    { label: "Eco Points Earned", value: "45.2K", trend: "+8%" },
    { label: "Active Users", value: "892", trend: "+15%" },
    { label: "Recycling Rate", value: "78%", trend: "+5%" },
  ];

  const recentDropoffs = [
    {
      id: "DR001",
      location: "Doko Recyclers",
      type: "Electronics",
      points: 150,
      status: "In Transit",
    },
    {
      id: "DR002",
      location: "Blue Waste to Value",
      type: "Batteries",
      points: 75,
      status: "Collected",
    },
    {
      id: "DR003",
      location: "Recycler Sathi",
      type: "Computers",
      points: 200,
      status: "Processing",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100">
      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-8 bg-white p-6 rounded-2xl border">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 inline-block text-transparent bg-clip-text">
            Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Welcome back! Here's your overview
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 border hover:shadow-lg transition-all duration-300"
            >
              <div className="flex justify-between items-start">
                <h3 className="text-gray-600 text-sm font-medium">
                  {stat.label}
                </h3>
                <span className="text-green-500 flex items-center text-sm font-medium">
                  {stat.trend}
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl border p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Recent Drop-offs
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-600 border-b">
                    <th className="pb-3">ID</th>
                    <th className="pb-3">Location</th>
                    <th className="pb-3">Type</th>
                    <th className="pb-3">Points</th>
                    <th className="pb-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentDropoffs.map((dropoff) => (
                    <tr
                      key={dropoff.id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <NavLink
                        to={`/tracking/${dropoff.id}`}
                        className="contents"
                      >
                        <td className="py-3 text-sm">{dropoff.id}</td>
                        <td className="py-3 text-sm">{dropoff.location}</td>
                        <td className="py-3 text-sm">{dropoff.type}</td>
                        <td className="py-3 text-sm">{dropoff.points}</td>
                        <td className="py-3">
                          <span
                            className={`px-3 py-1 text-xs rounded-full ${
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
                      </NavLink>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-xl border p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Nearby Drop-off Locations
            </h2>
            <div className="space-y-4">
              {nearbyLocations.map((location, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-white rounded-lg hover:bg-gray-50 transition"
                >
                  <div className="flex items-center">
                    <FontAwesomeIcon
                      icon={faMapPin}
                      className="h-6 w-6 text-green-600 mr-4"
                    />
                    <div>
                      <h3 className="text-sm font-semibold">{location.name}</h3>
                      <p className="text-xs text-gray-500">
                        {location.address}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-xs font-medium px-3 py-1 rounded-full ${
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
      </div>
    </div>
  );
};

export default Dashboard;
