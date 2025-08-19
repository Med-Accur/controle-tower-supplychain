import { useState, useEffect } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Button from "../../components/ui/Button";
import CardWidget from "../../widgets/dashboard/CardWidget";
import MapWidget from "../../widgets/dashboard/MapWidget";
import { useDashboard } from "../../hooks/dashboard/useDashboard";
import TableWidget from "../../widgets/dashboard/TableWidget";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import Stock from "../stock/Stock";

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function Dashboard() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { fetchTable } = useDashboard();
  const [selectedKpis, setSelectedKpis] = useState({
    card: [],
    table: [],
    chart: [],
    map: [],
  });

  useEffect(() => {
    fetchTable();
  }, []);

   
  const generateLayout = (cols) => {
    return [
      ...selectedKpis.card.map((item, index) => ({
        i: `card-${item.key}`,
        x: index % cols,
        y: Math.floor(index / cols),
        w: 1,
        h: 1.1,
      })),
      ...selectedKpis.table.map((item, index) => ({
        i: `table-${item.key}`,
        x: index,
        y: Math.floor(index / cols) + selectedKpis.table.length,
        w: Math.min(2, cols),
        h: 3.1,
      })),
      ...selectedKpis.map.map((item, index) => ({
        i: `map-${item.key}`,
        x: index % cols,
        y: Math.floor(index / cols) + selectedKpis.map.length,
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
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className={`right-9 transition-all duration-300 ${isCollapsed ? "mr-64" : "mr-0"}`}>
        <Button
          className="bg-blue-500 text-white px-3 py-1 rounded"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          Ajouter Widget
        </Button>
      </div>

      <DashboardLayout isCollapsed={isCollapsed} onSelectionChange={setSelectedKpis} />

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
        {selectedKpis.card.map((item) => (
          <div key={`card-${item.key}`}>
            <CardWidget kpi={[item]} />
          </div>
        ))}
       
        {selectedKpis.table.map((item) => (
          <div key={`table-${item.key}`}>
            <TableWidget tableInfo={[item]} />
          </div>
        ))}


        {selectedKpis.map.map((item) => (
          <div key={`map-${item.key}`}>
            <MapWidget mapInfo={[item]} />
          </div>
        ))}
      </ResponsiveGridLayout>

    
     
    </div>
  );
}
