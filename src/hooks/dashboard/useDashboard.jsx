import { useState } from "react";
import {  getDataWidget, getWidget, postWidget } from "../../servicess/dashboard/dashboardServices";


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

    const fetchDataWidget = async (rpcName, filters, module) => {
        setLoading(true);
          try {
            const rawData = await getDataWidget(rpcName, filters, module);
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

    const saveWidget = async (widgetList, module) => {
    if (!module) {
      console.warn("⚠️ Aucun module fourni !");
      return;
    }

    setLoading(true);
    try {
      const data = await postWidget(widgetList, module);
      console.log("Widgets sauvegardés :", data);
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

    return {
    widget,
    table,
    saveWidget,
    fetchWidget,
    fetchDataWidget
  };
}