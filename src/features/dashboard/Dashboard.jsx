import { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Button from "../../components/ui/Button";

export default function Dashboard() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="relative px-10 py-6 min-h-screen">
      <h1 className=" text-2xl font-bold">Bienvenue sur le Dashboard</h1>
      <div className={`fixed right-9 transition-all duration-300 ${isCollapsed ? "mr-64" : "mr-0"}`}>
        <Button
          className="bg-blue-500 text-white px-3 py-1 rounded"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          Ajouter Widget
        </Button>
      </div>
        <DashboardLayout isCollapsed={isCollapsed} />
    </div>
  );
}
