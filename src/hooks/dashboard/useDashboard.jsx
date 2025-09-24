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

    // 🔑 on déballe ici
    const data = rawData?.[rpcName]?.[rpcName] ?? rawData?.[rpcName] ?? rawData;
          setTable((prev) => ({
            ...prev,
            [rpcName]: data ?? null,
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