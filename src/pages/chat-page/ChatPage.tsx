import React, { Suspense, useContext, useEffect, useRef, useState } from 'react';
import { Await, useLoaderData } from 'react-router-dom';
import TimeAgo from 'react-timeago';
import { AuthContext } from '../../context/AuthContext';
import { SocketContext } from '../../context/SocketContext';
import { Chat, Message, Receiver } from '../../data/types';
import apiRequest from '../../lib/apiRequest';
import { DeferChats, DeferChatsResponse } from '../../lib/loaders';
import { useNotificationStore } from '../../lib/notificationStore';

interface ChatState extends Chat {
  receiver: Receiver;
}
interface SendMessageResponse {
  message: Message;
}
const ChatPage = () => {
  const messageEndRef = useRef<HTMLDivElement>(null);
  const [textData, setTextData] = useState<string>('');
  const [chat, setChat] = useState<ChatState | null>(null);
  const data = useLoaderData() as DeferChats;
  const { user } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const decrease = useNotificationStore((state) => state.decrease);

  const handleOpenChat = async (id: string, receiver: Receiver) => {
    try {
      const res = await apiRequest.get<{ chat: Chat }>('/chat/' + id);
      if (!res.data.chat.seenBy.includes(user?.id!)) {
        decrease();
      }
      setChat({ ...res.data.chat, receiver });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!textData) return;
    try {
      const res = await apiRequest.post<SendMessageResponse>('/message/' + chat?.id, { text: textData });
      setChat((prev) => ({ ...prev!, messages: [...prev?.messages!, res.data.message] }));
      socket?.emit('sendMessage', { receiverId: chat?.receiver.id, data: res.data.message });
      setTextData('');
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat]);
  useEffect(() => {
    const read = async () => {
      try {
        await apiRequest.put('/chat/read/' + chat?.id);
      } catch (error) {
        console.log(error);
      }
    };
    if (chat && socket)
      socket.on('getMessage', (data: Message) => {
        if (chat.id === data.chatId) {
          setChat((prev) => ({ ...prev!, messages: [...prev?.messages!, data] }));
          read();
        }
      });
    return () => {
      socket?.off('getMessage');
    };
  }, [socket, chat]);
  return (
    <div className="chat container">
      <div className="chat__list list hide-scroll">
        <div className="list-header">
          <input className="list-header__input" type="text" placeholder="Search" />
        </div>
        <div className="list-body">
          <Suspense fallback={<p>Loading...</p>}>
            <Await resolve={data.chatResponse} errorElement={<p>Error loading posts ...</p>}>
              {(postResponce: DeferChatsResponse) => (
                <>
                  {postResponce.data.chats.length === 0 ? (
                    <p className="list-body__text">No chats</p>
                  ) : (
                    <>
                      {postResponce.data.chats.map((el) => (
                        <div
                          className="list-body__item item"
                          onClick={() => handleOpenChat(el.id, el.receiver)}
                          key={el.receiver.id}
                        >
                          <img className="item__img" src={el.receiver.avatar || '/noavatar.jpeg'} alt="" />
                          <div className="item__wrapper">
                            <span className="item__wrapper__username">{el.receiver.username}</span>
                            <p className="item__wrapper__text">{el.lastMessage || 'No messages yet.'}</p>
                          </div>
                          <span className="item__date">{el.lastMessageTime || ''}</span>
                          {!el.seenBy.includes(user?.id!) && <span className="item__notification">New</span>}
                        </div>
                      ))}
                    </>
                  )}
                </>
              )}
            </Await>
          </Suspense>
        </div>
      </div>
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
                chat.messages?.map((el) => (
                  <div className={`message ${el.userId === user?.id ? 'own' : ''}`} key={el.id}>
                    <p className="message__text">{el.text}</p>
                    <span className="message__time">
                      <TimeAgo date={el.createdAt} />
                    </span>
                  </div>
                ))
              )}
              <div ref={messageEndRef}></div>
            </div>
            <form onSubmit={handleSubmit} className="messages-footer messages-container">
              <textarea name="text" value={textData} onChange={(e) => setTextData(e.target.value)}></textarea>
              <button>Send</button>
            </form>
          </>
        ) : (
          <p className="messages__text">Select a chat to start messaging</p>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
