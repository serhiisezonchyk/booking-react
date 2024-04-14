import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { ChatsResponse, Receiver } from '../../data/types';
import { timeFormat } from '../../lib/timeFormat';

interface ChatItemProps {
  chat: ChatsResponse;
  handleOpenChat: (id: string, receiver: Receiver) => void;
}

const ChatItem = ({ chat, handleOpenChat }: ChatItemProps) => {
  const { receiver, lastMessage, lastMessageTime, seenBy } = chat;
  const { user } = useContext(AuthContext);
  return (
    <div className="list-body__item item" onClick={() => handleOpenChat(chat.id, receiver)}>
      <img className="item__img" src={receiver.avatar || '/noavatar.jpeg'} alt="" />
      <div className="item__wrapper">
        <span className="item__wrapper__username">{receiver.username}</span>
        <p className="item__wrapper__text">{lastMessage || 'No messages yet.'}</p>
      </div>
      <span className="item__date">{timeFormat(lastMessageTime!)}</span>
      {!seenBy.includes(user?.id!) && <span className="item__notification"></span>}
    </div>
  );
};

export default ChatItem;
