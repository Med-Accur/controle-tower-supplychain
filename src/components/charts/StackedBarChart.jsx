import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const StackedBarChart = ({ data, xKey, yKeys, colors, title }) => (
  <div className="p-4">
    {title && <h3 className="text-lg font-semibold">{title}</h3>}
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey={xKey} />
        <YAxis />
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
