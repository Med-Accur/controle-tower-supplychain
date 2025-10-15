import React from "react";
import { useState } from "react";
import ChartWidget from "../../widgets/dashboard/ChartWidget";
import ChartLayout from "../../components/layout/ChartLayout";
import  Button  from "../../components/ui/Button";
import KpiCards from "../../widgets/KpiCards";
import { useAuth } from "../../context/AuthContext";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

const defaultKpis = ["kpi_days_on_hand", "kpi_inventory_to_sales", "kpi_rentabilite_stock", "kpi_taux_rotation"];

export default function Stock() {
  const { meData } = useAuth();
  const { chart, kpi } = meData || {};
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedKpis, setSelectedKpis] = useState({ chart: chart});
  const chartsto = chart.filter(k => k.module === "stock")
  const kpisto = kpi.filter(k => k.module === "stock")


  const generateLayout = (cols) => {
    return [
      ...selectedKpis.chart.map((item, index) => ({
        i: `chart-${item.key}`,
        x: index,
        y: Math.floor(index / cols) + selectedKpis.chart.length,
        w: Math.min(2, cols),
        h: 3.1,
      })),
    ];
  };
  
   const layouts = {
    lg: generateLayout(4),
    md: generateLayout(3),
    sm: generateLayout(1),
    xs: generateLayout(1),
  };

  return (
    <div className="px-10 py-6">
      <h1 className="text-2xl font-bold mb-4">Commande client</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <KpiCards cards={kpisto} kpi={defaultKpis} />
        </div>
        <ChartLayout
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          onSelectionChange={setSelectedKpis}
          chartModule={chartsto}
        />
        <Button
          className="bg-[#bfa76f] text-white p-2 rounded mb-6"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          Ajouter Widget
        </Button>
         {selectedKpis.chart.length === 0 ? (
           <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-2xl border border-dashed border-gray-300 text-gray-500">
             <p className="text-lg mb-2">Aucun graphique sélectionné</p>
             <p className="text-sm">Cliquez sur le bouton pour ajouter des charts</p>
           </div>
         ) : (
           <ResponsiveGridLayout
             className="layout"
             layouts={layouts}
             breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480 }}
             cols={{ lg: 4, md: 2, sm: 1, xs: 1 }}
             isResizable={false}
             isDraggable={true}
             compactType="vertical"
             draggableHandle=".drag-handle"
           >
             {selectedKpis.chart.map((item) => (
               <div
                 key={`chart-${item.key}`}
                 className="bg-white rounded shadow rounded-2xl border border-[#D6D6D6]"
               >
                 <div className="drag-handle p-2 cursor-move bg-[#f0ede5] rounded-t-2xl" />
                 <div className="no-drag">
                   <ChartWidget tableInfo={[item]} />
                 </div>
               </div>
             ))}
           </ResponsiveGridLayout>
         )}
    </div>
  );
}
