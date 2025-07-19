import { useState } from "react";
import Button from "../ui/Button";

const groups = {
  card: [
    { label: "Dashboard" },
    { label: "Commande Client" },
    { label: "Stock" },
  ],
  chart: [
    { label: "Fournisseur" },
    { label: "Clients" },
    { label: "Produits" },
  ],
  table: [
    { label: "Rapports" },
    { label: "Paramètres" },
    { label: "Utilisateurs" },
  ],
   map: [
    { label: "Rapports" },
    { label: "Paramètres" },
    { label: "Utilisateurs" },
  ],
};

export default function DashboardLayout({ isCollapsed }) {
  const [activeGroup, setActiveGroup] = useState("card");
  const [checkedItems, setCheckedItems] = useState({});

  const toggleCheck = (label) => {
    setCheckedItems((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  if (!isCollapsed) return null;

  return (
    <nav className={`fixed w-72 top-16 right-0 h-screen flex flex-col bg-white border-l  border-gray-200 transition-width duration-500`}>
      <div className="p-4 flex flex-col items-start space-y-2">
  <div className="flex space-x-3">
    {["card", "chart", "table", "map"].map((groupKey) => (
      <div key={groupKey}>
        <Button
          children={groupKey}
          onClick={() => setActiveGroup(groupKey)}
          className={`px-3 py-1 rounded-sm ${
            activeGroup === groupKey
              ? "bg-[#f0ede5] text-[#bfa76f]"
              : "text-[#3c352f] hover:bg-[#f0ede5]"
          }`}
        />
        <div
          className={`h-[2px] mt-3 w-full ${
            activeGroup === groupKey ? "bg-[#bfa76f]" : "bg-transparent"
          }`}
        />
      </div>
    ))}
  </div>
</div>

      <ul className="flex flex-col flex-1 p-4 space-y-2 overflow-auto">
        {groups[activeGroup].map(({ label }) => (
          <li
            key={label}
            className="flex items-center gap-4 py-2 rounded-lg text-sm font-medium px-4"
          >
            <input
              type="checkbox"
              checked={!!checkedItems[label]}
              onChange={() => toggleCheck(label)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span>{label}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
}
