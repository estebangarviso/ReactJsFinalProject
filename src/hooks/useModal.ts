import { useState } from 'react';

const useModal = () => {
  const [modal, setModal] = useState(false);
  const [activeView, setActiveView] = useState('');

  const handleCloseModal = () => {
    setModal(false);
  };

  const handleOpenModal = () => {
    setModal(true);
  };

  const handleActiveView = (view: string) => {
    setActiveView(view);
  };

  return {
    modal,
    handleCloseModal,
    handleOpenModal,
    activeView,
    handleActiveView,
  };
};

export default useModal;
