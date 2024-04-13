import { useContext, useState } from 'react';
import apiRequest from '../../lib/apiRequest';
import { SocketContext } from '../../context/SocketContext';
import { Message } from '../../data/types';

interface ModalMessageProps {
  receiverId: string;
  userId: string;
  onClose: () => void;
}
interface SendMessageResponse {
  message: Message;
}
const ModalMessage = ({ receiverId, userId, onClose }: ModalMessageProps) => {
  const [message, setMessage] = useState<string>('');
  const {socket} = useContext(SocketContext);
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async() => {
    if(!message) onClose()

    try {
      const res = await apiRequest.post<SendMessageResponse>('/message/to/' + receiverId, { text: message });
      console.log(res.data)
      // socket?.emit('sendMessage', { receiverId: receiverId, data: res.data.message });
    } catch (error) {
      
    }
    console.log(message, receiverId, userId);
    onClose();
    // setMessage(''); // Clear the message after submission
  };
  return (
    <>
      <textarea value={message} onChange={handleChange}></textarea>
      <button className="modal-body__button" onClick={handleSubmit}>
        Send
      </button>
    </>
  );
};

export default ModalMessage;
