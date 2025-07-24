import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Label
} from "recharts";

const ComboChart = ({ data, xKey, barKey, lineKey, barColor = "#82ca9d", lineColor = "#ff7300", title, xAxisLabel, yAxisLabel }) => {
  if (!Array.isArray(data) || data.length === 0) return null;
  return (
    <div className="p-4">
      <h3 className="text-center font-bold text-lg text-blue-600 mb-2 ">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
         <XAxis
  dataKey={xKey}
  interval={0} // ➕ Affiche tous les ticks
  angle={-30} // ➕ Incline les labels
  textAnchor="end" // ➕ Positionne correctement le texte
  height={80} // ➕ Laisse de l'espace sous l'axe
  label={{
    value: xAxisLabel,
    position: "insideBottom",
    offset: 8,
  }}
/>

          <YAxis>
            {yAxisLabel && <Label value={yAxisLabel} angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />}
          </YAxis>
          <Tooltip />
          <Bar dataKey={barKey} barSize={20} fill={barColor} />
          <Line type="monotone" dataKey={lineKey} stroke={lineColor} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ComboChart;