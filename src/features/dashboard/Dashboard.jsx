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
 
  const widget = widgets.filter((k) => k.dashboard === "dashboard");
  const [selectedKpis, setSelectedKpis] = useState({
    Carte: [],
    Tableau: [],
    Graphique: [],
    Plan: [],
  });

  const [layout, setLayout] = useState([]);
  const isEmpty = Object.values(selectedKpis).every((arr) => arr.length === 0);

  // Générer le layout initial en utilisant les positions déjà sauvegardées dans meData.widgets
  const generateLayout = (cols) => {
    let layouts = [];
    let x = 0;
    let y = 0;

    const allWidgets = [
      ...selectedKpis.Graphique.map((item) => ({ ...item, type: "Graphique", w: 2, h: 2.5 })),
      ...selectedKpis.Carte.map((item) => ({ ...item, type: "Carte", w: 1, h: 1.25 })),
      ...selectedKpis.Tableau.map((item) => ({ ...item, type: "Tableau", w:2 , h: 2.5 })),
      ...selectedKpis.Plan.map((item) => ({ ...item, type: "Plan", w: 2, h: 2.5 })),
    ];

    allWidgets.forEach((item) => {
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
    await saveWidget(payload, "dashboard");
  };

  return (
    <div className="px-10 py-6">
      <h1 className="text-2xl font-bold mb-4 px-2.5 text-[#402363]">Accueil</h1>

      <div className={`flex gap-2 mb-4 px-2.5 ${isCollapsed ? "mr-64" : "mr-0"}`}>
       
       <Button
          className="bg-[#402363] text-white  p-2 rounded mb-6"
          onClick={handleSave}
        >
          Sauvegarder
        </Button>
        {isEmpty ? null :
          <div className={`flex gap-2`}>
         
        <Button
          className="bg-[#bfa76f] text-white  p-2 rounded mb-6"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          Ajouter un widget
        </Button>
        </div>}
      </div>
          
      <DashboardLayout
        setIsCollapsed={setIsCollapsed}
        isCollapsed={isCollapsed}
        onSelectionChange={setSelectedKpis}
        initialSelectedWidgets={widget}
      />
      {isEmpty &&   
        <div className="px-2.5">
          <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-2xl border border-dashed border-gray-300 text-gray-500">
            <p className="text-lg mb-2">Aucun widget sélectionné</p>
            <p className="text-sm">Cliquez sur le bouton pour Ajouter widget</p>
            <div className="mt-4">
            <Button
          className="bg-[#bfa76f] text-white  p-2 rounded mb-6"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          Ajouter un widget
        </Button>
        </div>
          </div>
        </div>
      }
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1000, md: 996, sm: 768, xs: 480 }}
        cols={{ lg: 4, md: 2, sm: 1, xs: 1 }}
        
        isResizable={false}
        isDraggable={true}
        onLayoutChange={handleLayoutChange}
        draggableCancel=".no-drag"
      >
        {selectedKpis.Carte.map((item) => (
          <div key={`Carte-${item.key}`} className="bg-white shadow rounded">
            <div className="drag-handle p-2 cursor-move bg-gray-100 font-bold">{item.nom}</div>
            <div className="no-drag p-4">
              <CardWidget kpi={[item]} module="dashboard"/>
            </div>
          </div>
        ))}
        {selectedKpis.Graphique.map((item) => (
          <div key={`Graphique-${item.key}`} className="bg-white shadow rounded">
            <div className="drag-handle p-2 cursor-move bg-gray-100 font-bold">{item.nom}</div>
            <div className="no-drag">
              <ChartWidget tableInfo={[item]} module="dashboard"/>
            </div>
          </div>
        ))}
        {selectedKpis.Tableau.map((item) => (
          <div key={`table-${item.key}`} className="bg-white shadow rounded">
            <div className="drag-handle p-2 cursor-move bg-gray-100 font-bold">{item.nom}</div>
            <div className="no-drag p-4">
              <TableWidget tableInfo={[item]} />
            </div>
          </div>
        ))}
        {selectedKpis.Plan.map((item) => (
          <div key={`Plan-${item.key}`} className="bg-white shadow rounded">
            <div className="drag-handle p-2 cursor-move bg-gray-100 font-bold">{item.nom}</div>
            <div className="no-drag p-4">
              <MapWidget mapInfo={[item]} />
            </div>
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  );
}
