import { useEffect } from "react";
import { useStock } from "../../hooks/stock/useStock";
import KpiCards from "../../widgets/KpiCards";
const defaultKpis = [
  "stock_disponible",
  "days_on_hand",
  "taux_rotation",
  "inventory_to_sales",
];
export default function Stock() {
  const { kpis, loading, fetchKpis } = useStock();
  useEffect(() => {
    // charge les KPI du module 'stock'
    fetchKpis(["stock"]);
  }, []);
  if (loading) return <div className="p-6">Chargement...</div>;
  return (
    <div className="px-10 py-6">
      <h1 className="text-2xl font-bold mb-4">Stock </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* KpiCards utilise la même API que dans CommandeClient */}
        <KpiCards
          cards={kpis}
          rpc="get_kpi_stock"         // métadonnées depuis TABLE_KPI
          kpi={defaultKpis}            // si ton KpiCards lit les valeurs via props
        />
      </div>
    </div>
  );
}