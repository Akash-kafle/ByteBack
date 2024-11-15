import React, { useEffect, useState } from "react";
import { FaRecycle, FaGlobe, FaHandshake, FaAward } from "react-icons/fa";

const About = () => {
  const [isMissionVisible, setIsMissionVisible] = useState(false);
  const [isVisionVisible, setIsVisionVisible] = useState(false);
  const [isFeaturesVisible, setIsFeaturesVisible] = useState(false);

  // Intersection Observer setup
  useEffect(() => {
    const missionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsMissionVisible(true);
          }
        });
      },
      { threshold: 0.5 }
    );

    const visionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisionVisible(true);
          }
        });
      },
      { threshold: 0.5 }
    );

    const featuresObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsFeaturesVisible(true);
          }
        });
      },
      { threshold: 0.5 }
    );

    // Observe elements
    missionObserver.observe(document.getElementById("mission"));
    visionObserver.observe(document.getElementById("vision"));
    featuresObserver.observe(document.getElementById("features"));

    return () => {
      missionObserver.disconnect();
      visionObserver.disconnect();
      featuresObserver.disconnect();
    };
  }, []);

  return (
    <div className="bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100 min-h-screen flex flex-col items-center justify-center py-10">
      <div className="max-w-5xl w-full px-8 sm:px-16 md:px-28">
        {/* Title Section */}
        <h2 className="text-4xl font-extrabold mb-4 text-center text-teal-700">
          About Us
        </h2>
        <h3 className="text-2xl font-medium italic text-center text-teal-500 mb-6">
          "Your Partner in Sustainable E-Waste Management"
        </h3>

        <div className="mt-12 space-y-12">
          {/* Mission and Vision Sections in Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission Section */}
            <div
              id="mission"
              className={`bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform ${
                isMissionVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{
                transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
              }}
            >
              <h3 className="text-xl font-semibold text-teal-700 mb-3">
                Our Mission
              </h3>
              <p className="text-base text-gray-700">
                We aim to promote responsible e-waste disposal through a
                transparent, user-friendly platform that encourages sustainable
                practices. Our vision is a world where every piece of e-waste is
                properly managed to reduce environmental impact and protect the
                planet.
              </p>
            </div>

            {/* Vision Section */}
            <div
              id="vision"
              className={`bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform ${
                isVisionVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{
                transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
              }}
            >
              <h3 className="text-xl font-semibold text-teal-700 mb-3">
                Our Vision
              </h3>
              <p className="text-base text-gray-700">
                We strive to make e-waste disposal accessible, transparent, and
                rewarding. By tracking every disposal action on the Solana
                blockchain, we provide users with a secure and transparent way
                to monitor their e-waste contributions, empowering communities
                to take meaningful action toward a cleaner environment.
              </p>
            </div>
          </div>

          {/* Key Features Section */}
          <div
            id="features"
            className={`bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform ${
              isFeaturesVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
            style={{
              transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
            }}
          >
            <h3 className="text-xl font-semibold text-teal-700 mb-5">
              Key Features
            </h3>
            <div className="space-y-4 text-gray-700">
              <div className="flex items-start space-x-4">
                <FaRecycle className="text-teal-500 text-2xl" />
                <p>
                  <strong>E-Waste Drop-Off Locator:</strong> Find the nearest
                  drop-off points for convenient disposal.
                </p>
              </div>
              <div className="flex items-start space-x-4">
                <FaGlobe className="text-teal-500 text-2xl" />
                <p>
                  <strong>Blockchain Tracking:</strong> Every submission is
                  recorded for transparency.
                </p>
              </div>
              <div className="flex items-start space-x-4">
                <FaAward className="text-teal-500 text-2xl" />
                <p>
                  <strong>Eco-Points System:</strong> Earn points for each
                  responsible disposal, redeemable for rewards.
                </p>
              </div>
              <div className="flex items-start space-x-4">
                <FaHandshake className="text-teal-500 text-2xl" />
                <p>
                  <strong>User Dashboard:</strong> View points, disposal
                  history, and status updates for tracked items.
                </p>
              </div>
            </div>
          </div>

          {/* Closing Section */}
          <div className="text-center mt-10">
            <p className="text-lg text-gray-700">
              Join us in making a positive impact on the environment. Every
              action matters, and together, we can pave the way to a sustainable
              future.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
