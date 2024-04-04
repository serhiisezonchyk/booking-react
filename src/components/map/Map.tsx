import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer } from 'react-leaflet';
import { Apartment, MapTypes, SinglePost } from '../../data/types';
import Pin from '../pin/Pin';
interface MapProps {
  items: Apartment[] | SinglePost[];
  type?: MapTypes;
}
const Map = ({ items, type='default' }: MapProps) => {
  return (
    <MapContainer center={[51.505, -0.09]} zoom={7} scrollWheelZoom={false} className={`map ${type}`}>
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
