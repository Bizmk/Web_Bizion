import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import './UserTable.css';
import { MdAdd, MdEdit, MdDelete } from 'react-icons/md';
import { GoMultiSelect } from 'react-icons/go';
import SearchIconSVG from '../Icons/searchedIcon.svg';
import apiAxios from '../services/ApiAxios';
import CrudUsers from '../CrudUsers/CrudUsers';
import Pagination from './Pagination';
import AlertIcon from '../Icons/alerticon.svg'
import Buho from '../Icons/buho.svg';
import { ReactComponent as Task } from '../Icons/task.svg';
import TaskModal from '../CrudTask/TaskModal';
import CrudTask from '../CrudTask/CrudTask';
import CustomTable from './CustomTable';
import io from 'socket.io-client';
import { toast } from 'react-toastify';


const socket = io();


function UserTable() {
  const [isCrudModalOpen, setIsCrudModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [isCrudTaskOpen, setIsCrudTaskOpen] = useState(false);
  const [currentTaskData, setCurrentTaskData] = useState(null);
  const [showTasksTable, setShowTasksTable] = useState(false);
   
  const handleToggleTasksTable = () => {
    setShowTasksTable(prevShowTasksTable => !prevShowTasksTable); 
  };
  
  const urlAdd = `users/`;
  const urlDelete = 'users/delete'
  const [users, setUsers] = useState([]);
  const [headers] = useState(["ID", "Nombre", "Apellido", "Posición", "Puesto", "Turno", "Rol de usuario","Tareas"]);
  
  
  useEffect(() => {
    loadUsers();
    socket.on('usuario_agregado', (nuevoUsuario) => {
      setUsers(prevUsers => [...prevUsers, nuevoUsuario]);
      toast.success(`El usuario ${nuevoUsuario.nombre} ha sido agregado exitosamente.`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
  
    // ... otros manejadores de eventos de socket ...
  
    // Limpiar la suscripción al desmontar el componente
    return () => {
      socket.off('usuario_agregado');
      // ... otros socket.off ...
    };
    
   
  }, []);

  
  

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };


  const rolePermissions = {
    'Cliente': ['ver_proyecto', 'editar_proyecto'],
    'Admin': ['ver_proyecto', 'editar_proyecto', 'eliminar_proyecto', 'gestionar_usuarios'],
    'Jugador': ['ver_gol', 'editar_gol'],
    // Agrega más roles y sus permisos correspondientes
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5; // Puedes ajustar este número según lo necesites
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const loadUsers = async () => {
    try {
      const dataUsers = await apiAxios(urlAdd, "");
      
      setUsers(dataUsers.dataaxios);
      
    } catch (dataUsers) {
      
    }
    
  };

  const handleEditUserClick = (user) => {
    setSelectedUser(user); 
    setIsCrudModalOpen(true);
    
  };

  const handleUserUpdated = () => {
    loadUsers();
  };

  const handleDeleteUser = async () => {
    try {
      
      await apiAxios(urlDelete, { id: selectedUser.id });
  
      
      const updatedUsers = users.filter(user => user.id !== selectedUser.id);
      setUsers(updatedUsers);
    } catch (error) {
      
      
    }
    setIsDeleteModalOpen(false);
    setIsDeleteModalOpen(false);
  };
  const openCrudModal = (user = null) => {
    setSelectedUser(user); 
    setIsCrudModalOpen(true);
  };

  const closeCrudModal = () => {
    setIsCrudModalOpen(false);
    setSelectedUser(null);
    loadUsers();
  };

  const showDeleteModal = (user) => {
    setSelectedUser(user); 
    setIsDeleteModalOpen(true);
  };
  

  const handleOpenTaskModal = (userId) => {
    setCurrentUserId(userId);
    setIsTaskModalOpen(true);
  };

  const handleCloseTaskModal = () => {
    setIsTaskModalOpen(false);
  };
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : {};
  });

  const handleAddTask = (userId, taskTitle) => {
    const updatedTasks = {
      ...tasks,
      [userId]: [...(tasks[userId] || []), taskTitle], // Aquí taskTitle debe ser un objeto o un string
    };
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const handleEditTaskClick = (userId, task, index) => {
    setCurrentUserId(userId);
    setCurrentTaskData({ ...task, index }); // Aquí task debe ser un objeto
    setIsCrudTaskOpen(true);
  };
  
  const handleSaveTask = (updatedTask) => {
    const newTasks = {
      ...tasks,
      [currentUserId]: tasks[currentUserId].map((t, idx) =>
        idx === updatedTask.index ? { ...t, title: updatedTask.title } : t
      ),
    };
    setTasks(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
    setIsCrudTaskOpen(false);
  };

  

  const Del = () => {
    Swal.fire({
      title: "Usuario Eliminado ",
      imageUrl: Buho,
      imageWidth: 275,
      imageAlt: 'Buho de Bizion',
      html: `<img src="/static/media/Bizion titulo.ad02ac63e5e080f7494e3c78d58a247c.svg" class="swal2-top-left-image" style="position: absolute; top: 16px; left: 16px; width: 200px;">`,
      showCloseButton: true,
      confirmButtonText: 'Volver',
      confirmButtonColor: '#04dba2',
      
  });
  };

  const handleShowTasksTable = () => {
    setShowTasksTable(true); // Mostrar la tabla de tareas
  };

  const handleCloseTasksTable = () => {
    setShowTasksTable(false); // Ocultar la tabla de tareas
  };

  

  return (
    <div className="content">
      <header>
        <h1 className='users'>Usuarios</h1>
        <button className="home-button-add" onClick={() => openCrudModal()}><MdAdd /></button>
        

        <div className="search-container">
          <img src={SearchIconSVG} alt="Buscar" className="search-icon" />
          <input type="search" className="search-box"  onChange={handleSearchChange}/>
        </div>
        
      </header>
      <div className="user-status-buttons">
        <button className="status-button active">Activos</button>
        <button className="status-button">Inactivos</button>
        <button className="status-button" onClick={handleToggleTasksTable}>Tareas</button>
      </div>

      <div className="filters">

      </div>
      <div className='table-responsive'>
      <table>
       
        
      </table>
      
      </div>
      {isDeleteModalOpen && (
        <div className="delete-modal">
          <div className="delete-modal-content">
            <img src={AlertIcon} alt="Biziion Logo" className="logo" />
            <h2>Confirmar Eliminación</h2>
            <p>¿Estás seguro de que quieres eliminar a: {selectedUser.name} de ID ({selectedUser.id})?</p>
            <button onClick={() => setIsDeleteModalOpen(false)} className="cancel-button">Cancelar</button>
            <button onClick={() => {
              handleDeleteUser() 
              Del()}} >Eliminar</button>
            
          </div>
          
        </div>
      )}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={handleCloseTaskModal}
        onAddTask={handleAddTask}
        userId={currentUserId}
      />
      {isCrudTaskOpen && (
        <CrudTask
        isOpen={isCrudTaskOpen}
        onClose={() => setIsCrudTaskOpen(false)}
        taskData={currentTaskData}
        onSave={handleSaveTask}
      />
      )}

{showTasksTable ? (
      <CustomTable
        
      />
    ) : (
      <div className='table-responsive'>
        <table>
        <thead>
          <tr>
            {headers.map(header => <th key={header}>{header}</th>)}
            <th></th>
          </tr>
        </thead>
        <tbody>
        {currentUsers.map(user => (
          
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.second_name}</td>
              <td>{user.position}</td>
              <td>{user.place}</td>
              <td>{user.template}</td>
              <td>{user.rol}</td>
              <td>
                {tasks[user.id] && tasks[user.id].map((task, index) => (
                  <div key={index}>
                    {task.title} {/* Accede a la propiedad title si task es un objeto */}
                    <button className="icon-task" onClick={() => handleEditTaskClick(user.id, task, index)}>
                      <MdEdit />
                    </button>
                  </div>
                                
                  ))}
                   
                  
                </td>
              <td className='icon'>
                <div className="icon-actions">
                  <button className="icon-button" onClick={() => { handleEditUserClick(user) }}>
                    <MdEdit />
                  </button>
                  <button className="icon-button" onClick={() => showDeleteModal(user)}>
                    <MdDelete />
                  </button>
                  <button className="icon-button" onClick={() => { }}>
                    <GoMultiSelect />
                  </button>
                  <button className="icon-button" onClick={() => handleOpenTaskModal(user.id)}>
                    <Task className="icon-task" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
        </table>
        <Pagination
          usersPerPage={usersPerPage}
          totalUsers={filteredUsers.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    )}
      
      <CrudUsers key={selectedUser ? selectedUser.id : 'new'} isOpen={isCrudModalOpen} onClose={closeCrudModal}  userToEdit={selectedUser}  onUserUpdate={handleUserUpdated}/>
    </div>
  );
}

export default UserTable;