import { Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import { Apartment, SinglePost } from '../../data/types';

interface PinProps {
  item: Apartment | SinglePost;
}
const Pin = ({ item }: PinProps) => {
  return (
    <Marker position={[item.latitude, item.longitude]}>
      <Popup>
        <div className="popup-container">
          <img className="popup-container__image" src={'img' in item ? item.img : item.images[0]} alt="image" />
          <div className="text-container">
            <Link to={`/${item.id}`}>{item.title}</Link>
            {'bedroom' in item && <span className="text-bedroom">{item.bedroom} bedroom</span>}
            <strong>$ {item.price}</strong>
          </div>
        </div>
      </Popup>
    </Marker>
  );
};

export default Pin;
