import apiAxios from './services/ApiAxios';
import Swal from "sweetalert2";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserTable from './UserTable';
import Buho from './buho.svg';


import './CrudUsers.css';


const urlAdd = `users/add`;
const urlUpdate = `users/update`;



function CrudUsers({ isOpen, onClose, userToEdit, onUserUpdate }) {
    
    
    const [userId, setUserId] = useState(0);
    const [error, setError] = useState(null);
    const [isUserCreated, setIsUserCreated] = useState(false);
    const navigate = useNavigate();
    const initialState = {
        cellphone: '',
        email: '',
        id: '',
        name: '',
        second_name:'',
        password: '',
        repetirContrasena: '',
        rol: '',
        place: '',
        position: '',
        template: '',
    }
    const [formData, setFormData] = useState({initialState});

    const onSubmit = async (formData) => {
        try {
          let response;
          let message = '';
  
          if (userToEdit) {
              // Modo de actualización
              response = await apiAxios(urlUpdate, { ...formData, id: userToEdit.id });
              message = 'Usuario actualizado con éxito.';
          } else {
              // Modo de creación
               response = await apiAxios(urlAdd, formData);
                message = 'Usuario creado con éxito.';
            }
        
            Swal.fire({
              title: 'Éxito!',
              text: message,
              imageUrl: './buho.svg',
              imageWidth: 200,
              imageAlt: 'Imagen personalizada'
            

              
          });
          setFormData(initialState);
          setIsUserCreated(true);
          onUserUpdate(); // Suponiendo que tienes una prop 'onUserUpdated' para actualizar la lista de usuarios en el componente padre
          onClose(); // Cierra el modal si es necesario
        } catch (response) {
          Swal.fire({
            icon: "error",
            text: "Error al procesar la solicitud"
          });
        }
      };

      useEffect(() => {
        if (userToEdit) {
          setFormData(userToEdit);
        } else {
          setFormData(initialState);
        }
      }, [userToEdit]);
    
    if (isUserCreated) {
        const isUpdating = userToEdit != null;
        
    } 

    

    if (!isOpen) return null;
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const defaultValue = (fieldName) => {
        return userToEdit && userToEdit[fieldName] ? userToEdit[fieldName] : '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.repetirContrasena) {
            setError('Las contraseñas no coinciden');
            return;
          }

        const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
            try {
      let response;
      if (userToEdit) {
        // Modo de actualización
        response = await apiAxios(urlUpdate, { ...formData, id: userToEdit.id });
      } else {
        // Modo de creación
        response = await apiAxios(urlAdd, formData);
      }

      

      onUserUpdate();
      setIsUserCreated(true);
      setFormData(initialState);
      setUserId((prevId) => prevId + 1);
      onClose();

      

    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
        
        
    };

    


    return (
        <div className="crud-users-modal">
            <div className="crud-users-content">
                <h2 className="form-title">{userToEdit ? 'Actualizar Usuario' : 'Crear Usuario'}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Nombre"
                        value={formData.name}
                        onChange={handleChange}
                        className="form-input"
                    />
                    <input
                        type="text"
                        name="second_name"
                        placeholder="Apellidos"
                        value={formData.second_name}
                        onChange={handleChange}
                        className="form-input"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Correo"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-input"
                    />
                    <input
                        type="number"
                        name="cellphone"
                        placeholder="Número de Teléfono"
                        value={formData.cellphone}
                        onChange={handleChange}
                        className="form-input"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        value={formData.password}
                        onChange={handleChange}
                        className="form-input"
                    />
                    <input
                        type="password"
                        name="repetirContrasena"
                        placeholder="Repetir Contraseña"
                        value={formData.repetirContrasena}
                        onChange={handleChange}
                        className="form-input"
                    />
                    <input
                        type="text"
                        name="rol"
                        placeholder="Rol de Usuario"
                        value={formData.rol}
                        onChange={handleChange}
                        className="form-input"
                    />
                    <input
                        type="text"
                        name="place"
                        placeholder="Puesto"
                        value={formData.place}
                        onChange={handleChange}
                        className="form-input"
                    />
                    <input
                        type="text"
                        name="position"
                        placeholder="Posición"
                        value={formData.position}
                        onChange={handleChange}
                        className="form-input"
                    />
                    <input
                        type="text"
                        name="template"
                        placeholder="Turno"
                        value={formData.template}
                        onChange={handleChange}
                        className="form-input"
                    />
                    <div className="form-buttons">
                        <button type="button" onClick={onClose} className="close-button">
                            Cerrar
                        </button>
                        <button className="submit-button" onClick={() => {
                            onSubmit(formData);
                            setFormData(initialState);
                  }}>
                            {userToEdit ? 'Actualizar' : 'Guardar'}
                                    
                        </button>
                        
                    </div>
                </form>
                {error && <p className="error-message">{error}</p>}
                
            </div>
            
        </div>
    );
}

export default CrudUsers;