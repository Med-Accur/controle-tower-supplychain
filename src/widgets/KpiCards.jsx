import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import * as Icons from "lucide-react";
import { useCommandes } from "../hooks/cmd client/useCommandes";

export default function KpiCards({ cards = [], kpi }) {
  const {kpiData, fetchCmdKpis } = useCommandes();
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const [selectedKpis, setSelectedKpis] = useState(kpi);
  
  const handleChangeKpi = (index, newKey) => {
    const newKpis = [...selectedKpis];
    newKpis[index] = newKey;
    setSelectedKpis(newKpis);
    setOpenDropdownIndex(null);     
    fetchCmdKpis(newKey);    
  };
  
  
  useEffect(() => {
    selectedKpis.forEach((kpi) => {
        fetchCmdKpis(kpi);
    });
  }, []);
  
  return (
    <>
      {selectedKpis.map((key, index) => {
        const kpi = cards.find(k => k.key === key);
        const Icon = Icons[kpi.icon];
        return (
            <div key={index} className="relative group">
                <Card
                    className="bg-white"
                    title={kpi.nom}
                    value={kpiData[kpi.key]}
                    unit={kpi.unit}
                    icon={Icon ? <Icon className="w-6 h-6 text-[#A79882]" /> : null}
                />
                <Button className="absolute top-4 right-4 text-gray-400 hover:text-[#A79882] transition" onClick={() =>setOpenDropdownIndex(openDropdownIndex === index ? null : index)}>
                    <ChevronDown className={`w-5 h-5 transform transition-transform duration-300 ${openDropdownIndex === index ? 'rotate-180' : ''}`} />
                </Button>
                {openDropdownIndex === index && (
                    <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-sm z-10">
                        {cards.map(option => {
                            const OptionIcon = Icons[option.icon];
                        return(
                        <div
                            key={option.key}
                            onClick={() => handleChangeKpi(index, option.key)}
                            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-100 cursor-pointer text-sm text-gray-700 "
                        >
                            <div className="w-6 h-6 text-gray-500 ">
                                {OptionIcon ?<OptionIcon className="w-6 h-6 text-[#A79882]" /> : null}
                            </div>
                            <span>{option.nom}</span>
                        </div>
                        )
                })}
                    </div>
            )}
            </div>
        )
      })}
    </>
  );
}

