import { useState } from "react";
import ChartWidget from "../../widgets/dashboard/ChartWidget";
import ChartLayout from "../../components/layout/ChartLayout";
import Button from "../../components/ui/Button";
import KpiCards from "../../widgets/KpiCards";
import { useAuth } from "../../context/AuthContext";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import { useDashboard } from "../../hooks/dashboard/useDashboard";

const ResponsiveGridLayout = WidthProvider(Responsive);
const defaultKpis = ["kpi_sup_on_time_rate", "kpi_sup_quality_nonconform_rate", "kpi_sup_return_rate", "kpi_sup_avg_lead_time_days"];
//const defaultKpis = ["kpi_cout_horaire_unite", "kpi_ecart_charge", "kpi_efficacite", "kpi_productivite"];

export default function CapaciteCharge() {
const { meData, refreshMeData  } = useAuth();
  const { saveWidget } = useDashboard();
  const { chart, kpi, widgets } = meData || {};
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const [selectedKpis, setSelectedKpis] = useState({ Graphique: [] });

  
 const isEmpty = Object.values(selectedKpis).every((arr) => arr.length === 0);
 const widget = widgets.filter((k) => k.dashboard === "fournisseur");
 const kpicmd = kpi.filter((k) => k.module === "fournisseur");

 const [layout, setLayout] = useState([]);

 const generateLayout = (cols) => {
  const itemWidth = Math.max(1, Math.floor(cols / 2)); 
  return selectedKpis.Graphique.map((item, index) => {
    const x = (index * itemWidth) % cols; 
    const y = Math.floor((index * itemWidth) / cols); 
    
    return {
      i: `Graphique-${item.key}`,
      x,
      y,
      w: itemWidth,
      h: 2.2, 
    };
  });
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
    
    await saveWidget(payload, "fournisseur");
    await refreshMeData();
  };
 return (
    <div className="px-10 py-6">
      <h1 className="text-2xl font-bold mb-4 px-2.5 text-[#402363]">Stock</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 px-2.5">
          <KpiCards cards={kpicmd} kpi={defaultKpis} />
        </div>
        <ChartLayout
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          onSelectionChange={setSelectedKpis}
          chartModule="fournisseur"
          initialSelectedWidgets={widget}
        />
        
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
        {isEmpty &&
          <div className="px-2.5">
          <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-2xl border border-dashed border-gray-300 text-gray-500">
            <p className="text-lg mb-2">Aucun graphique sélectionné</p>
            <p className="text-sm">Cliquez sur le bouton pour ajouter des graphiques</p>
            <div className="mt-4">
              <Button
                className="bg-[#bfa76f] text-white p-2 rounded mb-6"
                onClick={() => setIsCollapsed(!isCollapsed)}
              >
                Ajouter un graphique
              </Button>
            </div>
          </div>
          </div>
}
  <ResponsiveGridLayout
    className="layout"
    layouts={layouts}
    breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480 }}
    cols={{ lg: 4, md: 2, sm: 1, xs: 1 }}
    

    isResizable={false}
        isDraggable={true}
        onLayoutChange={handleLayoutChange}
        draggableCancel=".no-drag"
  >
    {selectedKpis.Graphique.map((item) => (
      <div key={`Graphique-${item.key}`} className="bg-white shadow rounded">
        <div className="drag-handle p-2 cursor-move bg-gray-100 font-bold" />
        <div className="no-drag ">
          <ChartWidget tableInfo={[item]} module="cmd_client"/>
        </div>
      </div>
    ))}
  </ResponsiveGridLayout>

    </div>
  );
}

