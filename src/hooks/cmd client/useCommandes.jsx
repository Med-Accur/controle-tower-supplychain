import { useState, useEffect } from "react";
import { getKpi, getCommandeKpis } from "../../servicess/cmd client/commandeService";


export function useCommandes() {
  const [kpis, setKpis] = useState([]);
  const [kpiData, setKpiData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //la fonction qui retourne les kpi
  const fetchKpis = async (kpi) => {
    setLoading(true);
    try {
      const data = await getKpi(kpi);
      setKpis(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  //la fonction qui retourne les valeur de chaque kpi
  const fetchCmdKpis = async (kpiName, rpc) => {
    try {
      const data = await getCommandeKpis(kpiName, rpc);
      setKpiData((prev) => ({
        ...prev,
        [kpiName]: data[0]?.valeur ?? null,
      }));
    } catch (err) {
      console.error(err.message);
    }
  };

  return {
    kpis,
    loading,
    error,
    kpiData,
    fetchKpis,
    fetchCmdKpis
  };
}
