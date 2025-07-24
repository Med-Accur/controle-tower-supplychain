
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';

const StackedBarChart = ({ data, xKey, yKeys, colors, title, xAxisLabel, yAxisLabel }) => (
  <div className="p-4">
    <h3 className="text-center font-bold text-lg text-blue-600 mb-2">{title}</h3>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
       <XAxis
  dataKey={xKey}
  interval={0}
  angle={-45}
  textAnchor="end"
  height={60}
  label={{
    value: xAxisLabel,
    position: "insideBottom",
    offset: -40,
  }}
/>

        <YAxis>
          {yAxisLabel && <Label value={yAxisLabel} angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />}
        </YAxis>
        <Tooltip />
        <Legend />
        {yKeys.map((key, index) => (
          <Bar key={key} dataKey={key} stackId="a" fill={colors[index]} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default StackedBarChart;
