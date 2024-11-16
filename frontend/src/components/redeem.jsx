import React, { useEffect, useState } from "react";

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
      name: "Cotton T-Shirt",
      price: 25,
      image:
        " https://plus.unsplash.com/premium_photo-1722859262007-5c4a82da5d22?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fEdyZWVuJTIwQ2xvdGhlc3xlbnwwfHwwfHx8MA%3D%3D",
    },
  ];

  const [visibleItems, setVisibleItems] = useState(new Set());

  useEffect(() => {
    const observers = [];

    // Create IntersectionObserver for each item
    items.forEach((item) => {
      const element = document.getElementById(`item-${item.id}`);
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleItems((prev) => new Set(prev).add(item.id));
            }
          });
        },
        { threshold: 0.5 }
      );
      if (element) observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [items]);

  return (
    <div className="bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100 min-h-screen p-8">
      <h1 className="text-gray-500 text-4xl font-bold text-center mb-8">
        Eco Store
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            id={`item-${item.id}`}
            className={`bg-white h-[500px] rounded-lg shadow-md overflow-hidden transform transition-all duration-700 ${
              visibleItems.has(item.id)
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
            style={{
              transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
            }}
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
