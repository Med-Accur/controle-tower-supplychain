// hooks/cmd client/useCharts.jsx
import { useState, useEffect } from "react";
import { getChartsMeta, getChartData } from "../../servicess/cmd client/chartService";

export function useCharts() {
  const [chartsMeta, setChartsMeta] = useState([]);
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const fetchChartsMeta = async (module) => {
    try {
      setLoading(true);
      const data = await getChartsMeta(module);
      setChartsMeta(data);
    } catch (err) {
      console.error("Erreur chargement métadonnées :", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 📈 Récupère les données d’un graphique spécifique
  const fetchChartData = async (rpcName, chartKey, params = {}) => {
    try {
      setLoading(true);

      const data = await getChartData(rpcName, params);

      setChartData((prev) => ({
        ...prev,
        [chartKey]: data,
      }));
    } catch (err) {
      console.error("Erreur chargement données graphique :", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    chartsMeta,      
    chartData,       
    loading,        
    error,          
    fetchChartsMeta, 
    fetchChartData,  
  };
}
