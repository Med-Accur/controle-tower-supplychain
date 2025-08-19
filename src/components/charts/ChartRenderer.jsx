// Importation des hooks, composants UI et configuration des graphiques
import { useEffect } from "react";
import { useCharts } from "../../hooks/cmd client/useCharts";
import { X, ListFilter } from "lucide-react";
import Button from "../ui/Button";
import chartConfigs from "../../config/chartConfigs";

// Composant qui affiche dynamiquement un graphique en fonction du KPI, type et filtres
const ChartRenderer = ({ rpc_name, type, kpi, filters, onRemove, onFilterClick }) => {
  // On récupère les données et fonctions liées aux graphiques via un hook personnalisé
  const { chartData, fetchChartData, loading } = useCharts();

  // On extrait les données spécifiques au KPI demandé
  const data = chartData?.[kpi] || [];

  // On récupère la configuration du graphique à partir du nom de la fonction RPC
  const config = chartConfigs?.[rpc_name?.trim()];

  // En fonction du type demandé (bar, donut...), on choisit le bon composant React à afficher
  const chartComponent = config?.typeMap?.[type];

  // À chaque changement de filtre, de type ou de KPI, on recharge les données via Supabase
  useEffect(() => {
    fetchChartData(rpc_name, kpi, filters);
  }, [filters, rpc_name, kpi]);

  // Props à transmettre au composant graphique (données + titre)
  const chartProps = {
    data,
    title: config?.title || kpi,
  };

  return (
    <div className="bg-white shadow rounded-xl p-4">
      {/* En-tête avec bouton filtres et bouton suppression */}
      <div className="flex justify-between items-start mb-2">
        <Button onClick={onFilterClick}>
          <ListFilter className="w-5 h-5" />
        </Button>
        {onRemove && (
          <Button onClick={onRemove} className="hover:text-red-700 text-xl leading-none" title="Supprimer">
            <X className="w-5 h-5" />
          </Button>
        )}
      </div>

      {/* Affichage du graphique ou messages associés */}
      {loading && <p className="text-sm text-gray-500">Chargement du graphique...</p>}
      {!loading && chartComponent && chartComponent(chartProps)}
      {!loading && !chartComponent && (
        <p className="text-center text-sm text-red-500 mt-4">
          Type de graphique non supporté pour ce KPI.
        </p>
      )}
    </div>
  );
};

export default ChartRenderer;
