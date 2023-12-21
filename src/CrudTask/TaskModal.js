import React, { useState, useEffect } from 'react';
import './CrudTask.css'

const TaskModal = ({ isOpen, onClose, onAddTask, userId }) => {
  const [task, setTask] = useState('');

  // Cierra el modal si se hace clic fuera de él
  useEffect(() => {
    const closeOnOutsideClick = (e) => {
      if (e.target.id === 'modal-overlay') {
        onClose();
      }
    };

    // Agrega el listener cuando el modal está abierto
    if (isOpen) {
      window.addEventListener('click', closeOnOutsideClick);
    }

    // Limpieza del listener
    return () => window.removeEventListener('click', closeOnOutsideClick);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      title: task, // Asegúrate de que guardas la tarea como un objeto con un título
      // Agrega aquí otras propiedades si es necesario
    };
    onAddTask(userId, newTask);
    setTask('');
    onClose();
  };

  return (
    <div id="modal-overlay" className="modal-overlay">
      <div className="modal">
        
        <form onSubmit={handleSubmit}>
        <button type="submit">Agregar Tarea</button>
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Descripción de la tarea"
            required
          />
          
          
        </form>
      </div>
    </div>
  );
};

export default TaskModal;