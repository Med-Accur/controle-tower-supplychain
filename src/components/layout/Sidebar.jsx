import { NavLink,useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import {Home,Package,Users,DollarSign,Megaphone} from "lucide-react";

const menuItems = [
   { label: "Dashboard", icon: Home, path: "/dashboard" },
   { label: "Commande Client", icon: Package, path: "/commandes" },
   { label: "Stock", icon: Users, path: "/stock" },
   { label: "Fournisseur", icon: DollarSign, path: "/fournisseurs" },
];


export default function Sidebar({ isCollapsed }) {
    const location = useLocation();
    
  return (
    <nav
      className={`fixed top-0 left-0 h-screen flex flex-col bg-white border-r border-gray-200
      ${isCollapsed ? "w-25" : "w-70"} transition-width duration-300 ease-in-out`}
    >
      <div className="flex items-center justify-center h-18 border-b border-gray-200">
        {!isCollapsed ? (
          <h2 className="text-md font-bold text-[#bfa76f]">Contole Tower Supplychain</h2>
        ) : (
            <img src={logo} alt="Logo" className="h-10 w-10"/>
        )}
      </div>
      <div className="flex flex-col flex-1 p-4 space-y-2 overflow-auto">
        {menuItems.map(({ label, icon: Icon, path }) => {
            const isActive = location.pathname === path;
            return (
          <NavLink
            key={path}
            to={path}
            className={
              `flex items-center gap-4 py-5 rounded-lg text-sm font-medium transition-all duration-200
              ${
                      isActive
                        ? "bg-[#bfa76f] text-white"
                        : "text-[#3c352f] hover:bg-[#f0ede5]"
                    }
                    ${isCollapsed ? "justify-center px-4" : "px-4"}`}
          >
            <Icon className="h-6 w-6" />
            {!isCollapsed && <span className="truncate">{label}</span>}
          </NavLink>
        );
      })}
      </div>
    </nav>
  );
}


