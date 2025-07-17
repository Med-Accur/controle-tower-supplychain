import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const CustomBarChart = ({ data, xKey, yKey, color = "#8884d8", title }) => (
  <div className="p-4">
    {title && <h3 className="text-lg font-semibold">{title}</h3>}
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey={xKey} />
        <YAxis />
        <Tooltip />
        <Bar dataKey={yKey} fill={color} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default CustomBarChart;
