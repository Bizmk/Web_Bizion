import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserTable.css';
import { MdAdd, MdEdit, MdDelete } from 'react-icons/md';
import { GoMultiSelect } from 'react-icons/go';
import SearchIconSVG from './searchedIcon.svg';
import apiAxios from './services/ApiAxios';
import CrudUsers from './CrudUsers';

function UserTable() {
  const navigate = useNavigate();
  const [isCrudModalOpen, setIsCrudModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const urlAdd = `users/`;
  const urlDelete = 'users/delete'
  const [users, setUsers] = useState([]);
  const [headers] = useState(["ID", "Nombre", "Apellido", "Posición", "Puesto", "Turno", "Rol de usuario"]);
  const loadUsersFromStorage = () => {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  };
  useEffect(() => {
    //loadUsersFromStorage();
    loadUsers();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateUserClick = () => {
    navigate('/crud-users');
  };

  const loadUsers = async () => {
    try {
      const dataUsers = await apiAxios(urlAdd, "");
      console.log("api",dataUsers);
      setUsers(dataUsers.dataaxios);
      
    } catch (dataUsers) {
      
    }
  };

  const handleEditUserClick = (user) => {
    setSelectedUser(user); 
    setIsCrudModalOpen(true);
    console.log(user)
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
      console.error('Error al eliminar el usuario:', error);
      
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
  };

  const showDeleteModal = (user) => {
    setSelectedUser(user); 
    setIsDeleteModalOpen(true);
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
        <button className="status-button">Otros</button>
      </div>

      <div className="filters">

      </div>
      <div className='table-responsive'>
      <table>
        <thead>
          <tr>
            {headers.map(header => <th key={header}>{header}</th>)}
            <th></th>
          </tr>
        </thead>
        <tbody>
        {filteredUsers.map(user => (
          
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.second_name}</td>
              <td>{user.position}</td>
              <td>{user.place}</td>
              <td>{user.template}</td>
              <td>{user.rol}</td>
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
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      {isDeleteModalOpen && (
        <div className="delete-modal">
          <div className="delete-modal-content">
            <h2>Confirmar Eliminación</h2>
            <p>¿Estás seguro de que quieres eliminar a: {selectedUser.name} de ID ({selectedUser.id})?</p>
            <button onClick={() => setIsDeleteModalOpen(false)} className="cancel-button">Cancelar</button>
            <button onClick={handleDeleteUser}>Eliminar</button>
            
          </div>
        </div>
      )}
      <CrudUsers key={selectedUser ? selectedUser.id : 'new'} isOpen={isCrudModalOpen} onClose={closeCrudModal}  userToEdit={selectedUser}  onUserUpdate={handleUserUpdated}/>
    </div>
  );
}

export default UserTable;