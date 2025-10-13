import { useState, useEffect } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Button from "../../components/ui/Button";
import CardWidget from "../../widgets/dashboard/CardWidget";
import { useDashboard } from "../../hooks/dashboard/useDashboard";
import MapWidget from "../../widgets/dashboard/MapWidget";
import TableWidget from "../../widgets/dashboard/TableWidget";
import ChartWidget from "../../widgets/dashboard/ChartWidget";
import { Responsive, WidthProvider } from "react-grid-layout";
import { useAuth } from "../../context/AuthContext";
import "react-grid-layout/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function Dashboard() {
  const { saveWidget } = useDashboard();
  const { meData } = useAuth();
  const { widgets } = meData || {};
  const [isCollapsed, setIsCollapsed] = useState(false);

  const [selectedKpis, setSelectedKpis] = useState({
    card: [],
    table: [],
    chart: [],
    map: [],
  });

  const [layout, setLayout] = useState([]);

  // Générer le layout initial en utilisant les positions déjà sauvegardées dans meData.widgets
  const generateLayout = (cols) => {
    let layouts = [];
    let x = 0;
    let y = 0;

    const allWidgets = [
      ...selectedKpis.chart.map((item) => ({ ...item, type: "chart", w: 2, h: 3 })),
      ...selectedKpis.card.map((item) => ({ ...item, type: "card", w: 1, h: 1.5 })),
      ...selectedKpis.table.map((item) => ({ ...item, type: "table", w: 2, h: 3 })),
      ...selectedKpis.map.map((item) => ({ ...item, type: "map", w: 2, h: 3 })),
    ];

    allWidgets.forEach((item) => {
      // Si on a déjà des positions (depuis la DB), on les garde
      const widgetFromDB = widgets?.find(
        (w) => w.widget_key === item.key && w.widget_type === item.type
      );

      layouts.push({
        i: `${item.type}-${item.key}`,
        x: widgetFromDB ? widgetFromDB.x : x,
        y: widgetFromDB ? widgetFromDB.y : y,
        w: widgetFromDB ? widgetFromDB.w : item.w,
        h: widgetFromDB ? widgetFromDB.h : item.h,
      });

      if (!widgetFromDB) {
        x += item.w;
        if (x >= cols) {
          x = 0;
          y += 1;
        }
      }
    });

    return layouts;
  };

  const layouts = {
    lg: generateLayout(4),
    md: generateLayout(2),
    sm: generateLayout(1),
    xs: generateLayout(1),
  };

  const handleLayoutChange = (currentLayout) => {
    setLayout(currentLayout);
  };

  const handleSave = async () => {
    const payload = layout.map((item) => {
      const [type, key] = item.i.split("-");
      return { key, type, x: item.x, y: item.y, w: item.w, h: item.h };
    });
    console.log("Payload to save:", payload);
    saveWidget(payload);
    console.log("Payload à sauvegarder :", payload);
  };

  return (
    <div className="px-10 py-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <div className={`flex gap-2 mb-4 ${isCollapsed ? "mr-64" : "mr-0"}`}>
        <Button
          className="bg-blue-500 text-white px-3 py-1 rounded"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          Ajouter Widget
        </Button>

        <Button
          className="bg-green-500 text-white px-3 py-1 rounded"
          onClick={handleSave}
        >
          Save Dashboard
        </Button>
      </div>

      <DashboardLayout
        isCollapsed={isCollapsed}
        onSelectionChange={setSelectedKpis}
        initialSelectedWidgets={widgets} // <-- Passe les widgets déjà choisis
      />

      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480 }}
        cols={{ lg: 4, md: 2, sm: 1, xs: 1 }}
        rowHeight={160}
        margin={[20, 10]}
        isResizable={false}
        isDraggable={true}
        onLayoutChange={handleLayoutChange}
        draggableCancel=".no-drag"
      >
        {selectedKpis.card.map((item) => (
          <div key={`card-${item.key}`} className="bg-white shadow rounded">
            <div className="drag-handle p-2 cursor-move bg-gray-100 font-bold">{item.key}</div>
            <div className="no-drag p-4">
              <CardWidget kpi={[item]} />
            </div>
          </div>
        ))}
        {selectedKpis.chart.map((item) => (
          <div key={`chart-${item.key}`} className="bg-white shadow rounded">
            <div className="drag-handle p-2 cursor-move bg-gray-100 font-bold">{item.key}</div>
            <div className="no-drag p-4">
              <ChartWidget tableInfo={[item]} />
            </div>
          </div>
        ))}
        {selectedKpis.table.map((item) => (
          <div key={`table-${item.key}`} className="bg-white shadow rounded">
            <div className="drag-handle p-2 cursor-move bg-gray-100 font-bold">{item.key}</div>
            <div className="no-drag p-4">
              <TableWidget tableInfo={[item]} />
            </div>
          </div>
        ))}
        {selectedKpis.map.map((item) => (
          <div key={`map-${item.key}`} className="bg-white shadow rounded">
            <div className="drag-handle p-2 cursor-move bg-gray-100 font-bold">{item.key}</div>
            <div className="no-drag p-4">
              <MapWidget mapInfo={[item]} />
            </div>
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  );
}
