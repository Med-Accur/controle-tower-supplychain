import { useEffect, useRef } from "react";
import * as Icons from "lucide-react";
import Card from "../../components/ui/Card";
import { useCommandes } from "../../hooks/cmd client/useCommandes";

export default function CardWidget({ kpi = [] }) {
  const { kpiData, fetchCmdKpis } = useCommandes();
  const fetchedKeysRef = useRef(new Set());


  useEffect(() => {
    const keysToFetch = kpi.map((item) => item.key).filter((key) => !fetchedKeysRef.current.has(key));
    
    if (keysToFetch.length === 0) return;

    keysToFetch.forEach((key) => {
      console.log("Fetching KPI:", key);
      fetchCmdKpis(key);
      fetchedKeysRef.current.add(key);
    });
  }, [kpi]);

  return (
    <>
      {kpi.map((item) => {
        const Icon = Icons[item.icon];
        
        return (
          <div key={item.key} className="">
            <Card
              className="bg-white"
              title={item.nom}
              value={kpiData[item.key]}
              unit={item.unit}
              icon={Icon ? <Icon className="w-6 h-6 text-[#A79882]" /> : null}
            />
          </div>
        );
      })}
    </>
  );
}
