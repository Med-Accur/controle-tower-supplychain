import { useState } from "react";
import AddChartModal from "../../components/charts/AddChartModal";
import ChartRenderer from "../../components/charts/ChartRenderer";

export default function Dashboard() {
  const [charts, setCharts] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleAddChart = (chartConfig) => {
    setCharts((prev) => [...prev, chartConfig]);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 px-4">Bienvenue sur le Dashboard</h1>

      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-6 ml-4"
      >
        + Ajouter
      </button>

      {showModal && (
        <AddChartModal
          onClose={() => setShowModal(false)}
          onAddChart={handleAddChart}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
        {charts.map((chart, i) => (
          <ChartRenderer key={i} {...chart} />
        ))}
      </div>
    </div>
  );
}
