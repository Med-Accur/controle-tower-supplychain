import { useState, useEffect } from "react";
import Button from "../ui/Button";
import { X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function ChartLayout({ isCollapsed, setIsCollapsed, onSelectionChange, chartModule }) {
  const [grouped, setGrouped] = useState({});
  const { meData } = useAuth();
  const [checkedItems, setCheckedItems] = useState({ chart: {}});
  const [activeGroup, setActiveGroup] = useState("chart");

  useEffect(() => {
    setGrouped({
      chart: chartModule,
    });
  }, [chartModule]);
  
  
  useEffect(() => {
  const selections = {};
  for (const group in checkedItems) {
    selections[group] = Object.values(checkedItems[group]); 
  }
  onSelectionChange(selections);
}, [checkedItems]);


  const toggleCheck = (group, item) => {
  setCheckedItems((prev) => {
    const groupItems = { ...prev[group] };
    if (groupItems[item.key]) {
      delete groupItems[item.key];
    } else {
      groupItems[item.key] = item; 
    }

    return {
      ...prev,
      [group]: groupItems,
    };
  });
  setIsCollapsed(false);
};


  if (!isCollapsed) return null;
  
  return (
    <div className="fixed z-20 w-72 top-18 right-0 h-screen flex flex-col bg-white border-l border-gray-200 transition-width duration-500">
    <nav >
      <div className="bg-[#f0ede5] h-16 flex items-center justify-between px-4">
        <h2 className="text-lg font-semibold">Ajouter un Chart</h2>
        <button  onClick={() => setIsCollapsed(false)} className="p-2 rounded bg-gray-100 hover:bg-gray-300 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="p-4 flex flex-col items-start space-y-2">
  <div className="flex space-x-3">
    {["chart"].map((groupKey) => (
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
        {grouped[activeGroup].map((k,i) => (
          <li
            key={i}
            className="flex items-center gap-4 py-2 rounded-lg text-sm font-medium px-4"
          >
            <input
              type="checkbox"
              checked={!!checkedItems[activeGroup][k.key]}
              onChange={() => toggleCheck(activeGroup, k)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span>{k.nom}</span>
          </li>
        ))}
      </ul>
    </nav>
    </div>
  );
}
