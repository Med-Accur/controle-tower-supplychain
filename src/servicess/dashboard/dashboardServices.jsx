import api from "../../api/axios";


export async function getWidget() {
  const {data} = await api.get("api/pre/config/me");

  return data;
}



export async function getDataWidget(rpc_name, params = {}) {
  const {data} = await api.post("api/pre/accueil/widgets", {
    rpcs: [
      {
        rpc_name,
        params
      },
    ],
    
  });
  return data;
}


export async function postWidget(widget) {
  const {data} = await api.post("api/pre/config/me/widgets", widget);
  return data;
}

