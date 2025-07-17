import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';

const RadialChart = ({ data, dataKey, nameKey, color = "#8884d8", title }) => (
  <div className="p-4">
    {title && <h3 className="text-lg font-semibold">{title}</h3>}
    <ResponsiveContainer width="100%" height={300}>
      <RadialBarChart innerRadius="10%" outerRadius="80%" data={data} startAngle={180} endAngle={0}>
        <RadialBar
          minAngle={15}
          label={{ position: 'insideStart', fill: '#fff' }}
          background
          clockWise
          dataKey={dataKey}
          fill={color}
        />
        <Legend iconSize={10} layout="vertical" verticalAlign="middle" align="right" />
      </RadialBarChart>
    </ResponsiveContainer>
  </div>
);

export default RadialChart;
