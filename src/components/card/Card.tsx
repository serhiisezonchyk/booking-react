import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useModal } from '../../context/ModalContext';
import { Post } from '../../data/types';
import apiRequest from '../../lib/apiRequest';
import ModalMessage from '../modal/ModalMessage';

interface CardProps {
  item: Post;
}

const Card = ({ item }: CardProps) => {
  const { user } = useContext(AuthContext);
  const [saved, setSaved] = useState<boolean>(item.isSaved ?? false);
  const { openModal, setContent,closeModal } = useModal();
  const navigate = useNavigate();
  const handleChatClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    setContent({
      children: <ModalMessage receiverId={item.userId}  userId={user.id} onClose={closeModal}/>,
      title: 'Send message',
    });
    openModal();
  };
  const handleSave = async (id: string) => {
    if (!user) {
      navigate('/login');
      return;
    }

    setSaved((prev) => !prev);
    try {
      await apiRequest.post('/user/save', { postId: id });
    } catch (error) {
      setSaved((prev) => !prev);
      console.log(error);
    }
  };
  return (
    <div className="card">
      <Link to={`/${item.id}`} className="card__img-container">
        <img className="image" src={item.images[0] || '/noimg.png'} alt={`Image ${item.title}`} />
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
            {user?.id !== item.userId && (
              <>
                <div className={`icon ${saved ? 'saved' : ''}`} onClick={() => handleSave(item.id)}>
                  <img className="icon__img" src="/save.png" alt="Save" />
                </div>
                <div className="icon">
                  <img className="icon__img" src="/chat.png" alt="Chat" onClick={handleChatClick} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
