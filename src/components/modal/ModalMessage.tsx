import { useState } from 'react';

interface ModalMessageProps {
  receiverId: string;
  userId: string;
  onClose: () => void;
}
const ModalMessage = ({ receiverId, userId, onClose }: ModalMessageProps) => {
  const [message, setMessage] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const handleSubmit = () => {
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
