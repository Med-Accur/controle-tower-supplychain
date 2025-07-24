import { useEffect, useState } from "react";
import { getEnumValues, getModeLivraisonNoms } from "../../servicess/cmd client/ChartFiltersService"; // Assurez-vous que le chemin est correct

export default function useChartFilters() {
  const [allStatuts, setAllStatuts] = useState([]);
  const [allModes, setAllModes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFilters = async () => {
      setLoading(true);
      try {
        const statuts = await getEnumValues("statutcommande");
        const modes = await getModeLivraisonNoms();
        setAllStatuts(statuts);
        setAllModes(modes);
      } catch (error) {
        console.error("Erreur lors du chargement des filtres :", error);
      } finally {
        setLoading(false);
      }
    };

    loadFilters();
  }, []);

  return {
    allStatuts,
    allModes,
    loading,
  };
}
