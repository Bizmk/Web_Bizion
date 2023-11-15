import React, { useState } from 'react';
import CrudUsers from './CrudUsers'; 

function ParentComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button onClick={handleOpenModal}>Crear Usuario</button>
      <CrudUsers isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}

export default ParentComponent;