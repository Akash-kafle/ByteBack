import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faList, faRecycle } from "@fortawesome/free-solid-svg-icons";

const Admin = () => {
  const [devices, setDevices] = useState([]);
  const [newDevice, setNewDevice] = useState({
    name: "",
    type: "",
    marketValue: "",
    repairCost: "",
    conditionScore: "",
  });

  // Fetch devices (replace with actual backend API)
  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await axios.get("/api/devices");
        setDevices(response.data);
      } catch (error) {
        console.error("Error fetching devices:", error);
      }
    };
    fetchDevices();
  }, []);

  // Handle form input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDevice((prevState) => ({ ...prevState, [name]: value }));
  };

  // Add a new device (POST to backend)
  const handleAddDevice = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/devices", newDevice);
      setDevices((prevState) => [...prevState, response.data]);
      setNewDevice({
        name: "",
        type: "",
        marketValue: "",
        repairCost: "",
        conditionScore: "",
      });
    } catch (error) {
      console.error("Error adding device:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100">
      {/* Background Effects */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle, rgba(59,130,246,0.1) 0%, rgba(16,185,129,0) 100%)] pointer-events-none"></div>

      <div className="p-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Panel</h1>

        {/* Add Device Section */}
        <div className="bg-white p-6 rounded-2xl backdrop-blur-sm border border-gray-200 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Add New Device
          </h2>
          <form onSubmit={handleAddDevice} className="space-y-4">
            <div className="flex flex-col space-y-2">
              <label className="text-gray-600">Device Name</label>
              <input
                type="text"
                name="name"
                value={newDevice.name}
                onChange={handleInputChange}
                className="border rounded-lg p-2"
                required
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-gray-600">Device Type</label>
              <input
                type="text"
                name="type"
                value={newDevice.type}
                onChange={handleInputChange}
                className="border rounded-lg p-2"
                required
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-gray-600">Market Value</label>
              <input
                type="number"
                name="marketValue"
                value={newDevice.marketValue}
                onChange={handleInputChange}
                className="border rounded-lg p-2"
                required
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-gray-600">Repair Cost</label>
              <input
                type="number"
                name="repairCost"
                value={newDevice.repairCost}
                onChange={handleInputChange}
                className="border rounded-lg p-2"
                required
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-gray-600">Condition Score (1-10)</label>
              <input
                type="number"
                name="conditionScore"
                value={newDevice.conditionScore}
                onChange={handleInputChange}
                className="border rounded-lg p-2"
                min="1"
                max="10"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
            >
              Add Device
            </button>
          </form>
        </div>

        {/* Device List Section */}
        <div className="bg-white p-6 rounded-2xl backdrop-blur-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Device List
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-600 border-b border-gray-200">
                  <th className="pb-3 font-medium">Device Name</th>
                  <th className="pb-3 font-medium">Type</th>
                  <th className="pb-3 font-medium">Market Value</th>
                  <th className="pb-3 font-medium">Repair Cost</th>
                  <th className="pb-3 font-medium">Condition Score</th>
                  <th className="pb-3 font-medium">Decision</th>
                </tr>
              </thead>
              <tbody>
                {devices.map((device) => (
                  <tr key={device.id} className="border-b border-gray-100">
                    <td className="py-3 text-sm">{device.name}</td>
                    <td className="py-3 text-sm">{device.type}</td>
                    <td className="py-3 text-sm">${device.marketValue}</td>
                    <td className="py-3 text-sm">${device.repairCost}</td>
                    <td className="py-3 text-sm">{device.conditionScore}</td>
                    <td className="py-3 text-sm">
                      {device.reusePotential >= 60 ? (
                        <span className="text-green-600">Reuse</span>
                      ) : (
                        <span className="text-red-600">Recycle</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
