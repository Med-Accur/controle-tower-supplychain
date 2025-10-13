import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export function LineChartComponent({ data, labelKey, kpiKey }) {
  
  // formatter pour n'afficher que mois/jour
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    return `${month}/${day}`; // mm/dd
  };
  
  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <XAxis dataKey={labelKey} tickFormatter={formatDate} />
        <YAxis/>
        <Tooltip labelFormatter={formatDate} />
        <Line type="monotone" dataKey={kpiKey} stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
}
