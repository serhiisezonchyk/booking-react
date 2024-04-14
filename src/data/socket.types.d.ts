import { Message } from './types';

export interface ServerToClientEvents{
    getMessage:(data:Message)=>void;
}

export interface ClientToServerEvents {
    newUser:(userId:string)=>void;
    disconnect:()=>void;
    sendMessage:(data:{ receiverId: string; data: Message })=>void;
  }