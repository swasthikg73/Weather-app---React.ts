import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, useMap, Marker } from "react-leaflet";
import type { Cords } from "../../Types/types";
import { useEffect } from "react";
import { MaptilerLayer } from "@maptiler/leaflet-maptilersdk";

interface Props {
  cords: Cords;
  onMapClick: (lat: number, lon: number) => void;
  mapType: string;
}

const Map = ({ cords, onMapClick, mapType }: Props) => {
  const API_KEY = import.meta.env.VITE_API_KEY;

  return (
    <div>
      <MapContainer
        center={[cords.lat, cords.lon]}
        zoom={6}
        scrollWheelZoom={false}
        style={{
          width: "100%",
          height: "600px",
        }}>
        <MapClick onMapClick={onMapClick} cords={cords} />
        {/* <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        /> */}
        <MapTileLayer />
        <TileLayer
          opacity={0.7}
          url={`https://tile.openweathermap.org/map/${mapType}/{z}/{x}/{y}.png?appid=${API_KEY}`}
        />
        <Marker position={[cords.lat, cords.lon]}></Marker>
      </MapContainer>
    </div>
  );
};

export default Map;

function MapClick({
  onMapClick,
  cords,
}: {
  onMapClick: (lat: number, lon: number) => void;
  cords: Cords;
}) {
  const map = useMap();
  map.panTo([cords.lat, cords.lon]);

  map.on("click", (e) => {
    const { lat, lng } = e.latlng;
    onMapClick(lat, lng);
  });
  return null;
}

function MapTileLayer() {
  const map = useMap();

  useEffect(() => {
    const tileLayer = new MaptilerLayer({
      style: "basic-dark",
      apiKey: import.meta.env.VITE_TILE_LAYER_KEY,
    });

    tileLayer.addTo(map);
    // return () => {
    //   map.removeLayer(tileLayer);
    // };
  }, []);

  return null;
}
