import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const ChatPage = () => {
  const [chat, setChat] = React.useState<boolean | null>(false);
  const { user } = useContext(AuthContext);
  return (
    <div className="chat container">
      <div className="chat__list list hide-scroll">
        <div className="list-header">
          <input className="list-header__input" type="text" placeholder="Search" />
        </div>
        <div className="list-body">
          <div className="list-body__item item" onClick={() => setChat(true)}>
            <img className="item__img" src={user?.avatar || '/noavatar.jpeg'} alt="" />
            <div className="item__wrapper">
              <span className="item__wrapper__username">{user?.username}</span>
              <p className="item__wrapper__text">Lofesfesfesfs</p>
            </div>
            <span className="item__date">22:31</span>
          </div>
          <div className="list-body__item item" onClick={() => setChat(true)}>
            <img className="item__img" src={user?.avatar || '/noavatar.jpeg'} alt="" />
            <div className="item__wrapper">
              <span className="item__wrapper__username">{user?.username}</span>
              <p className="item__wrapper__text">Lofesfesfesfs</p>
            </div>
            <span className="item__date">22:31</span>
          </div>
          <div className="list-body__item item" onClick={() => setChat(true)}>
            <img className="item__img" src={user?.avatar || '/noavatar.jpeg'} alt="" />
            <div className="item__wrapper">
              <span className="item__wrapper__username">{user?.username}</span>
              <p className="item__wrapper__text">Lofesfesfesfs</p>
            </div>
            <span className="item__date">22:31</span>
          </div>
        </div>
      </div>
      <div className={`chat__messages messages ${chat ? 'messages-open' : ''}`}>
        <div className="messages-header messages-container">
          <img src={user?.avatar || '/noavatar.jpeg'} alt="" className="messages-header__img avatar" />
          <div className="messages-header__wrapper">
            <span className="messages-header__name">{user?.username}</span>
            <span className="messages-header__time">21:31</span>
          </div>
          <img className="messages-header__img arrow" onClick={() => setChat(false)} src="/arrow.png" alt="" />
        </div>
        <div className="messages-body messages-container hide-scroll">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((el) => (
            <>
              <div className="message">
                <p className="message__text">textfewfew</p>
                <span className="message__time">21:22</span>
              </div>
              <div className="message own">
                <p className="message__text">textfewfew</p>
                <span className="message__time">21:22</span>
              </div>
            </>
          ))}
        </div>
        <div className="messages-footer messages-container">
          <textarea></textarea>
          <button>Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
