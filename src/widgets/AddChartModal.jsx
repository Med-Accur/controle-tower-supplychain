import { useState, useEffect } from "react";
import Select from "../components/ui/Select";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";

export default function AddChartModal({
  isOpen,
  onClose,
  chartsMeta,
  onGenerate,
  filters,
}) {

  const [selectedKpi, setSelectedKpi] = useState("");
  const [selectedChartType, setSelectedChartType] = useState("");

  useEffect(() => {
    console.log(" chartsMeta reçu dans AddChartModal :", chartsMeta);
  }, [chartsMeta]);

  const handleGenerate = () => {
  const selectedMeta = chartsMeta.find((c) => c.nom_kpi === selectedKpi);
  if (!selectedMeta) return;



    onGenerate({
      kpi: selectedKpi,
      chartType: selectedChartType,
      rpc_name: selectedMeta.rpc_name,
    });
    onClose();
  }
useEffect(() => {
  const selectedMeta = chartsMeta.find((kpi) => kpi.nom_kpi === selectedKpi);
  if (selectedMeta) {
    // Reset le type de chart à un type valide (le 1er de la liste par exemple)
    setSelectedChartType(selectedMeta.type_chart[0]);
  } else {
    setSelectedChartType(""); // Par sécurité
  }
}, [selectedKpi]);


  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Ajouter un graphique">
      <div className="flex flex-col gap-y-5">
        <Select
          label="Choisissez KPI"
          value={selectedKpi}
          onChange={(e) => setSelectedKpi(e.target.value)}
          options={chartsMeta.map((kpi) => ({
            label: kpi.nom_kpi,
            value: kpi.nom_kpi,
          }))}
          required
          placeholder="Choisir KPI"
        />

        <Select
          label="Choisissez Chart"
          value={selectedChartType}
          onChange={(e) => setSelectedChartType(e.target.value)}
          options={
            chartsMeta
              .find((kpi) => kpi.nom_kpi === selectedKpi)
              ?.type_chart.map((type) => ({
                label: type,
                value: type,
              })) || []
          }
          required
          placeholder="Choisir Chart"
        />

        <Button
          className="bg-blue-500 text-white px-3 py-1 rounded"
          onClick={handleGenerate}
        >
          Générer
        </Button>
      </div>
    </Modal>
  );
}
