import React, { useState, useEffect } from 'react';
import './CrudTask.css'; // Asegúrate de tener un archivo CSS con tus estilos

const CrudTask = ({ isOpen, onClose, taskData, onSave }) => {
  // Estados para los campos del formulario
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState( '');
  const [status, setStatus] = useState( '');
  const [area, setArea] = useState( '');

  useEffect(() => {
    if (isOpen) {
      if (taskData && taskData.id) {
        // Intenta recuperar los datos de la tarea desde localStorage si hay un ID
        const storedTaskData = localStorage.getItem(`task-${taskData.id}`);
        console.log(storedTaskData)
        
        if (storedTaskData) {
          const task = JSON.parse(storedTaskData);
          setTitle(task.title);
          console.log(storedTaskData)
          setDescription(task.description);
          setPriority(task.priority);
          setStatus(task.status);
          setArea(task.area);
        } else {
          // Si no hay datos en localStorage, usa los datos pasados como props
          setTitle(taskData.title || "");
          setDescription(taskData.description || "");
          setPriority(taskData.priority || "");
          setStatus(taskData.status || "");
          setArea(taskData.area || "");
        }
      } else {
        // Resetea los campos si no hay datos de tarea
        setTitle(taskData.title);
        setDescription(taskData.description);
        setPriority(taskData.priority);
        setStatus(taskData.status);
        setArea(taskData.area  );
        setArea(taskData.area);
      }
    }
  }, [taskData, isOpen]);

  


  // Añade estados adicionales para cada campo que necesites

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    let taskId = taskData && taskData.id ? taskData.id : null;
  if (!taskId) {
    // Si es una nueva tarea, genera un nuevo ID
    taskId = Date.now();
  }
    const task = {
      id: taskData.id,  // Usa un ID existente o genera uno nuevo
      title,
      description,
      priority,
      status,
      area
      // ... otros campos ...
    };
    onSave(task); 
    console.log('Guardando tarea:', task); 
    localStorage.setItem(`task-${task.id}`, JSON.stringify(task));
    
    const savedTask = localStorage.getItem(`task-${task.id}`);
    console.log('Tarea guardada:', JSON.parse(savedTask));
    onClose(); // Cierra el modal después de guardar
    alert('Tarea guardada con éxito.');
  };

  return (
    <div className="crud-task-modal">
      <div className="crud-task-content">
        <form onSubmit={handleSubmit}>
          <h2>Editar Tarea</h2>

          <label htmlFor="title" className="group-label">Título</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label htmlFor="description" className="group-label">Descripción</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label htmlFor="priority" className="group-label">Prioridad</label>
          <select placeholder='Prioridad'
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="" > Prioridad</option>
            

            <option value="alta">Alta</option>
            <option value="media">Media</option>
            <option value="baja">Baja</option>
          </select>

          <label htmlFor="status" className="group-label">Estado</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="" >Estado</option>


            <option value="pendiente">Pendiente</option>
            <option value="en_progreso">En Progreso</option>
            <option value="completado">Completado</option>
          </select>

          <label htmlFor="area" className="group-label">Área</label>
          <select
            id="area"
            value={area}
            onChange={(e) => setArea(e.target.value)}
          >
            <option value="" >Área</option>

            <option value="Al_chilazo">Oficina</option>
            <option value="Porton_1">Porton 1</option>
            <option value="Puerta_2">Puerta 2</option>
          </select>

          
          
          <div className="crud-task-actions" >
            <button type="button" onClick={onClose}>Cancelar</button>
            <button type="submit">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrudTask;