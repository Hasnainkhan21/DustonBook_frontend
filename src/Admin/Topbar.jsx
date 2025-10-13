import React from "react";

const Topbar = () => {
  return (
    <div className="bg-white shadow-sm px-6 py-3 flex items-center justify-between">
      <h2 className="text-xl font-semibold text-gray-700">Dashboard</h2>
      <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition">
        Logout
      </button>
    </div>
  );
};

export default Topbar;
