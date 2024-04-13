import Modal from 'react-modal';
import { ModalProps, useModal } from '../../context/ModalContext';
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: 0,
  },
};
Modal.setAppElement('#root');

const ModalTemplate = ({ children, title }: ModalProps) => {
  const { isOpen, closeModal } = useModal();
  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} contentLabel="Message Modal" className='modal' overlayClassName='overlay'>
      <div className="modal-inner">
        <div className="modal-header">
          <h1 className="modal-header__title">{title}</h1>
          <button className="close-button" onClick={closeModal}>
            X
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </Modal>
  );
};

export default ModalTemplate;
