import { useState, useEffect } from "react";
import { useCommandes } from "../../hooks/cmd client/useCommandes";
import { useCharts } from "../../hooks/cmd client/useCharts";
import Button from "../../components/ui/Button";
import KpiCards from "../../widgets/KpiCards";
import ChartRenderer from "../../components/charts/ChartRenderer";
import AddChartModal from "../../widgets/AddChartModal";

const defaultKpis = ["nb_commandes", "otif", "taux_retards", "duree_cycle_moyenne_jours"];

export default function CommandeClient() {
  const { kpis, fetchCmdKpis, fetchKpis, loading } = useCommandes();
  const { chartsMeta, fetchChartsMeta, fetchChartData } = useCharts();

  const [filters, setFilters] = useState({ start_date: null, end_date: null, mode_livraison: [], statut: [] });
  const [open, setOpen] = useState(false);
  const [generatedCharts, setGeneratedCharts] = useState([]);

  useEffect(() => {
    fetchKpis(["cmd_client"]);
    fetchChartsMeta("cmd_client");
  }, []);

  const handleGenerate = ({ kpi, chartType, rpc_name }) => {
    fetchChartData(rpc_name, kpi, filters);
    setGeneratedCharts((prev) => [...prev, { type: chartType, kpi, rpc_name }]);
  };

  if (loading) return <div className="p-6">Chargement...</div>;

  return (
    <div className="px-10 py-6">
      <h1 className="text-2xl font-bold mb-4">Bienvenue sur le CommandeClient</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCards cards={kpis} fetchCmdKpis={fetchCmdKpis} kpi={defaultKpis} />
      </div>

      <div className="flex justify-end mt-10 mb-6">
        <Button className="bg-blue-500 text-white px-3 py-1 rounded" onClick={() => setOpen(true)}>
          Ajouter un Graphe
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {generatedCharts.map((chart, index) => (
          <ChartRenderer
            key={index}
            rpc_name={chart.rpc_name}
            type={chart.type}
            kpi={chart.kpi}
            filters={filters}
            setFilters={setFilters}
            onRemove={() =>
              setGeneratedCharts((prev) => prev.filter((_, i) => i !== index))
            }
          />
        ))}
      </div>

      <AddChartModal
        isOpen={open}
        onClose={() => setOpen(false)}
        chartsMeta={chartsMeta}
        onGenerate={handleGenerate}
        filters={filters}
      />
    </div>
  );
}
