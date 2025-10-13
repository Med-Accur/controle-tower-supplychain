import React, { useState } from "react";
import { BarChartComponent } from "./BarChartComponent";
import { LineChartComponent } from "./LineChartComponent";
import { PieChartComponent } from "./PieChartComponent";
import { Filter, List } from "lucide-react";
import ChartFiltre from "./ChartFiltre";
import { createPortal } from "react-dom";

const chartComponents = {
  bar: BarChartComponent,
  line: LineChartComponent,
  pie: PieChartComponent,
};

export default function ChartCard({ name, type = [], chartType, data, axe, filter = [], onFilterApply }) {
  const [showMenu, setShowMenu] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [selectedChart, setSelectedChart] = useState(chartType);

  const dataKeys = Object.keys(data[0] || {});
  const defaultLabelKey = dataKeys[0];
  const defaultDataKey = dataKeys[1];
  const defaultKpiKey = dataKeys[2];

  if (!selectedChart || !data) return null;

  const Chart = chartComponents[selectedChart];
  if (!Chart) return <div className="text-red-500">Type de chart inconnu : {selectedChart}</div>;
  
  
  return (
    <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold capitalize">{name}</h3>

          <div className="flex gap-2"> 
            {/* Bouton filtre */}
            <button
              onClick={() => setShowFilter(true)}
              className="p-2 rounded bg-gray-100 hover:bg-gray-300"
            >
              <Filter className="w-5 h-5" />
            </button>
            <div className="relative">
            <button
              onClick={() => setShowDate(!showDate)}
              className="p-2 rounded bg-gray-100 hover:bg-gray-300"
            >
              <Filter className="w-5 h-5" />
            </button>
            {showDate && (  
                <div className="absolute right-0 top-full mt-2 bg-white border rounded shadow-lg z-10">
                    <ul className="space-y-2">
                        <li>
                            <button  onClick={() => {
                                        setShowDate(false);
                                        onFilterApply({ start_date: new Date(new Date().setDate(new Date().getDate() - 7)).toISOString().split('T')[0]});
                                        }} 
                          className="w-full px-2 py-2 text-left hover:bg-gray-100">7 derniers jours</button>
                        </li>
                        <li>
                            <button onClick={() => {
                                setShowDate(false);
                                onFilterApply({ start_date: new Date(new Date().setDate(new Date().getDate() - 15)).toISOString().split('T')[0]});
                            }} 
                            className="w-full px-2 py-2 text-left hover:bg-gray-100">15 derniers jours</button>
                        </li>
                        <li>
                            <button onClick={() => {
                                setShowDate(false);
                                onFilterApply({ start_date: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0]});
                            }} 
                            className="w-full px-2 py-2 text-left hover:bg-gray-100">30 derniers jours</button>
                        </li>
                    </ul>
                </div>
            )}
            </div>

            {/* Menu type chart */}
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 rounded bg-gray-100 hover:bg-gray-300"
              >
                <List className="w-5 h-5" />
              </button>
              {showMenu && (
                <div className="absolute right-0 top-full mt-2 bg-white border rounded shadow-lg z-10">
                  <ul className="flex flex-col">
                    {type.map((chart) => (
                      <li key={chart}>
                        <button
                          className="w-full px-2 py-2 text-left hover:bg-gray-100"
                          onClick={() => {
                            setSelectedChart(chart);
                            setShowMenu(false);
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

      {/* Filter portal */}
      {showFilter &&
        typeof document !== "undefined" &&
        createPortal(
          <ChartFiltre
            filter={filter}
            onClose={() => setShowFilter(false)}
            onApply={(values) => {
              setShowFilter(false);
              if (onFilterApply) onFilterApply(values);
            }}
          />,
          document.body
        )}
    </div>
  );
}
