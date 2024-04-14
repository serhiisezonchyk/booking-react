import { Suspense, useEffect } from 'react';
import { Await, useRevalidator } from 'react-router-dom';
import { ChatsResponse, Receiver } from '../../data/types';
import { DeferChats, DeferChatsResponse } from '../../lib/loaders';
import ChatItem from '../chat-item/ChatItem';
interface ChatListProps {
  data: DeferChats;
  handleOpenChat: (id: string, receiver: Receiver) => void;
}
const ChatList = ({ data, handleOpenChat }: ChatListProps) => {

  return (
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
                    {postResponce.data.chats.map((el: ChatsResponse) => (
                      <ChatItem key={el.receiver.id} chat={el} handleOpenChat={handleOpenChat} />
                    ))}
                  </>
                )}
              </>
            )}
          </Await>
        </Suspense>
      </div>
    </div>
  );
};

export default ChatList;
