import { Link } from "react-router-dom";
import Button from '../../components/ui/Button';

export default function MenuDropdown({ items = [] }) {
  return (
    <ul className="py-2 text-sm">
      {items.map((item, index) => (
        <li key={index} className={`px-4 py-1 hover:bg-gray-100 cursor-pointer ${item.className || ""}`}>
          {item.to ? (
            <Link to={item.to}>{item.label}</Link>
          ) : item.onClick ? (
            <Button onClick={item.onClick} className="w-full text-left bg-transparent hover:bg-gray-100">
              {item.label}
            </Button>
          ) : (
            item.label
          )}
        </li>
      ))}
    </ul>
  );
}
