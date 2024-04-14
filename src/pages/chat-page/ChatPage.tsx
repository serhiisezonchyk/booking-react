import React, { useContext, useEffect, useRef, useState } from 'react';
import { useLoaderData, useRevalidator } from 'react-router-dom';
import ChatList from '../../components/chat-list/ChatList';
import ChatMessages from '../../components/chat-messages/ChatMessages';
import { AuthContext } from '../../context/AuthContext';
import { SocketContext } from '../../context/SocketContext';
import { Chat, Message, Receiver } from '../../data/types';
import apiRequest from '../../lib/apiRequest';
import { DeferChats } from '../../lib/loaders';
import { useNotificationStore } from '../../lib/notificationStore';

interface ChatState extends Chat {
  receiver: Receiver;
}
interface SendMessageResponse {
  message: Message;
}
const ChatPage = () => {
  const messageEndRef = useRef<HTMLDivElement>(null);
  const [chat, setChat] = useState<ChatState | null>(null);
  const data = useLoaderData() as DeferChats;
  const { user } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);
  const decrease = useNotificationStore((state) => state.decrease);
  const revalidator = useRevalidator();

  const handleOpenChat = async (id: string, receiver: Receiver) => {
    try {
      const res = await apiRequest.get<{ chat: Chat }>('/chat/' + id);
      if (!res.data.chat.seenBy.includes(user?.id!)) {
        decrease();
      }
      setChat({ ...res.data.chat, receiver });
      revalidator.revalidate();

    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (str:string) => {
    if (!str) return;
    try {
      const res = await apiRequest.post<SendMessageResponse>('/message/' + chat?.id, { text: str });
      setChat((prev) => ({ ...prev!, messages: [...prev?.messages!, res.data.message] }));
      socket?.emit('sendMessage', { receiverId: chat?.receiver.id, data: res.data.message });
      revalidator.revalidate();
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
        revalidator.revalidate();
      } catch (error) {
        console.log(error);
      }
    };
    if (socket)
      socket.on('getMessage', (data: Message) => {
        if (chat?.id === data.chatId) {
          setChat((prev) => ({ ...prev!, messages: [...prev?.messages!, data] }));
          read();
        } else revalidator.revalidate();
      });
    return () => {
      socket?.off('getMessage');
    };
  }, [socket, chat]);

  return (
    <div className="chat container">
      <ChatList data={data} handleOpenChat={handleOpenChat} />
      <ChatMessages
        setChat={setChat}
        chat={chat}
        handleSubmit={handleSubmit}
        messageEndRef={messageEndRef}
      />
    </div>
  );
};

export default ChatPage;
