import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { map } from 'leaflet';
import { ListFilterPlus, RotateCw } from 'lucide-react';
import Button from '../../components/ui/Button';
import { useDashboard } from '../../hooks/dashboard/useDashboard';
import { useEffect } from 'react';
// Exemple de données à récupérer via une API dans un useEffect ou query
const pointsCommandes = [
  { ville: 'Paris', lat: 48.8566, lng: 2.3522, nombre_commandes: 120, otif: 0.91 },
  { ville: 'Casablanca', lat: 33.5731, lng: -7.5898, nombre_commandes: 84, otif: 0.87 },
  { ville: 'Berlin', lat: 52.52, lng: 13.405, nombre_commandes: 45, otif: 0.78 },
]

export default function CarteCommandesClients({ mapInfo=[] }) {
    const { mapData, fetchDataMap } = useDashboard();
    useEffect(() => {
          fetchDataMap(mapInfo.map((item) => item.rpc_name));

      }, [mapInfo]);
console.log(mapData);
  return (
    <div className='overflow-auto bg-white rounded-2xl border border-[#D6D6D6] bg-[#F9FAFB] p-5 shadow-sm md:p-6 cursor-move handle'>
    <div className="flex m-2 justify-between items-center mt-3 text-sm">
          <h2 className="text-xl font-semibold mb-2">test</h2>
              <div className="flex space-x-2">
              <Button  className="no-drag inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800">
                <ListFilterPlus className="w-5 h-5"/>Filtre
              </Button>
              <Button  className="no-drag inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800">
                <RotateCw  className="w-5 h-5"/>
              </Button>
              </div>
            </div>
    <MapContainer className='no-drag' center={[30, 0]} zoom={1.6} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {pointsCommandes.map((point, i) => (
        <CircleMarker
           
          key={i}
          center={[point.lat, point.lng]}
          radius={Math.sqrt(point.nombre_commandes)} // taille dynamique
          color="blue"
          fillOpacity={0.6}
        >
          <Tooltip direction="top" offset={[0, -5]} opacity={1}>
            <div style={{ fontSize: '14px' }}>
              <b>{point.ville}</b><br />
              📦 Commandes : {point.nombre_commandes}<br />
              ✅ OTIF : {(point.otif * 100).toFixed(1)}%
            </div>
          </Tooltip>
        </CircleMarker>
      ))}
    </MapContainer>
    </div>
  )
}
