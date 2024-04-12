import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer } from 'react-leaflet';
import { MapTypes, Post } from '../../data/types';
import Pin from '../pin/Pin';
interface MapProps {
  items: Post[];
  type?: MapTypes;
}
const Map = ({ items, type = 'default' }: MapProps) => {
  return (
    <MapContainer
      center={items.length === 1 ? [+items[0].latitude, +items[0].longitude] : [52.4797, -1.90269]}
      zoom={7}
      scrollWheelZoom={false}
      className={`map ${type}`}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {items.map((item) => (
        <Pin item={item} key={item.id} />
      ))}
    </MapContainer>
  );
};

export default Map;
