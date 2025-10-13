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
  const [selectedKpis, setSelectedKpis] = useState({
      chart: chart ,
    });
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

  const kpicmd = kpi.filter(k => k.module === "stock")
  return (
    <div className="px-10 py-6">
      <h1 className="text-2xl font-bold mb-4">Stock</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCards cards={kpicmd} kpi={defaultKpis} />
      </div>
      <ChartLayout isCollapsed={isCollapsed} onSelectionChange={setSelectedKpis} />
      <Button
        className="bg-blue-500 text-white px-3 py-1 rounded"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        Ajouter Widget
      </Button>
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480 }}
        cols={{ lg: 4, md: 2, sm: 1, xs: 1 }}
        rowHeight={160}
        margin={[20, 10]} 
        isResizable={false}
        isDraggable={true}
        measureBeforeMount={false}
        useCSSTransforms={true}
        compactType="vertical"
        draggableCancel=".no-drag"
      >
        {selectedKpis && selectedKpis.chart.map((item) => (
          <div key={`chart-${item.key}`}>
            <ChartWidget tableInfo={[item]} />
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  );
}
