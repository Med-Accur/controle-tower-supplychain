import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Label } from 'recharts';

const CustomLineChart = ({ data, xKey, yKey, color = "#8884d8", title, xAxisLabel, yAxisLabel }) => (
  <div className="p-4">
    <h3 className="text-center font-bold text-lg text-blue-600 mb-2 ">{title}</h3>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis
       dataKey={xKey}
       interval={0} // ➕ Affiche tous les ticks
       angle={-40} // ➕ Incline les labels
       textAnchor="end" // ➕ Positionne correctement le texte
       height={80} // ➕ Laisse de l'espace sous l'axe
       label={{
       value: xAxisLabel,
       position: "insideBottom",
      offset: 2,
    }}
     />


        <YAxis>
          {yAxisLabel && <Label value={yAxisLabel} angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />}
        </YAxis>
        <Tooltip />
        <Line type="monotone" dataKey={yKey} stroke={color} strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default CustomLineChart;