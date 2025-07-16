import Button from "../ui/Button";
import { Menu } from "lucide-react";
export default function Header({ onToggleSidebar }) {
  return (
   <div className="flex items-center w-full gap-4  bg-white border-r border-gray-200 ">
      <Button
        onClick={onToggleSidebar}
        className="p-2 rounded bg-gray-100 hover:bg-gray-300 hover:text-white "
        title="hamburger menu"
      >
        <Menu  className={`w-5 h-5 transform transition-transform`} />
      </Button>
    </div>
  );
}
