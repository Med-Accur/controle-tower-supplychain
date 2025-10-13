import { useEffect, useRef } from "react";
import * as Icons from "lucide-react";
import Card from "../../components/ui/Card"
import { useDashboard } from "../../hooks/dashboard/useDashboard";

export default function CardWidget({ kpi = [] }) {
  const { table, fetchDataWidget } = useDashboard();
  const fetchedKeysRef = useRef(new Set());

  useEffect(() => {
    const keysToFetch = kpi.map((item) => item).filter((item) => !fetchedKeysRef.current.has(item.key,item.rpc_name));
   
    if (keysToFetch.length === 0) return;
    keysToFetch.forEach((k) => {
      fetchDataWidget(k.key);
      fetchedKeysRef.current.add(k.key);
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
              value={table[item.key]}
              unit={item.unit}
              icon={Icon ? <Icon className="w-6 h-6 text-[#A79882]" /> : null}
            />
          </div>
        );
      })}
    </>
  );
}
