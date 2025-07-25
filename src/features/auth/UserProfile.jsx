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
    { label: "Modifier le mot de passe", onClick: () => navigate("/resetpassword") },
    { label: "Support" },
  ];

  return (
    <div className="">
      {/* Avatar cliquable */}
      <div
        className="w-12 h-12 bg-gray-400 rounded-full flex items-center justify-center cursor-pointer text-white font-bold text-lg"
        onClick={() => setOpen(!open)}
      >
        {userName.charAt(0).toUpperCase()}
      </div>

      {/* Menu déroulant */}
      {open && (
        <div className="absolute right-5 mt-[13px] flex w-[260px] flex-col rounded-2xl border border-gray-200 bg-white p-3 z-60">
          <div className="px-4 py-2 font-semibold ">{userName}</div>
          <ul className="flex flex-col gap-1 pt-4 pb-3">
            {menuItems.map((item, index) => (
              <li
                key={index}
                onClick={item.onClick}
                className="px-3 py-2 hover:bg-gray-100 rounded-lg cursor-pointer"
              >
                {item.label}
              </li>
            ))}
            <div className=" border-t border-gray-300"/>
            <li>
              <Button
                onClick={logout}
                className="w-full text-left rounded-lg px-4 py-2 hover:bg-gray-100"
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
