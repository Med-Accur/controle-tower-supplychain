import { useEffect, useState } from "react";
import { useCharts } from "../../hooks/cmd client/useCharts";
import ChartFiltersModal from "./ChartFiltersModal";
import Button from "../ui/Button";
import chartConfigs from "../../config/chartConfigs";
import { X } from "lucide-react";
import { ListFilterPlus } from 'lucide-react';

const ChartRenderer = ({ rpc_name, type, kpi, onRemove }) => {
  const [filters, setFilters] = useState({});
  const [lastParams, setLastParams] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { chartData, fetchChartData, loading } = useCharts();
  const data = chartData?.[kpi] || [];
  const cleanRpcName = rpc_name?.trim(); 
  const config = chartConfigs?.[rpc_name?.trim()];
 const chartComponent = config?.typeMap?.[type];

  const chartProps = {
    data,
    title: config?.title || kpi,
  };

  
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

  useEffect(() => {
  const newParams = buildParams(filters);

  const shouldFetch = JSON.stringify(newParams) !== JSON.stringify(lastParams) || !data || data.length === 0;

  if (shouldFetch) {
    fetchChartData(cleanRpcName, kpi, newParams);
    setLastParams(newParams);
  }
}, [filters, kpi, cleanRpcName]);

if (!data || data.length === 0) {
  return <div className="p-4">Pas de données disponibles.</div>;
}


  return (
    <div className="bg-white shadow rounded-xl p-4">
      <div className="flex m-2 justify-end items-center  mt-3">
      <div className="flex space-x-2">
        <Button onClick={() => setIsDrawerOpen(true)} className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800" >
          
            <ListFilterPlus className="w-5 h-5" />Filtre
        
        </Button>
        {onRemove && ( 
          <Button
            onClick={onRemove}
            className=" hover:text-[#A79882] text-xl leading-none"
            title="Supprimer le graphique"
          >
            <X className="w-5 h-5"/>
         
          </Button>
        )}
      </div>
      </div>
 
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
