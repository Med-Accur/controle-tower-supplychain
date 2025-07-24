import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Label } from 'recharts';

const CustomBarChart = ({ data, xKey, yKey, color = "#8884d8", title, xAxisLabel, yAxisLabel }) => (
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
        <Bar dataKey={yKey} fill={color} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default CustomBarChart;