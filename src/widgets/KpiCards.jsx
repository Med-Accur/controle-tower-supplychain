import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { ChevronDown } from "lucide-react";
import { useState } from "react";


export default function KpiCards({ cards = [] }) {
    const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
    const [selectedKpis, setSelectedKpis] = useState([
    'nb_commandes',
    'otif',
    'taux_retards',
    'duree_cycle_moyenne_jours',
  ]);

  const handleChangeKpi = (index, newKey) => {
    const newKpis = [...selectedKpis];
    newKpis[index] = newKey;
    setSelectedKpis(newKpis);
    setOpenDropdownIndex(null);
  };
  
  return (
    <>
      {selectedKpis.map((key, index) => {
        const kpi = cards.find(k => k.key === key);
        return (
            <div key={index}>
                <Card
                    title={kpi.title}
                    value={kpi.value}
                    icon={kpi.icon}
                />
                <Button className="text-gray-400 hover:text-[#A79882] transition" onClick={() =>
                setOpenDropdownIndex(openDropdownIndex === index ? null : index)
              }>
                    <ChevronDown className={`w-5 h-5 transform transition-transform duration-300 ${openDropdownIndex === index ? 'rotate-180' : ''}`} />
                </Button>
                {openDropdownIndex === index && (
              <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                {cards.map(option => (
                  <div
                    key={option.key}
                    onClick={() => handleChangeKpi(index, option.key)}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-100 cursor-pointer text-sm text-gray-700 "
                  >
                    <div className="w-6 h-6 text-gray-500 ">
                      {option.icon}
                    </div>
                    <span>{option.title}</span>
                  </div>
                ))}
              </div>
            )}
            </div>
        )
      })}
    </>
  );
}

