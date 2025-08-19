import { useState, useEffect } from "react";
import Modal from "../components/ui/Modal";
import Button from "../components/ui/Button";

export default function AddChartModal({
  isOpen,
  onClose,
  chartsMeta,
  onGenerate,
}) {
  const [selectedKpi, setSelectedKpi] = useState("");
  const [selectedChartType, setSelectedChartType] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setSelectedKpi("");
      setSelectedChartType("");
    }
  }, [isOpen]);

  useEffect(() => {
    const selectedMeta = chartsMeta.find((kpi) => kpi.nom_kpi === selectedKpi);
    if (selectedMeta) {
      setSelectedChartType(selectedMeta.type_chart[0]);
    } else {
      setSelectedChartType("");
    }
  }, [selectedKpi, chartsMeta]);

  const handleGenerate = () => {
    const selectedMeta = chartsMeta.find((c) => c.nom_kpi === selectedKpi);
    if (!selectedMeta) return;

    onGenerate({
      kpi: selectedKpi,
      chartType: selectedChartType,
      rpc_name: selectedMeta.rpc_name,
    });

    onClose();
  };

  // ✅ Composant Select local
  const SelectField = ({ label, value, onChange, options, placeholder }) => (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="block text-xs text-neutral-500 mb-1">
          {label} <span className="text-red-500">*</span>
        </label>
      )}
      <select
        className="w-full text-base text-black bg-white py-2 px-2 rounded border border-stone-300 focus:outline-none"
        value={value}
        onChange={onChange}
        required
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt, index) => (
          <option key={`${opt.value}-${index}`} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
console.log("Options KPI :", chartsMeta.map(kpi => kpi.nom_kpi));

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Ajouter un graphique">
      <div className="flex flex-col gap-y-5">
        <SelectField
          label="Choisissez le KPI"
          value={selectedKpi}
          onChange={(e) => setSelectedKpi(e.target.value)}
          options={chartsMeta.map((kpi) => ({
            label: kpi.nom_kpi,
            value: kpi.nom_kpi,
          }))}
          placeholder="Choisir KPI"
        />

        <SelectField
          label="Choisissez le type de graphique"
          value={selectedChartType}
          onChange={(e) => setSelectedChartType(e.target.value)}
          options={
            chartsMeta
              .find((kpi) => kpi.nom_kpi === selectedKpi)
              ?.type_chart.map((type, idx) => ({
                label: type,
                value: type,
              })) || []
          }
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
