// ChatMessages.js
import { memo, useContext, useState } from 'react';
import InputEmoji from 'react-input-emoji';
import { AuthContext } from '../../context/AuthContext';
import { ChatsResponse, Message } from '../../data/types';
import { timeFormat } from '../../lib/timeFormat';

interface ChatMessagesProps {
  chat: ChatsResponse | null;
  setChat: React.Dispatch<React.SetStateAction<ChatsResponse | null>>;
  handleSubmit: (str: string) => Promise<void>;
  messageEndRef: React.RefObject<HTMLDivElement>;
}

const ChatMessages: React.FC<ChatMessagesProps> = memo(({ chat, handleSubmit, setChat, messageEndRef }:ChatMessagesProps) => {
  const [textData, setTextData] = useState('');

  const { user } = useContext(AuthContext);

  const handleInputChange = (text: string) => {
    setTextData(text);
  };

  const handleEnterPress = async (text: string) => {
    await handleSubmit(text);
    setTextData('');
  };

  return (
    <div className={`chat__messages messages ${chat ? 'messages-open' : ''}`}>
      {chat ? (
        <>
          <div className="messages-header messages-container">
            <img src={chat.receiver.avatar || '/noavatar.jpeg'} alt="" className="messages-header__img avatar" />
            <div className="messages-header__wrapper">
              <span className="messages-header__name">{chat.receiver.username}</span>
              <span className="messages-header__time"></span>
            </div>
            <img className="messages-header__img arrow" onClick={() => setChat(null)} src="/arrow.png" alt="" />
          </div>
          <div className="messages-body messages-container hide-scroll">
            {chat.messages?.length === 0 ? (
              <p>Say hello...</p>
            ) : (
              chat.messages?.map((el: Message) => (
                <div className={`message ${el.userId === user?.id ? 'own' : ''}`} key={el.id}>
                  <p className="message__text">{el.text}</p>
                  <span className="message__time">{timeFormat(el.createdAt)}</span>
                </div>
              ))
            )}
            <div ref={messageEndRef}></div>
          </div>
          <form className="messages-footer messages-container">
            <InputEmoji
              placeholder="Type a message"
              value={textData}
              onChange={handleInputChange}
              height={25}
              shouldConvertEmojiToImage={false}
              shouldReturn
              onEnter={handleEnterPress}
            />
          </form>
        </>
      ) : (
        <p className="messages__text">Select a chat to start messaging</p>
      )}
    </div>
  );
});

export default ChatMessages;