import api from "../../api/axios";



export async function getWidget() {
  const {data} = await api.get("api/pre/config/me");

  return data;
}

//test
export async function getDataWidget(rpc_name, params = {}) {
  const {data} = await api.post("api/pre/acceuil/widgets", {
    rpcs: [
      {
        rpc_name,
        params
      },
    ],
    
  });
  console.log("Data from getDataWidget:", data);
  return data;
}


export async function postWidget(widget) {
  const {data} = await api.post("api/pre/config/me/widgets", widget);
  console.log("Data from postWidget:", data);
  return data;
}

