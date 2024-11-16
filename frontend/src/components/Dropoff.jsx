import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Circle,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationCrosshairs,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";

// Fix for default marker icons
const defaultIcon = L.icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Custom icon for current location
const currentLocationIcon = L.divIcon({
  className: "current-location-marker",
  html: '<div class="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg"></div>',
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

L.Marker.prototype.options.icon = defaultIcon;

// Component to handle map location updates
const LocationMarker = ({ position, setPosition }) => {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo(position, map.getZoom());
    }
  }, [position, map]);

  return position ? (
    <>
      <Marker position={position} icon={currentLocationIcon}>
        <Popup>
          <div className="text-center">
            <p className="font-semibold">You are here</p>
            <p className="text-sm text-gray-600">
              {position[0].toFixed(4)}, {position[1].toFixed(4)}
            </p>
          </div>
        </Popup>
      </Marker>
      <Circle
        center={position}
        radius={100}
        pathOptions={{ color: "blue", fillColor: "blue", fillOpacity: 0.1 }}
      />
    </>
  ) : null;
};

// Calculate distance between two points
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

const Dropoff = () => {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [loading, setLoading] = useState(false);
  const [locationError, setLocationError] = useState(null);

  // Updated Kathmandu E-Waste Collection Points
  const dropoffLocations = [
    {
      name: "Doko Recyclers",
      latitude: 27.6818,
      longitude: 85.3147,
      description:
        "Professional e-waste recycling company offering door-to-door collection services.",
      address: "Jhamsikhel, Lalitpur-3",
      contact: "+977-9801-969696",
      hours: "Sun-Fri: 9:00 AM - 5:00 PM",
    },
    {
      name: "Blue Waste to Value",
      latitude: 27.6785,
      longitude: 85.3178,
      description:
        "Integrated waste management company specializing in e-waste recycling.",
      address: "Chakupat, Lalitpur",
      contact: "+977-1-5260348",
      hours: "Sun-Fri: 8:00 AM - 6:00 PM",
    },
    {
      name: "Waste Management Resource Mobilization Center",
      latitude: 27.7041,
      longitude: 85.3145,
      description:
        "Government facility for electronic waste collection and processing.",
      address: "Pulchowk, Lalitpur",
      contact: "+977-1-5545256",
      hours: "Sun-Fri: 10:00 AM - 4:00 PM",
    },
    {
      name: "Recycler Sathi",
      latitude: 27.7149,
      longitude: 85.3455,
      description: "Community-based e-waste collection and recycling center.",
      address: "Baneshwor, Kathmandu",
      contact: "+977-9841-234567",
      hours: "Sun-Fri: 9:00 AM - 4:00 PM",
    },
    {
      name: "Nepal Pollution Control & Environment Management Center",
      latitude: 27.6929,
      longitude: 85.3212,
      description: "Environmental management and e-waste processing facility.",
      address: "Kupondole, Lalitpur",
      contact: "+977-1-5551930",
      hours: "Sun-Fri: 9:30 AM - 5:30 PM",
    },
    {
      name: "Pragati Recyclers",
      latitude: 27.7216,
      longitude: 85.3395,
      description: "Specialized in computer and electronic waste recycling.",
      address: "Putalisadak, Kathmandu",
      contact: "+977-1-4168273",
      hours: "Sun-Fri: 10:00 AM - 5:00 PM",
    },
    {
      name: "Green City Recyclers",
      latitude: 27.7067,
      longitude: 85.3476,
      description:
        "Eco-friendly recycling center accepting all types of electronic waste.",
      address: "Thapagaun, Kathmandu",
      contact: "+977-9860-123456",
      hours: "Sun-Fri: 8:30 AM - 5:30 PM",
    },
    {
      name: "Sustainable Recycling Hub",
      latitude: 27.6751,
      longitude: 85.3052,
      description: "Modern facility focused on sustainable e-waste management.",
      address: "Ekantakuna, Lalitpur",
      contact: "+977-1-5548762",
      hours: "Sun-Fri: 9:00 AM - 6:00 PM",
    },
  ];

  const findMyLocation = () => {
    setLoading(true);
    setLocationError(null);

    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentPosition([
          position.coords.latitude,
          position.coords.longitude,
        ]);
        setLoading(false);
      },
      (error) => {
        setLocationError(
          "Unable to find your location. Please enable location services."
        );
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  };

  const sortedLocations = currentPosition
    ? [...dropoffLocations].sort((a, b) => {
        const distA = calculateDistance(
          currentPosition[0],
          currentPosition[1],
          a.latitude,
          a.longitude
        );
        const distB = calculateDistance(
          currentPosition[0],
          currentPosition[1],
          b.latitude,
          b.longitude
        );
        return distA - distB;
      })
    : dropoffLocations;

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white p-6 rounded-2xl backdrop-blur-sm border border-white/20 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 inline-block text-transparent bg-clip-text">
                E-Waste Drop-off Locations
              </h1>
              <p className="text-gray-600 mt-2">
                Find the nearest e-waste recycling center in Kathmandu Valley
              </p>
            </div>
            <button
              onClick={findMyLocation}
              disabled={loading}
              className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                loading
                  ? "bg-gray-200 text-gray-500"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              } transition-colors`}
            >
              <FontAwesomeIcon
                icon={loading ? faSpinner : faLocationCrosshairs}
                className={loading ? "animate-spin" : ""}
              />
              <span>
                {loading ? "Finding location..." : "Find My Location"}
              </span>
            </button>
          </div>
          {locationError && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {locationError}
            </div>
          )}
        </div>

        {/* Map Container */}
        <div className="bg-white/60 backdrop-blur-md rounded-xl border border-white/20 p-4">
          <MapContainer
            center={[27.6818, 85.3147]}
            zoom={13}
            scrollWheelZoom={true}
            className="h-[600px] w-full rounded-lg"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker
              position={currentPosition}
              setPosition={setCurrentPosition}
            />
            {sortedLocations.map((location, index) => (
              <Marker
                key={index}
                position={[location.latitude, location.longitude]}
              >
                <Popup>
                  <div className="p-2">
                    <h3 className="font-semibold text-lg mb-1">
                      {location.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">
                      {location.description}
                    </p>
                    <div className="text-sm space-y-1">
                      <p className="font-medium text-gray-700">
                        📍 {location.address}
                      </p>
                      <p className="font-medium text-gray-700">
                        📞 {location.contact}
                      </p>
                      <p className="font-medium text-gray-700">
                        🕒 {location.hours}
                      </p>
                      {currentPosition && (
                        <p className="font-medium text-blue-600">
                          📍 Distance:{" "}
                          {calculateDistance(
                            currentPosition[0],
                            currentPosition[1],
                            location.latitude,
                            location.longitude
                          )}{" "}
                          km
                        </p>
                      )}
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Location Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {sortedLocations.map((location, index) => (
            <div
              key={index}
              className="bg-white/60 backdrop-blur-md rounded-xl border border-white/20 p-6 hover:bg-white/80 transition-all duration-300"
            >
              <h3 className="font-semibold text-lg mb-2 text-green-700">
                {location.name}
                {currentPosition && (
                  <span className="text-sm font-normal text-blue-600 ml-2">
                    (
                    {calculateDistance(
                      currentPosition[0],
                      currentPosition[1],
                      location.latitude,
                      location.longitude
                    )}{" "}
                    km away)
                  </span>
                )}
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                {location.description}
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-2">📍</span>
                  {location.address}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-2">📞</span>
                  {location.contact}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="mr-2">🕒</span>
                  {location.hours}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dropoff;
