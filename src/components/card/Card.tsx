import { Link } from 'react-router-dom';
import { Apartment } from '../../data/types';

interface CardProps {
  item: Apartment;
}

const Card = ({ item }: CardProps) => {
  return (
    <div className="card">
      <Link to={`/${item.id}`} className="card__img-container">
        <img className="image" src={item.img} alt={`Image ${item.title}`} />
      </Link>
      <div className="card__text-container">
        <h2 className="card__title">
          <Link to={`/${item.id}`}> {item.title}</Link>
        </h2>
        <p className="card__address">
          <img className="card__address__img" src="/pin.png" alt="Pin" />
          <span>{item.address}</span>
        </p>
        <p className="card__price">${item.price}</p>
        <div className="card__bottom">
          <div className="card__features">
            <div className="feature">
              <img src="/bed.png" alt="Bed image" className="feature__img" />
              <span className="feature__span">{item.bedroom} bedroom</span>
            </div>
            <div className="feature">
              <img src="/bath.png" alt="Bath image" className="feature__img" />
              <span className="feature__span">{item.bathroom} bathroom</span>
            </div>
          </div>
          <div className="card__icons">
            <div className="icon">
              <img className="icon__img" src="/save.png" alt="Save" />
            </div>
            <div className="icon">
              <img className="icon__img" src="/chat.png" alt="Chat" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
