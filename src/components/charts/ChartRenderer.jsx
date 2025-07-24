import { useEffect, useState } from "react";
import { useCharts } from "../../hooks/cmd client/useCharts";
import ChartFiltersModal from "./ChartFiltersModal";
import Button from "../ui/Button";
import chartConfigs from "../../config/chartConfigs";
import { X } from "lucide-react";
import { ListFilter, Plus } from 'lucide-react';

const ChartRenderer = ({ rpc_name, type, kpi, onRemove }) => {
  const [filters, setFilters] = useState({});
  const [lastParams, setLastParams] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { chartData, fetchChartData, loading } = useCharts();
  const data = chartData?.[kpi] || [];

  // 🔍 Récupération de la config depuis chartConfigs
  const cleanRpcName = rpc_name?.trim(); 
  const config = chartConfigs?.[rpc_name?.trim()];
 const chartComponent = config?.typeMap?.[type];

if (!chartComponent) {
  console.warn(`❌ Le type "${type}" n'est pas défini pour le KPI "${cleanRpcName}"`);
}

console.log("rpc_name reçu :", `"${rpc_name}"`, "après trim:", `"${rpc_name?.trim()}"`);

  // ✅ Ne pas inclure xKey/yKey ici, ils sont déjà dans le composant du config
  const chartProps = {
    data,
    title: config?.title || kpi,
  };

  // 🧠 Construction des paramètres dynamiques pour le backend
  const buildParams = (filters) => {
    const params = {};
    if (filters.start_date) params.start_date = filters.start_date;
    if (filters.end_date) params.end_date = filters.end_date;
    if (filters.mode_livraison?.length) params.mode_livraison = filters.mode_livraison;
    if (rpc_name === "get_nb_commandes" && filters.statut?.length) {
      params.statut = filters.statut;
    }
    return params;
  };
console.log("Clés disponibles dans chartConfigs :", Object.keys(chartConfigs));

  useEffect(() => {
  const newParams = buildParams(filters);

  // Force fetch si data est vide au démarrage
  const shouldFetch = JSON.stringify(newParams) !== JSON.stringify(lastParams) || !data || data.length === 0;

  if (shouldFetch) {
    fetchChartData(cleanRpcName, kpi, newParams);
    setLastParams(newParams);
  }
}, [filters, kpi, cleanRpcName]); // 👈 important d'ajouter les deps correctes

console.log("Component pour", cleanRpcName, "->", chartComponent);
console.log("Données reçues :", data);
if (!data || data.length === 0) {
  return <div className="p-4">Pas de données disponibles.</div>;
}
console.log("Types disponibles pour", cleanRpcName, ":", config?.typeMap && Object.keys(config.typeMap));
console.log("Type demandé :", type);

  return (
    <div className="bg-white shadow rounded-xl p-4">
      {/* Titre + Boutons */}
      <div className="flex justify-between items-start mb-2">
        <Button onClick={() => setIsDrawerOpen(true)} >
          
          <div className="relative inline-block">
  <ListFilter className="w-6 h-6" />
  <Plus className="w-3 h-3 text-green-500 absolute -top-1 -right-1 bg-white rounded-full" />
          </div> 
         
        </Button>
        {onRemove && (
          <Button
            onClick={onRemove}
            className=" hover:text-red-700 text-xl leading-none"
            title="Supprimer le graphique"
          >
            <X className="w-5 h-5"/>
         
          </Button>
        )}
      </div>

      {/* Affichage des états */}
      {loading && <p className="text-sm text-gray-500">Chargement du graphique...</p>}

      {!loading && chartComponent && data.length > 0 && chartComponent(chartProps)}

      {!loading && data.length === 0 && (
        <p className="text-center text-sm text-gray-500 mt-4">Pas de données disponibles.</p>
      )}

      {!loading && !chartComponent && (
        <p className="text-center text-sm text-red-500 mt-4">
          Type de graphique non supporté pour ce KPI.
        </p>
      )}

      {/* Drawer de filtres */}
      <ChartFiltersModal
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onApply={(newFilters) => setFilters(newFilters)}
        rpc_name={rpc_name}
        initialFilters={filters}
      />
    </div>
  );
};

export default ChartRenderer;
