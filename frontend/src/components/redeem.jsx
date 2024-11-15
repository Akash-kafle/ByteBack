import React from "react";

const Redeem = () => {
  const items = [
    {
      id: 1,
      name: "Eco-Friendly Tote Bag",
      price: 15,
      image:
        "https://plus.unsplash.com/premium_photo-1681324227573-953664cf9b32?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      name: "Reusable Water Bottle",
      price: 20,
      image:
        "https://plus.unsplash.com/premium_photo-1664527307281-faf42c09ac8f?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8UmV1c2FibGUlMjBXYXRlciUyMGJvdHRsZXxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 3,
      name: "Bamboo Cutlery Set",
      price: 10,
      image:
        "https://images.unsplash.com/photo-1556037867-bc64ed32b2af?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8QmFtYm9vJTIwQ3V0bGVyeXxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 4,
      name: "Organic Cotton T-Shirt",
      price: 25,
      image:
        "data:image/jpeg;base64,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",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100 min-h-screen p-8">
      <h1 className="text-gray-500 text-4xl font-bold text-center mb-8">
        Eco Store
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white h-[500px] rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition duration-300"
          >
            <img
              src={item.image}
              alt={item.name}
              className="h-[400px] w-full object-fill"
            />
            <div className="p-4 flex flex-row justify-between items-center">
              <div>
                <h2 className="text-lg font-bold text-gray-900">{item.name}</h2>
                <p className="text-gray-700">Price: {item.price} EcoCoins</p>
              </div>
              <button className="mt-4 bg-gradient-to-r from-green-600 to-teal-600 text-white font-bold py-2 px-4 rounded shadow hover:bg-green-500">
                Redeem
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Redeem;
