import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Topbar />

        <main className="flex-1 p-6">
          <Outlet /> {/* Child routes render here */}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
