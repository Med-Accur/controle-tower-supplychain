import React, { useState } from "react";
import { BarChartComponent } from "./BarChartComponent";
import { LineChartComponent } from "./LineChartComponent";
import { PieChartComponent } from "./PieChartComponent";
import { Filter, Calendar, List } from "lucide-react";
import ChartFiltre from "./ChartFiltre";
import { createPortal } from "react-dom";

const chartComponents = {
  bar: BarChartComponent,
  line: LineChartComponent,
  pie: PieChartComponent,
};

export default function ChartCard({
  name,
  type = [],
  chartType,
  data,
  axe,
  filter = [],
  onFilterApply,
}) {
  const [activeMenu, setActiveMenu] = useState(null); 
  const [selectedChart, setSelectedChart] = useState(chartType);
  
  const dataKeys = Object.keys(data[0] || {});
  const defaultLabelKey = dataKeys[0];
  const defaultDataKey = dataKeys[1];
  const defaultKpiKey = dataKeys[2];

  if (!selectedChart || !data) return null;

  const Chart = chartComponents[selectedChart];
  if (!Chart)
    return <div className="text-red-500">Type de chart inconnu : {selectedChart}</div>;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold capitalize">{name}</h3>

        <div className="flex gap-2">
          <button
            onClick={() => setActiveMenu(activeMenu === "filter" ? null : "filter")}
            className="p-2 rounded bg-gray-100 hover:bg-gray-300"
          >
            <Filter className="w-5 h-5" />
          </button>

          <div className="relative">
            <button
              onClick={() => setActiveMenu(activeMenu === "date" ? null : "date")}
              className="p-2 rounded bg-gray-100 hover:bg-gray-300"
            >
              <Calendar className="w-5 h-5" />
            </button>

            {activeMenu === "date" && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-sm z-10">
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => {
                        setActiveMenu(null);
                        onFilterApply({
                          start_date: new Date(
                            new Date().setDate(new Date().getDate() - 7)
                          )
                            .toISOString()
                            .split("T")[0],
                        });
                      }}
                      className="w-full px-2 py-2 text-left hover:bg-gray-100"
                    >
                      7 derniers jours
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        setActiveMenu(null);
                        onFilterApply({
                          start_date: new Date(
                            new Date().setDate(new Date().getDate() - 15)
                          )
                            .toISOString()
                            .split("T")[0],
                        });
                      }}
                      className="w-full px-2 py-2 text-left hover:bg-gray-100"
                    >
                      15 derniers jours
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        setActiveMenu(null);
                        onFilterApply({
                          start_date: new Date(
                            new Date().setDate(new Date().getDate() - 30)
                          )
                            .toISOString()
                            .split("T")[0],
                        });
                      }}
                      className="w-full px-2 py-2 text-left hover:bg-gray-100"
                    >
                      30 derniers jours
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* --- Bouton type de chart --- */}
          <div className="relative">
            <button
              onClick={() => setActiveMenu(activeMenu === "chart" ? null : "chart")}
              className="p-2 rounded bg-gray-100 hover:bg-gray-300"
            >
              <List className="w-5 h-5" />
            </button>

            {activeMenu === "chart" && (
              <div className="absolute right-0 mt-2 w-25 bg-white border border-gray-200 rounded-md shadow-sm z-10">
                <ul className="flex flex-col">
                  {type.map((chart) => (
                    <li key={chart}>
                      <button
                        className="w-full px-2 py-2 text-left hover:bg-gray-100 capitalize"
                        onClick={() => {
                          setSelectedChart(chart);
                          setActiveMenu(null);
                        }}
                      >
                        {chart}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <Chart
        data={data}
        labelKey={defaultLabelKey}
        kpiKey={defaultDataKey}
        dataKey={defaultKpiKey}
        kpiLabel={axe}
      />

      {activeMenu === "filter" &&
        typeof document !== "undefined" &&
        createPortal(
          <ChartFiltre
            filter={filter}
            onClose={() => setActiveMenu(null)}
            onApply={(values) => {
              setActiveMenu(null);
              if (onFilterApply) onFilterApply(values);
            }}
          />,
          document.body
        )}
    </div>
  );
}
