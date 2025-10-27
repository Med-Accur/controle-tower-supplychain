import { useState, useMemo, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import Button from "../ui/Button";
import { X } from "lucide-react";

export default function ChartLayout({
  isCollapsed,
  setIsCollapsed,
  onSelectionChange,
  chartModule,
  initialSelectedWidgets = []
}) {
  const { meData } = useAuth();

  // Grouper les charts par module, stable grâce à useMemo
  const grouped = useMemo(() => {
    if (!meData || !meData.chart) return { Graphique: [] };
    const chartcmd = meData.chart.filter((k) => k.module === chartModule);
    return { Graphique: chartcmd || [] };
  }, [meData]);

  const [activeGroup, setActiveGroup] = useState("Graphique");

  // Initialiser checkedItems une seule fois
  const initialCheckedItems = useMemo(() => {
    const initial = { Graphique: {} };
    (initialSelectedWidgets || []).forEach((w) => {
      const group = grouped[w.widget_type];
      if (group) {
        const item = group.find((i) => i.key === w.widget_key) || { key: w.widget_key, nom: w.widget_key };
        initial[w.widget_type][w.widget_key] = item;
      }
    });
    return initial;
  }, [initialSelectedWidgets, grouped]);

  const [checkedItems, setCheckedItems] = useState(initialCheckedItems);

  // Mettre à jour la sélection à chaque changement
 useEffect(() => {
    const selections = {};
    for (const group in checkedItems) {
      selections[group] = Object.values(checkedItems[group]);
    }
    onSelectionChange(selections);
  }, [checkedItems, onSelectionChange]);

  const toggleCheck = (group, item) => {
    setCheckedItems((prev) => {
      const groupItems = { ...prev[group] };
      if (groupItems[item.key]) {
        delete groupItems[item.key];
      } else {
        groupItems[item.key] = item;
      }
      return { ...prev, [group]: groupItems };
    });
  };

  if (!isCollapsed) return null;

  return (
    <div className="fixed z-20 w-72 top-18 right-0 h-screen flex flex-col bg-white border-l border-gray-200 transition-width duration-500">
      <nav className="flex flex-col h-full">
        <div className="px-4 bg-[#f0ede5] h-16 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Ajouter un Graphique</h2>
          <button onClick={() => setIsCollapsed(false)} className="text-gray-600 hover:text-gray-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 flex flex-col items-start space-y-2">
          <div className="flex space-x-3">
            {["Graphique"].map((groupKey) => (
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
                <div className={`h-[2px] mt-3 w-full ${activeGroup === groupKey ? "bg-[#bfa76f]" : "bg-transparent"}`} />
              </div>
            ))}
          </div>
        </div>

        <ul className="flex flex-col flex-1 p-4 space-y-2 overflow-auto">
          {(grouped[activeGroup] || []).map((k, i) => (
            <li key={i} className="flex items-center gap-4 py-2 rounded-lg text-sm font-medium px-4">
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
