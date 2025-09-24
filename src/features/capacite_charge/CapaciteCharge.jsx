import React from "react";
import KpiCards from "../../widgets/KpiCards";
import { useAuth } from "../../context/AuthContext";
import "react-grid-layout/css/styles.css";

const defaultKpis = ["kpi_cout_horaire_unite", "kpi_ecart_charge", "kpi_efficacite", "kpi_productivite"];

export default function CapaciteCharge() {
  const { meData } = useAuth();
  const { chart, kpi } = meData || {};

  const kpicmd = kpi.filter(k => k.module === "capacite_charge")

  return (
    <div className="px-10 py-6">
      <h1 className="text-2xl font-bold mb-4">Capacité de Charge</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCards cards={kpicmd} kpi={defaultKpis} />
      </div>

    </div>
  );
}