import React from "react";
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";

 // Métrique = rouge, reste = vert

export function PieChartComponent({data,dataKey,kpiKey, kpiLabel}) {
  const colors = ["#402363", "#B5A995"];

  
  const totalGlobal = data.reduce((sum, item) => sum + (item[dataKey]), 0);
  const totalKpi = data.reduce((sum, item) => sum + (item[kpiKey]), 0);
  const totalReste = totalGlobal - totalKpi;


  const pieData = [
    { name: kpiLabel[0], value: totalKpi },
    { name: "Autres", value: totalReste }
  ];
  
  if (!data || data.length === 0 || totalGlobal === 0) return <p>Pas de données</p>;
  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={pieData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          label={(entry) =>
            totalGlobal > 0
              ? `${entry.name} : ${(entry.value / totalGlobal * 100).toFixed(1)}%`
              : `${entry.name} : 0%`
          }
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value, name) =>
            totalGlobal > 0
              ? `${value} (${((value / totalGlobal) * 100).toFixed(1)}%)`
              : `${value} (0%)`
          }
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
