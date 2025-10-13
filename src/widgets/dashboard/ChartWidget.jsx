import { useState, useEffect } from "react";
import ChartCard from "../../componentstest/ChartCard";
import { useDashboard } from "../../hooks/dashboard/useDashboard";

export default function ChartWidget({ tableInfo = [] }) {
  const { table, fetchDataWidget } = useDashboard();
  const [rpcName, setRpcName] = useState(null);

  useEffect(() => {
    const name = tableInfo[0]?.rpc_name;
    setRpcName(name);
    if (name) {
      fetchDataWidget(name);
    }
  }, []);

  if (!rpcName) return null;

  const name = tableInfo[0]?.nom;
  const chartData = table?.[rpcName] || [];
  const availableCharts = tableInfo[0]?.type_chart || [];
  const axe = tableInfo[0]?.axe || [];
  const defaultChart = availableCharts[0];
  const filter = tableInfo[0]?.filtre || [];

  const handleFilterApply = (filters) => {
    console.log("Applying filters:", filters);
    fetchDataWidget(rpcName, filters); 
  };

  return (
    <ChartCard
      name={name}
      type={availableCharts}
      chartType={defaultChart}
      data={chartData}
      axe={axe}
      filter={filter}
      onFilterApply={handleFilterApply}
    />
  );
}

