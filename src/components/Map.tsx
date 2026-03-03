import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, useMap, Popup, Marker } from "react-leaflet";
import type { Cords } from "../Types/types";

interface Props {
  cords: Cords;
  onMapClick: (lat: number, lon: number) => void;
}

const Map = ({ cords, onMapClick }: Props) => {
  return (
    <div>
      <MapContainer
        center={[cords.lat, cords.lon]}
        zoom={13}
        scrollWheelZoom={false}
        style={{
          width: "full",
          height: "500px",
        }}>
        <MapClick onMapClick={onMapClick} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[12.8855, 74.8388]}></Marker>
      </MapContainer>
    </div>
  );
};

export default Map;

function MapClick({
  onMapClick,
}: {
  onMapClick: (lat: number, lon: number) => void;
}) {
  const map = useMap();

  map.on("click", (e) => {
    const { lat, lng } = e.latlng;
    map.panTo([lat, lng]);
    onMapClick(lat, lng);
  });
  return null;
}
