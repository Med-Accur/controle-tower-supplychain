import { useEffect, useState } from "react";
import { useCommandes } from "../../hooks/cmd client/useCommandes";
import { useCharts } from "../../hooks/cmd client/useCharts";
import Button from "../../components/ui/Button";
import KpiCards from "../../widgets/KpiCards";
import ChartRenderer from "../../components/charts/ChartRenderer";
import AddChartModal from "../../widgets/AddChartModal";
import ChartFiltersDrawer from "../../components/charts/ChartFiltersDrawer";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);
const defaultKpis = ["nb_commandes", "otif", "taux_retards", "duree_cycle_moyenne_jours"];

export default function CommandeClient() {
  const { kpis, fetchCmdKpis, fetchKpis, loading } = useCommandes();
  const { chartsMeta, fetchChartsMeta, fetchChartData } = useCharts();

  const [open, setOpen] = useState(false);
  const [generatedCharts, setGeneratedCharts] = useState([]);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [selectedChartForFilters, setSelectedChartForFilters] = useState(null); // { chartIndex, chartMeta }

  useEffect(() => {
    fetchKpis(["cmd_client"]);
    fetchChartsMeta("cmd_client");
  }, []);

  const handleGenerate = ({ kpi, chartType, rpc_name }) => {
    const chartFilters = {};
    const chartMeta = chartsMeta.find((m) => m.rpc_name === rpc_name);
    try {
      const schema = typeof chartMeta.filtre === "string"
        ? JSON.parse(chartMeta.filtre)
        : chartMeta.filtre || [];

      schema.forEach(f => {
        chartFilters[f.label] = f.type === "select" ? [] : "";
      });
    } catch (err) {
      console.error("Erreur parsing filtres initiaux :", err);
    }

    fetchChartData(rpc_name, kpi, chartFilters);
    setGeneratedCharts(prev => [
      ...prev,
      { type: chartType, kpi, rpc_name, filters: chartFilters }
    ]);
  };

  const handleOpenDrawer = (meta, index) => {
    setSelectedChartForFilters({ chartMeta: meta, chartIndex: index });
    setDrawerOpen(true);
  };

  const handleApplyFilters = (newFilters) => {
    if (!selectedChartForFilters) return;

    const index = selectedChartForFilters.chartIndex;
    const updatedCharts = [...generatedCharts];

    updatedCharts[index].filters = newFilters;

    setGeneratedCharts(updatedCharts);
    fetchChartData(
      updatedCharts[index].rpc_name,
      updatedCharts[index].kpi,
      newFilters
    );

   
  };

  const generateLayout = (cols) =>
    generatedCharts.map((_, index) => ({
      i: `chart-${index}`,
      x: index % cols,
      y: Math.floor(index / cols),
      w: 1,
      h: 2,
    }));

  const layouts = {
    lg: generateLayout(2),
    md: generateLayout(2),
    sm: generateLayout(1),
    xs: generateLayout(1),
  };

  if (loading) return <div className="p-6">Chargement...</div>;

  return (
    <div className="px-10 py-6">
      <h1 className="text-2xl font-bold mb-4">Bienvenue sur le CommandeClient</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCards cards={kpis} fetchCmdKpis={fetchCmdKpis} kpi={defaultKpis} />
      </div>

      <div className="flex justify-end mt-10 mb-6">
        <Button
          className="bg-blue-500 text-white px-3 py-1 rounded"
          onClick={() => setOpen(true)}
        >
          Ajouter un Graphe
        </Button>
      </div>

      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 120, md: 99, sm: 76, xs: 48 }}
        cols={{ lg: 2, md: 2, sm: 1, xs: 1 }}
        rowHeight={260}
        margin={[20, 10]}
        isResizable={false}
        isDraggable={true}
      >
        {generatedCharts.map((chart, index) => {
          const chartMeta = chartsMeta.find((m) => m.rpc_name === chart.rpc_name);
          return (
            <div key={`chart-${index}`}>
              <ChartRenderer
                rpc_name={chart.rpc_name}
                type={chart.type}
                kpi={chart.kpi}
                filters={chart.filters}
                onRemove={() =>
                  setGeneratedCharts((prev) => prev.filter((_, i) => i !== index))
                }
                chartMeta={chartMeta}
                onFilterClick={() => handleOpenDrawer(chartMeta, index)}
              />
            </div>
          );
        })}
      </ResponsiveGridLayout>

      <AddChartModal
        isOpen={open}
        onClose={() => setOpen(false)}
        chartsMeta={chartsMeta}
        onGenerate={handleGenerate}
      />

      <ChartFiltersDrawer
        isOpen={isDrawerOpen}
        onClose={() => setDrawerOpen(false)}
        onApply={handleApplyFilters}
        initialFilters={selectedChartForFilters?.chartIndex != null
          ? generatedCharts[selectedChartForFilters.chartIndex]?.filters || {}
          : {}
        }
        filterSchema={selectedChartForFilters?.chartMeta?.filtre || []}
      />
    </div>
  );
}
