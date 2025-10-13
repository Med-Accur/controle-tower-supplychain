import { useState } from "react";
import ChartWidget from "../../widgets/dashboard/ChartWidget";
import ChartLayout from "../../components/layout/ChartLayout";
import Button from "../../components/ui/Button";
import KpiCards from "../../widgets/KpiCards";
import { useAuth } from "../../context/AuthContext";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);
const defaultKpis = [
  "kpi_nb_commandes",
  "kpi_otif",
  "kpi_taux_retards",
  "kpi_duree_cycle_moyenne_jours",
];

export default function CommandeClient() {
  const { meData } = useAuth();
  const { chart, kpi } = meData || {};
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedKpis, setSelectedKpis] = useState({ chart: [] });

  // Générer un layout flexible
 const generateLayout = (cols) => {
  const itemWidth = Math.max(1, Math.floor(cols / 2)); // largeur par défaut
  return selectedKpis.chart.map((item, index) => {
    const x = (index * itemWidth) % cols;  // placement horizontal respectant w
    const y = Math.floor((index * itemWidth) / cols); // placement vertical

    return {
      i: `chart-${item.key}`,
      x,
      y,
      w: itemWidth,
      h: 2.2, // hauteur fixe
    };
  });
};


  // Layouts responsives
  const layouts = {
    lg: generateLayout(4), // Desktop : 4 colonnes
    md: generateLayout(2), // Tablette : 2 colonnes
    sm: generateLayout(1), // Mobile : 1 colonne
    xs: generateLayout(1),
  };

  const kpicmd = kpi.filter((k) => k.module === "cmd_client");

  return (
    <div className="px-10 py-6">
      <h1 className="text-2xl font-bold mb-4">Commande client</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <KpiCards cards={kpicmd} kpi={defaultKpis} />
      </div>

      {/* Sélecteur de charts */}
      <ChartLayout
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        onSelectionChange={setSelectedKpis}
      />

      {/* Bouton Ajouter Widget */}
      <Button
        className="bg-[#bfa76f] text-white p-2 rounded mb-6"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        Ajouter Widget
      </Button>


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
  {selectedKpis &&
    selectedKpis.chart.map((item) => (
      <div key={`chart-${item.key}`} className="bg-white rounded shadow rounded-2xl border border-[#D6D6D6]">
        {/* Header = zone de drag */}
        <div className="drag-handle p-2 cursor-move bg-[#f0ede5] rounded-t-2xl"/>
        
        {/* Contenu = non draggable */}
        <div className="no-drag">
          <ChartWidget tableInfo={[item]} />
        </div>
      </div>
    ))}
</ResponsiveGridLayout>
      </div>
  );
}
