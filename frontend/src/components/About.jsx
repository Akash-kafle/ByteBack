import React from 'react';

const About = () => {
  return (
    <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 h-screen flex flex-col items-center justify-center">
      <div className="max-w-4xl w-full px-28">
        <h2 className="text-3xl font-semibold mb-2 text-center">About Us</h2>
        <h3 className="text-2xl font-bold italic text-center">"Your Partner in Sustainable E-Waste Management"</h3>

        {/* Slightly elevate the next section */}
        <div className="mt-8">

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-2">Our Mission</h3>
              <p className="text-sm text-gray-800">
                We aim to promote responsible e-waste disposal through a transparent, user-friendly platform that encourages sustainable practices. Our vision is a world where every piece of e-waste is properly managed to reduce environmental impact and protect the planet.
              </p>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-2">Our Vision</h3>
              <p className="text-sm text-gray-800">
                We strive to make e-waste disposal accessible, transparent, and rewarding. By tracking every disposal action on the Solana blockchain, we provide users with a secure and transparent way to monitor their e-waste contributions, empowering communities to take meaningful action toward a cleaner environment.
              </p>
            </div>
          </div>

          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-2">Key Features</h3>
            <ul className="list-disc list-inside text-sm text-gray-800">
              <li><strong>E-Waste Drop-Off Locator:</strong> Find the nearest drop-off points for convenient disposal.</li>
              <li><strong>Blockchain Tracking:</strong> Every submission is recorded for transparency.</li>
              <li><strong>Eco-Points System:</strong> Earn points for each responsible disposal, redeemable for rewards.</li>
              <li><strong>User Dashboard:</strong> View points, disposal history, and status updates for tracked items.</li>
            </ul>
          </div>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-800">Join us in making a positive impact on the environment. Every action matters, and together, we can pave the way to a sustainable future.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
