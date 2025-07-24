import { useState, useEffect } from "react";
import Button from "../ui/Button";
import {useCommandes} from "../../hooks/cmd client/useCommandes";
import { useDashboard } from "../../hooks/dashboard/useDashboard";


export default function DashboardLayout({ isCollapsed, onSelectionChange }) {
  const [grouped, setGrouped] = useState({});
  const [activeGroup, setActiveGroup] = useState("card");
  const { kpis, fetchKpis } = useCommandes();
  const { table, loading, error, tableData, fetchTable } = useDashboard();
  const [checkedItems, setCheckedItems] = useState({
  card: {},
  table: {},
  chart: {},
  map: {},
});
  
  useEffect(() => {
    fetchKpis(["cmd_client", "stock", "fournisseur"]);
    fetchTable();
  }, []);

  useEffect(() => {
    setGrouped({
      card:  kpis,
      chart: [],
      table: table,
      map: [],
    });
  }, [kpis, table]);

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
};



  if (!isCollapsed) return null;

  return (
    <div className="fixed z-20 w-72 top-18 right-0 h-screen flex flex-col bg-white border-l border-gray-200 transition-width duration-500">
    <nav >
      <div className="bg-[#f0ede5] h-16 flex items-center justify-center">
        <h2 className="text-lg font-semibold">Ajouter un Widget</h2>
      </div>
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
