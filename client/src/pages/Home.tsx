import React from "react";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
      <h1 className="text-4xl font-bold mb-6">მაფიის ღამე</h1>
      <div className="space-x-4">
        <button className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded text-lg">
          თამაშის დაწყება
        </button>
        <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded text-lg">
          მეგობრებთან თამაში
        </button>
      </div>
    </div>
  );
};

export default Home;
