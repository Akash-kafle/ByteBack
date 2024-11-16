import React, { useState } from "react";
import axios from "axios";

const Admin = () => {
  const [devices, setDevices] = useState([]);
  const [newDevice, setNewDevice] = useState({
    name: "",
    age: "",
    expectedLifespan: "",
    recyclability: "",
    conditionScore: "",
  });

  const [product, setProduct] = useState({
    productId: "",
    status: "Pending",
    location: "",
  });

  // Handle input change for devices
  const handleDeviceInputChange = (e) => {
    const { name, value } = e.target;
    setNewDevice((prevState) => ({ ...prevState, [name]: value }));
  };

  // Handle input change for product
  const handleProductInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevState) => ({ ...prevState, [name]: value }));
  };

  // Add a new device
  const handleAddDevice = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/devices", newDevice);
      setDevices((prevState) => [...prevState, response.data]);
      setNewDevice({
        name: "",
        age: "",
        expectedLifespan: "",
        recyclability: "",
        conditionScore: "",
      });
    } catch (error) {
      console.error("Error adding device:", error);
    }
  };

  // Add and mine a new product record
  const handleMineProduct = async () => {
    try {
      const response = await axios.post("/api/add-record", product);
      if (response.status === 200) {
        await axios.post("/api/mine-records");
        alert("Product record added and mined successfully!");
        setProduct({ productId: "", status: "Pending", location: "" });
      }
    } catch (error) {
      console.error("Error mining product record:", error);
      alert("Failed to add or mine the product record!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100">
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
                onChange={handleDeviceInputChange}
                className="border rounded-lg p-2"
                required
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-gray-600">Age (years)</label>
              <input
                type="number"
                name="age"
                value={newDevice.age}
                onChange={handleDeviceInputChange}
                className="border rounded-lg p-2"
                required
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-gray-600">Expected Lifespan (years)</label>
              <input
                type="number"
                name="expectedLifespan"
                value={newDevice.expectedLifespan}
                onChange={handleDeviceInputChange}
                className="border rounded-lg p-2"
                required
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-gray-600">
                Recyclability Percentage (%)
              </label>
              <input
                type="number"
                name="recyclability"
                value={newDevice.recyclability}
                onChange={handleDeviceInputChange}
                className="border rounded-lg p-2"
                min="0"
                max="100"
                required
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-gray-600">Condition Score (1-10)</label>
              <input
                type="number"
                name="conditionScore"
                value={newDevice.conditionScore}
                onChange={handleDeviceInputChange}
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

        {/* Add Product Section */}
        <div className="bg-white p-6 rounded-2xl backdrop-blur-sm border border-gray-200 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Add Product and Mine
          </h2>
          <form className="space-y-4">
            <div className="flex flex-col space-y-2">
              <label className="text-gray-600">Product ID</label>
              <input
                type="text"
                name="productId"
                value={product.productId}
                onChange={handleProductInputChange}
                className="border rounded-lg p-2"
                required
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-gray-600">Status</label>
              <select
                name="status"
                value={product.status}
                onChange={handleProductInputChange}
                className="border rounded-lg p-2"
              >
                <option value="Pending">Pending</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-gray-600">Location</label>
              <input
                type="text"
                name="location"
                value={product.location}
                onChange={handleProductInputChange}
                className="border rounded-lg p-2"
                required
              />
            </div>
            <button
              type="button"
              onClick={handleMineProduct}
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            >
              Mine
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Admin;
