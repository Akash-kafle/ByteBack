import React from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapPin,
  faRecycle,
  faCheckCircle,
  faInfoCircle,
  faCalendarAlt,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";

// JSON data
const trackingData = [
  {
    id: "DR001",
    location: "Doko Recyclers",
    type: "Electronics",
    points: 150,
    status: "In Transit",
    dropoffDate: "2024-11-15",
    dropoffLocation: "Kathmandu, Nepal",
    customerName: "Aakash Kafle",
  },
  {
    id: "DR002",
    location: "Blue Waste to Value",
    type: "Batteries",
    points: 75,
    status: "Collected",
    dropoffDate: "2024-11-14",
    dropoffLocation: "Lalitpur, Nepal",
    customerName: "Aakash Kafle",
  },
  {
    id: "DR003",
    location: "Recycler Sathi",
    type: "Computers",
    points: 200,
    status: "Processing",
    dropoffDate: "2024-11-13",
    dropoffLocation: "Bhaktapur, Nepal",
    customerName: "Aakash Kafle",
  },
];

const Tracking = () => {
  const { id } = useParams(); // Extract the ID from the URL
  const matchedData = trackingData.find((item) => item.id === id); // Find the matching entry

  if (!matchedData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FontAwesomeIcon
            icon={faInfoCircle}
            className="text-red-500 text-4xl mb-4"
          />
          <p className="text-lg font-semibold text-gray-700">
            No data found for ID: {id}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white/60 backdrop-blur-md rounded-xl border border-white/20 p-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Tracking Information
        </h1>
        <div className="space-y-6">
          {/* Location */}
          <div className="flex items-center space-x-3">
            <div className="bg-green-100 p-2 rounded-lg">
              <FontAwesomeIcon
                icon={faMapPin}
                className="h-5 w-5 text-green-600"
              />
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-800">Location</h2>
              <p className="text-sm text-gray-600">{matchedData.location}</p>
            </div>
          </div>

          {/* Type */}
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 p-2 rounded-lg">
              <FontAwesomeIcon
                icon={faRecycle}
                className="h-5 w-5 text-blue-600"
              />
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-800">Type</h2>
              <p className="text-sm text-gray-600">{matchedData.type}</p>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center space-x-3">
            <div className="bg-yellow-100 p-2 rounded-lg">
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="h-5 w-5 text-yellow-600"
              />
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-800">Status</h2>
              <p className="text-sm text-gray-600">{matchedData.status}</p>
            </div>
          </div>

          {/* Points */}
          <div className="flex items-center space-x-3">
            <div className="bg-teal-100 p-2 rounded-lg">
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="h-5 w-5 text-teal-600"
              />
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-800">Points</h2>
              <p className="text-sm text-gray-600">
                {matchedData.points} eco-points
              </p>
            </div>
          </div>

          {/* Dropoff Date */}
          <div className="flex items-center space-x-3">
            <div className="bg-gray-100 p-2 rounded-lg">
              <FontAwesomeIcon
                icon={faCalendarAlt}
                className="h-5 w-5 text-gray-600"
              />
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-800">
                Dropoff Date
              </h2>
              <p className="text-sm text-gray-600">{matchedData.dropoffDate}</p>
            </div>
          </div>

          {/* Dropoff Location */}
          <div className="flex items-center space-x-3">
            <div className="bg-green-100 p-2 rounded-lg">
              <FontAwesomeIcon
                icon={faMapPin}
                className="h-5 w-5 text-green-600"
              />
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-800">
                Dropoff Location
              </h2>
              <p className="text-sm text-gray-600">
                {matchedData.dropoffLocation}
              </p>
            </div>
          </div>

          {/* Customer Name */}
          <div className="flex items-center space-x-3">
            <div className="bg-purple-100 p-2 rounded-lg">
              <FontAwesomeIcon
                icon={faUserCircle}
                className="h-5 w-5 text-purple-600"
              />
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-800">
                Customer Name
              </h2>
              <p className="text-sm text-gray-600">
                {matchedData.customerName}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tracking;
