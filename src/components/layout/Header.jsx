import Button from "../ui/Button";
import { Menu } from "lucide-react";
import UserProfile from "../../features/auth/UserProfile";

export default function Header({ onToggleSidebar }) {
  return (
    <div className="flex items-center justify-between w-full gap-4 bg-white border-b px-4 py-2 shadow-sm">
      
      {/* Bouton pour le menu burger */}
      <Button
        onClick={onToggleSidebar}
        className="p-2 rounded bg-gray-100 hover:bg-gray-300 hover:text-white"
        title="hamburger menu"
      >
        <Menu className="w-5 h-5" />
      </Button>

      {/* Zone profil utilisateur à droite */}
      <div className="ml-auto">
        <UserProfile />
      </div>
    </div>
  );
}
