import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";

export default function UserProfile() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const userName = user?.email?.split('@')[0].replace(/[0-9]/g, '') || "Utilisateur";

  const menuItems = [
    { label: "Profil" },
    { label: "Paramètres" },
    { label: "Modifier le mot de passe", onClick: () => navigate("/resetpassword") },
    { label: "Support" },
    { label: "À propos" },
  ];

  return (
    <div className="relative">
      {/* Avatar cliquable */}
      <div
        className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center cursor-pointer text-white font-bold text-lg"
        onClick={() => setOpen(!open)}
      >
        {userName.charAt(0).toUpperCase()}
      </div>

      {/* Menu déroulant */}
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
          <div className="px-4 py-2 font-semibold border-b">{userName}</div>
          <ul className="py-2 text-sm">
            {menuItems.map((item, index) => (
              <li
                key={index}
                onClick={item.onClick}
                className={`px-4 py-1 hover:bg-gray-100 cursor-pointer ${item.onClick ? "text-blue-600" : ""}`}
              >
                {item.label}
              </li>
            ))}
            <li>
              <Button
                onClick={logout}
                className="w-full text-left text-red-600 px-4 py-1 hover:bg-gray-100"
              >
                Déconnexion
              </Button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
