import { useState } from "react";
// on réutilise TON service existant (ne rien changer dans ce fichier-là)
import { getKpi, getCommandeKpis } from "../../servicess/cmd client/commandeService";
export function useStock() {
  const [kpis, setKpis] = useState([]);
  const [kpiData, setKpiData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // charge les métadonnées KPI (module = 'stock')
  const fetchKpis = async (modules = ["stock"]) => {
    setLoading(true);
    try {
      const data = await getKpi(modules); // .in('module', modules) -> tu l'as déjà
      setKpis(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  // charge la valeur d'un KPI stock (via RPC unique get_kpi_stock)
  const fetchStockKpi = async (kpiName) => {
    try {
      const data = await getCommandeKpis(kpiName, "get_kpi_stock");
      setKpiData((prev) => ({
        ...prev,
        [kpiName]: data?.[0]?.valeur ?? null,
      }));
    } catch (err) {
      console.error("Erreur récupération KPI Stock :", err.message);
    }
  };
  return {
    kpis,
    kpiData,
    loading,
    error,
    fetchKpis,
    fetchStockKpi,
  };
}