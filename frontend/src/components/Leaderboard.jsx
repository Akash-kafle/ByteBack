import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMedal, faCoins, faRecycle } from "@fortawesome/free-solid-svg-icons";

// Dummy data for leaderboard (replace with API data)
const dummyLeaderboardData = [
  {
    id: 1,
    name: "Alice Smith",
    profilePicture: "https://via.placeholder.com/50",
    ecoPoints: 2500,
    devicesRecycled: 15,
  },
  {
    id: 2,
    name: "John Doe",
    profilePicture: "https://via.placeholder.com/50",
    ecoPoints: 1800,
    devicesRecycled: 10,
  },
  {
    id: 3,
    name: "Emma Johnson",
    profilePicture: "https://via.placeholder.com/50",
    ecoPoints: 1500,
    devicesRecycled: 8,
  },
  {
    id: 4,
    name: "Michael Brown",
    profilePicture: "https://via.placeholder.com/50",
    ecoPoints: 1200,
    devicesRecycled: 6,
  },
  {
    id: 5,
    name: "Sophia Davis",
    profilePicture: "https://via.placeholder.com/50",
    ecoPoints: 1000,
    devicesRecycled: 4,
  },
];

const Leaderboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100">
      <div className="p-6 max-w-5xl mx-auto">
        {/* Leaderboard Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 text-center">
            🌟 Leaderboard 🌟
          </h1>
          <p className="text-center text-gray-600">
            Top users ranked by eco-points and devices recycled
          </p>
        </div>

        {/* Leaderboard Table */}
        <div className="bg-white p-6 rounded-2xl backdrop-blur-sm border border-white/20">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-600 border-b border-gray-200">
                <th className="pb-3 font-medium">Rank</th>
                <th className="pb-3 font-medium">User</th>
                <th className="pb-3 font-medium">Eco Points</th>
                <th className="pb-3 font-medium">Devices Recycled</th>
              </tr>
            </thead>
            <tbody>
              {dummyLeaderboardData.map((user, index) => (
                <tr
                  key={user.id}
                  className="border-b border-gray-100 last:border-0"
                >
                  <td className="py-3 text-sm">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-gray-800">
                        {index + 1}
                      </span>
                      {index === 0 && (
                        <FontAwesomeIcon
                          icon={faMedal}
                          className="text-yellow-400"
                          title="Gold"
                        />
                      )}
                      {index === 1 && (
                        <FontAwesomeIcon
                          icon={faMedal}
                          className="text-gray-400"
                          title="Silver"
                        />
                      )}
                      {index === 2 && (
                        <FontAwesomeIcon
                          icon={faMedal}
                          className="text-orange-400"
                          title="Bronze"
                        />
                      )}
                    </div>
                  </td>
                  <td className="py-3 text-sm flex items-center space-x-4">
                    <img
                      src={user.profilePicture}
                      alt={user.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <span>{user.name}</span>
                  </td>
                  <td className="py-3 text-sm text-green-600">
                    <FontAwesomeIcon icon={faCoins} className="mr-2" />
                    {user.ecoPoints} Points
                  </td>
                  <td className="py-3 text-sm text-blue-600">
                    <FontAwesomeIcon icon={faRecycle} className="mr-2" />
                    {user.devicesRecycled} Devices
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
