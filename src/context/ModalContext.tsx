import React, { createContext, useContext, useState } from 'react';
import ModalTemplate from '../components/modal/ModalTemplate';

export interface ModalProps {
  children: React.ReactNode;
  title: string;
}
interface ModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  setContent: ({ children, title }: ModalProps) => void;
}

// Create the context
const ModalContext = createContext<ModalContextType | undefined>(undefined);

// Custom hook to access the modal context
export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

// Modal provider component
export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<ModalProps>({
    children: <></>,
    title: 'Modal',
  });

  // Function to open the modal
  const openModal = () => {
    setIsOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsOpen(false);
  };

  // Define the context value
  const modalContextValue: ModalContextType = {
    isOpen,
    openModal,
    closeModal,
    setContent,
  };

  return (
    <ModalContext.Provider value={modalContextValue}>
      {children}
      <ModalTemplate title={content.title}>
        {content.children}
      </ModalTemplate>
    </ModalContext.Provider>
  );
};
