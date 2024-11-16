import React, { useState } from "react";

const Redeem = () => {
  const [ecoPoints, setEcoPoints] = useState(100); // Initial EcoPoints
  const items = [
    {
      id: 1,
      name: "Eco-Friendly Tote Bag",
      price: 15,
      image:
        "https://plus.unsplash.com/premium_photo-1681324227573-953664cf9b32?q=80&w=2787&auto=format&fit=crop",
    },
    {
      id: 2,
      name: "Reusable Water Bottle",
      price: 20,
      image:
        "https://plus.unsplash.com/premium_photo-1664527307281-faf42c09ac8f?w=700&auto=format&fit=crop",
    },
    {
      id: 3,
      name: "Bamboo Cutlery Set",
      price: 10,
      image:
        "https://images.unsplash.com/photo-1556037867-bc64ed32b2af?w=700&auto=format&fit=crop",
    },
    {
      id: 4,
      name: "Organic Cotton T-Shirt",
      price: 25,
      image:
        "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=700&auto=format&fit=crop",
    },
    {
      id: 5,
      name: "Solar Powered Charger",
      price: 50,
      image:
        "https://images.unsplash.com/photo-1518293060878-18bc8f241eec?w=700&auto=format&fit=crop",
    },
    {
      id: 6,
      name: "Plantable Seed Pen Set",
      price: 5,
      image:
        "https://images.unsplash.com/photo-1563306406-69752f6ab6cd?w=700&auto=format&fit=crop",
    },
  ];

  const handleRedeem = (price) => {
    if (ecoPoints >= price) {
      setEcoPoints(ecoPoints - price);
      alert("Redeemed successfully!");
    } else {
      alert("Not enough EcoPoints!");
    }
  };

  return (
    <div className=" mx-auto p-6 bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
        Redeem Eco-Friendly Products
      </h1>
      <div className="text-lg text-green-600 font-semibold text-center mb-8">
        Your EcoPoints: <span className="text-green-800">{ecoPoints}</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-md rounded-lg overflow-hidden p-4 flex flex-col justify-between"
          >
            <img
              src={item.image}
              alt={item.name}
              className="h-48 w-full object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              {item.name}
            </h3>
            <p className="text-gray-500 mb-4">Price: {item.price} EcoPoints</p>
            <button
              onClick={() => handleRedeem(item.price)}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
            >
              Redeem
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Redeem;
