import React from "react";
import { useState } from "react";
import KpiCards from "../../widgets/KpiCards";
import { useAuth } from "../../context/AuthContext";
import "react-grid-layout/css/styles.css";

const defaultKpis = ["kpi_sup_on_time_rate", "kpi_sup_quality_nonconform_rate", "kpi_sup_return_rate", "kpi_sup_avg_lead_time_days"];

export default function Fournisseurs() {
  const { meData } = useAuth();
  const { chart, kpi } = meData || {};
 
  
  const kpicmd = kpi.filter(k => k.module === "fournisseur")

  return (
    <div className="px-10 py-6">
      <h1 className="text-2xl font-bold mb-4">Fournisseurs</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCards cards={kpicmd} kpi={defaultKpis} />
      </div>
    


    </div>
  );
}
