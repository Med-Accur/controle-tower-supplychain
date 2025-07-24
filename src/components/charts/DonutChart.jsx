import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const COLORS = ['#8884d8', '#FF8042'];

const DonutChart = ({ data, dataKey, nameKey, title }) => {
  // On suppose que data contient UNE seule entrée avec un pourcentage
  const value = data?.[0]?.[dataKey] ?? 0;
  const formattedData = [
    { name: title, value: value },
    { name: `Non ${title}`, value: 100 - value }
  ];

  return (
    <div className="p-4">
      <h3 className="text-center font-bold text-lg text-blue-600 mb-2">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={formattedData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            label
          >
            {formattedData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DonutChart;
