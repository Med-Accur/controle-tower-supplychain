
import React from "react";
import KpiCards from "../../widgets/KpiCards";
import { useAuth } from "../../context/AuthContext";
import "react-grid-layout/css/styles.css";

const defaultKpis = ["kpi_wip", "kpi_uph", "kpi_temps_cycle", "kpi_taux_conformite"];

export default function Production() {
  const { meData } = useAuth();
  const { chart, kpi } = meData || {};

  const kpicmd = kpi.filter(k => k.module === "production")

  return (
    <div className="px-10 py-6">
      <h1 className="text-2xl font-bold mb-4">Production</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCards cards={kpicmd} kpi={defaultKpis} />
      </div>

    </div>
  );
}

