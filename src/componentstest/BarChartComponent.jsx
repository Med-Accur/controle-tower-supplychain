import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export function BarChartComponent({ data, labelKey, kpiKey }) {

    const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    return `${month}/${day}`; // mm/dd
  };
  
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data}>
        <XAxis dataKey={labelKey} tickFormatter={formatDate} />
        <YAxis />
        <Tooltip labelFormatter={formatDate} />
        <Bar dataKey={kpiKey} fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}
