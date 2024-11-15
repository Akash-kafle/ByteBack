import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapPin,
  faRecycle,
  faCalendarAlt,
  faCheckCircle,
  faArrowRight,
  faUserCircle,
  faLeaf,
} from "@fortawesome/free-solid-svg-icons";

const Tracking = () => {
  const { id } = useParams();
  const [trackingData, setTrackingData] = useState(null);

  useEffect(() => {
    // Hardcoded tracking data for testing with mobile phones recycling lifecycle
    const dummyData = {
      status: "In Recycling",
      dropoffLocation: {
        name: "Tech Recycling Center",
        address: "789 Green St, EcoCity",
      },
      itemType: "Mobile Phones",
      dropoffDate: "2024-11-17",
      recyclingStartDate: "2024-11-18",
      estimatedCompletionDate: "2024-11-22",
      ecoPoints: 150,
      recycler: "EcoCycle Inc.",
      customerName: "John Doe",
      trackingNumber: "RECYCLE123456",
      productLifecycleStatus: "In process of recycling",
    };

    // Simulate an API call delay
    setTimeout(() => {
      setTrackingData(dummyData);
    }, 500);
  }, [id]);

  if (!trackingData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white/60 backdrop-blur-md rounded-xl border border-white/20 p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-teal-600 inline-block text-transparent bg-clip-text">
            Lifecycle Tracking
          </h1>
          <span
            className={`px-3 py-1 text-sm rounded-full font-medium ${
              trackingData.status === "In Recycling"
                ? "bg-yellow-100 text-yellow-600"
                : "bg-green-100 text-green-600"
            }`}
          >
            {trackingData.status}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-2 text-gray-800">
                Drop-off Location
              </h2>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-green-100 p-2 rounded-lg">
                  <FontAwesomeIcon
                    icon={faMapPin}
                    className="h-5 w-5 text-green-600"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {trackingData.dropoffLocation.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {trackingData.dropoffLocation.address}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2 text-gray-800">
                Recycling Process
              </h2>
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <FontAwesomeIcon
                      icon={faRecycle}
                      className="h-5 w-5 text-blue-600"
                    />
                  </div>
                  <p className="text-sm text-gray-700">
                    {trackingData.itemType}
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <FontAwesomeIcon
                      icon={faCalendarAlt}
                      className="h-5 w-5 text-green-600"
                    />
                  </div>
                  <p className="text-sm text-gray-700">
                    Drop-off Date: {trackingData.dropoffDate}
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-yellow-100 p-2 rounded-lg">
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="h-5 w-5 text-yellow-600"
                    />
                  </div>
                  <p className="text-sm text-gray-700">
                    Recycling Started: {trackingData.recyclingStartDate}
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-teal-100 p-2 rounded-lg">
                    <FontAwesomeIcon
                      icon={faCalendarAlt}
                      className="h-5 w-5 text-teal-600"
                    />
                  </div>
                  <p className="text-sm text-gray-700">
                    Estimated Completion: {trackingData.estimatedCompletionDate}
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      className="h-5 w-5 text-green-600"
                    />
                  </div>
                  <p className="text-sm text-gray-700">
                    {trackingData.ecoPoints} eco-points earned
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-red-100 p-2 rounded-lg">
                    <FontAwesomeIcon
                      icon={faLeaf}
                      className="h-5 w-5 text-red-600"
                    />
                  </div>
                  <p className="text-sm text-gray-700">
                    Recycler: {trackingData.recycler}
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <FontAwesomeIcon
                      icon={faUserCircle}
                      className="h-5 w-5 text-purple-600"
                    />
                  </div>
                  <p className="text-sm text-gray-700">
                    Customer: {trackingData.customerName}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-6">
            <div className="mt-4 text-sm text-gray-700">
              <strong>Lifecycle Status:</strong>{" "}
              {trackingData.productLifecycleStatus}
            </div>
            <div className="mt-4 text-sm text-gray-700">
              <strong>Tracking Number:</strong> {trackingData.trackingNumber}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tracking;
