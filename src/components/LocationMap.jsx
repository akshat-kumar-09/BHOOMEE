import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import { divIcon } from "leaflet";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";

// A plain coloured dot instead of Leaflet's default pin — sidesteps the
// well-known bundler issue where the default marker image paths 404.
const pin = divIcon({
  className: "",
  html: `<div style="width:16px;height:16px;border-radius:50%;background:#2D6B22;border:3px solid #fff;box-shadow:0 0 0 2px rgba(45,107,34,0.35),0 1px 4px rgba(0,0,0,0.35);"></div>`,
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

function Recenter({ lat, lon }) {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lon], map.getZoom());
  }, [lat, lon, map]);
  return null;
}

export default function LocationMap({ lat, lon, height = 160 }) {
  return (
    <div style={{ height, borderRadius: 14, overflow: "hidden", border: "1px solid #ECEAE1", marginBottom: 18 }}>
      <MapContainer
        center={[lat, lon]}
        zoom={14}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
        dragging={true}
        scrollWheelZoom={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
        <Marker position={[lat, lon]} icon={pin} />
        <Recenter lat={lat} lon={lon} />
      </MapContainer>
    </div>
  );
}
