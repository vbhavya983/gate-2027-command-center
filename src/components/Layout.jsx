import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      {/* Header */}
      <Header />

      <div className="flex">

        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="min-w-0 flex-1">
          <div className="p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </main>

      </div>

    </div>
  );
}

export default Layout;