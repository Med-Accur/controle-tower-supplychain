import { ComposedChart, Bar, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const ComboChart = ({ data, xKey, barKey, lineKey, barColor = "#82ca9d", lineColor = "#ff7300", title }) => (
  <div className="p-4">
    {title && <h3 className="text-lg font-semibold">{title}</h3>}
    <ResponsiveContainer width="100%" height={300}>
      <ComposedChart data={data}>
        <XAxis dataKey={xKey} />
        <YAxis />
        <Tooltip />
        <Bar dataKey={barKey} barSize={20} fill={barColor} />
        <Line type="monotone" dataKey={lineKey} stroke={lineColor} />
      </ComposedChart>
    </ResponsiveContainer>
  </div>
);

export default ComboChart;
