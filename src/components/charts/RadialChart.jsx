import {
  RadialBarChart,
  RadialBar,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#00c49f", "#ff69b4"];

const RadialChart = ({ data, dataKey, nameKey, title }) => {
  const processedData = data.map((entry, index) => ({
    ...entry,
    fill: COLORS[index % COLORS.length],
  }));

  return (
    <div style={{ width: "100%", height: 300 }}>
      <h3 className="text-center font-bold text-lg text-blue-600 mb-2">{title}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="20%"
          outerRadius="90%"
          barSize={15}
          data={processedData}
        >
          <RadialBar
            minAngle={15}
            label={{ position: "insideStart", fill: "#333" }}
            background
            clockWise
            dataKey={dataKey}
          />
          <Tooltip />

          {/* ✅ Légende personnalisée avec noms visibles */}
          <Legend
            layout="vertical"
            verticalAlign="middle"
            align="right"
            iconSize={10}
            content={() => (
              <ul style={{ listStyle: "none", padding: 0 }}>
                {processedData.map((entry, index) => (
                  <li
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: 6,
                    }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        width: 12,
                        height: 12,
                        backgroundColor: entry.fill,
                        marginRight: 8,
                        borderRadius: 2,
                      }}
                    ></span>
                    <span style={{ fontSize: 12 }}>{entry[nameKey]}</span>
                  </li>
                ))}
              </ul>
            )}
          />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RadialChart;
