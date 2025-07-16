import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const sidebarWidth = isCollapsed ? "w-25" : "w-70";
  const contentLeft = isCollapsed ? "left-25" : "left-70";

  return (
    <div className="relative min-h-screen bg-[#F9FAFB]">
      <aside
        className={`fixed top-0 left-0 h-screen ${sidebarWidth} bg-white shadow-md transition-all duration-300 z-40`}
      >
        <Sidebar isCollapsed={isCollapsed} />
      </aside>
      <header
        className={`fixed top-0 ${contentLeft} right-0 h-16 bg-white shadow flex items-center px-6 z-30 transition-all duration-300`}
      >
        <Header onToggleSidebar={() => setIsCollapsed((prev) => !prev)} />
      </header>
      <main
        className={`pt-16 ${isCollapsed ? "pl-20" : "pl-64"} transition-all duration-300 p-6`}
      >
        <Outlet />
      </main>
    </div>
  );
}
