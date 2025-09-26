import { useState } from "react";
import {  getDataWidget, getWidget } from "../../servicess/dashboard/dashboardServices";


export function useDashboard() {
  const [table, setTable] = useState([]);
  const [widget, setWidget] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 const  fetchWidget = async () => {
        setLoading(true);
          try {
             const data = await getWidget();
             setWidget(data);
           } catch (err) {
           setError(err.message);
           } finally {
            setLoading(false);
        }
    };

    const fetchDataWidget = async (rpcName) => {
        setLoading(true);
          try {
            const rawData = await getDataWidget(rpcName);
            const dataRaw = rawData?.[rpcName] ?? rawData ?? null;
            const data = (dataRaw && dataRaw[rpcName] !== undefined) ? dataRaw[rpcName] : dataRaw;
            setTable((prev) => ({
              ...prev,
              [rpcName]: data,
            }));
          } catch (err) {
            console.error(err.message);
          }
      };

    return {
    widget,
    table,
    fetchWidget,
    fetchDataWidget
  };
}