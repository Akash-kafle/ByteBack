import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCoins, faRecycle } from "@fortawesome/free-solid-svg-icons";

// Dummy user data (replace with actual data from API or context)
const dummyUser = {
  name: "John Doe",
  email: "johndoe@example.com",
  profilePicture: "https://via.placeholder.com/150",
  ecoPoints: 1200, // Eco points as crypto coins
  transactions: [
    { id: "T001", date: "2024-10-01", points: 200, type: "Earned" },
    { id: "T002", date: "2024-10-05", points: 150, type: "Earned" },
    { id: "T003", date: "2024-10-10", points: -50, type: "Redeemed" },
    { id: "T004", date: "2024-10-15", points: 300, type: "Earned" },
  ],
  recycleHistory: [
    { id: "R001", date: "2024-10-05", item: "Old Mobile Phone", points: 100 },
    { id: "R002", date: "2024-10-10", item: "Old Laptop", points: 200 },
    { id: "R003", date: "2024-10-15", item: "Broken Tablet", points: 50 },
  ],
};

const Profile = () => {
  const [user, setUser] = useState(dummyUser);

  useEffect(() => {
    // You can replace this with an API call or context to fetch the user data
    // fetchUserData().then(data => setUser(data));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Decorative background elements */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(45%_25%_at_50%_50%,rgba(34,197,94,0.05)_0%,rgba(126,231,135,0)_100%)] pointer-events-none" />
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(35%_35%_at_80%_20%,rgba(16,185,129,0.05)_0%,rgba(52,211,153,0)_100%)] pointer-events-none" />

      <div className="p-6 max-w-7xl mx-auto">
        {/* Profile Header */}
        <div className="mb-8 bg-white/40 p-6 rounded-2xl backdrop-blur-sm border border-white/20">
          <div className="flex items-center space-x-4">
            <img
              src={user.profilePicture}
              alt="User Profile"
              className="w-24 h-24 rounded-full border-4 border-white"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Eco Points */}
        <div className="mb-8 bg-white/40 p-6 rounded-2xl backdrop-blur-sm border border-white/20">
          <div className="flex items-center space-x-4">
            <div className="bg-green-100 p-4 rounded-xl">
              <FontAwesomeIcon
                icon={faCoins}
                className="h-6 w-6 text-green-600"
              />
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-800">Eco Points</p>
              <p className="text-2xl font-bold text-green-600">
                {user.ecoPoints} Points
              </p>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-white/40 p-6 rounded-2xl backdrop-blur-sm border border-white/20">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Transaction History
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-600 border-b border-gray-200">
                  <th className="pb-3 font-medium">Transaction ID</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Points</th>
                  <th className="pb-3 font-medium">Type</th>
                </tr>
              </thead>
              <tbody>
                {user.transactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="border-b border-gray-100 last:border-0"
                  >
                    <td className="py-3 text-sm">{transaction.id}</td>
                    <td className="py-3 text-sm">{transaction.date}</td>
                    <td
                      className={`py-3 text-sm ${
                        transaction.points > 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {transaction.points}
                    </td>
                    <td
                      className={`py-3 text-sm ${
                        transaction.type === "Earned"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {transaction.type}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recycle History */}
        <div className="bg-white/40 p-6 rounded-2xl backdrop-blur-sm border border-white/20 mt-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Recycle History
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-600 border-b border-gray-200">
                  <th className="pb-3 font-medium">Recycle ID</th>
                  <th className="pb-3 font-medium">Item</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Points Earned</th>
                </tr>
              </thead>
              <tbody>
                {user.recycleHistory.map((recycle) => (
                  <tr
                    key={recycle.id}
                    className="border-b border-gray-100 last:border-0"
                  >
                    <td className="py-3 text-sm">{recycle.id}</td>
                    <td className="py-3 text-sm">{recycle.item}</td>
                    <td className="py-3 text-sm">{recycle.date}</td>
                    <td className="py-3 text-sm text-green-600">
                      {recycle.points} Points
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

export default Profile;
