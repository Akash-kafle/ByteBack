import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  Circle,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationCrosshairs,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";

// Default Marker Icons Fix
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

const currentLocationIcon = L.divIcon({
  className: "current-location-marker",
  html: '<div class="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg"></div>',
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

L.Marker.prototype.options.icon = defaultIcon;

// Options for device selection
const deviceOptions = [
  { value: "iphone_13_pro", label: "IPhone 13 pro" },
  { value: "samsung", label: "Samsung" },
  { value: "pixel", label: "Pixel" },
];

const LocationMarker = ({ position }) => {
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
          <p className="font-semibold">You are here</p>
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

const Recycle = () => {
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [loading, setLoading] = useState(false);

  const findMyLocation = () => {
    setLoading(true);
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
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
      () => {
        alert("Unable to fetch location. Please enable location services.");
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 5000 }
    );
  };

  const handleSubmit = () => {
    if (!address || !landmark || !selectedDevice || !currentPosition) {
      alert("Please fill in all details and pinpoint your location.");
      return;
    }

    const submissionData = {
      address,
      landmark,
      selectedDevice: selectedDevice.label,
      latitude: currentPosition[0],
      longitude: currentPosition[1],
    };

    console.log("Submission Data:", submissionData);
    alert("Details submitted successfully!");
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="max-w-7xl mx-auto">
        {/* Input Form */}
        <div className="bg-white/40 p-6 rounded-2xl backdrop-blur-sm border border-white/20 mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 inline-block text-transparent bg-clip-text">
            Recycle Your Device
          </h1>
          <p className="text-gray-600 mt-2">
            Enter your address and details to get your e-waste picked up.
          </p>
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block text-sm font-medium text-teal-700">
                Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-teal-700">
                Landmark
              </label>
              <input
                type="text"
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-teal-700">
                Select Device
              </label>
              <Select
                options={deviceOptions}
                value={selectedDevice}
                onChange={setSelectedDevice}
                className="mt-1 relative z-[1000]"
                menuPortalTarget={document.body}
                styles={{
                  menuPortal: (base) => ({ ...base, zIndex: 1000 }),
                }}
              />
            </div>
          </div>
        </div>

        {/* Map and Find My Location */}
        <div className="bg-white/60 backdrop-blur-md rounded-xl border border-white/20 p-4 relative z-0">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-700">
              Select Your Location
            </h2>
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
            <LocationMarker position={currentPosition} />
          </MapContainer>
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            onClick={handleSubmit}
            className="w-full bg-teal-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-teal-700 transition-colors"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Recycle;
