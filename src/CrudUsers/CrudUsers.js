import apiAxios from '../services/ApiAxios';
import Swal from "sweetalert2";
import React, { useState, useEffect } from 'react';
import Buho from '../Icons/buho.svg';
import './CrudUsers.css';
import FotoPerfil from '../Icons/foto-de-perfil.svg'

const urlAdd = `users/add`;
const urlUpdate = `users/update`;



function CrudUsers({ isOpen, onClose, userToEdit, onUserUpdate }) {
    
    const [userId, setUserId] = useState(0);
    const [error, setError] = useState(null);
    const [isUserCreated, setIsUserCreated] = useState(false);

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
        imagePreviewUrl: FotoPerfil,
    }
    const [formData, setFormData] = useState({initialState});

    const onSubmit = async (formData) => {
        if (formData.password !== formData.repetirContrasena) {
            setError('Las contraseñas no coinciden');
            return false; // Retorna false para indicar que la validación falló
        }

         let formDataToSend = new FormData();
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }
        
        try {
          let response;
          let message = '';
  
          if (userToEdit) {
              // Modo de actualización
              
              response = await apiAxios(urlUpdate, { ...formData, id: userToEdit.id });
              message = 'Edición Completada con éxito.';
          } else {
              // Modo de creación
               response = await apiAxios(urlAdd, formData);
                message = 'Registro Completado.';
            }
        
            Swal.fire({
              title: message,
              imageUrl: Buho,
              imageWidth: 275,
              imageAlt: 'Buho de Bizion',
              html: `<img src="/static/media/Bizion titulo.ad02ac63e5e080f7494e3c78d58a247c.svg" class="swal2-top-left-image" style="position: absolute; top: 16px; left: 16px; width: 200px;">`,
              showCloseButton: true,
              confirmButtonText: 'Volver',
              confirmButtonColor: '#04dba2',
              
          });
          setFormData(initialState);
          setIsUserCreated(true);
          onUserUpdate(); 
          onClose(); 
          return true;
        } catch (response) {
          Swal.fire({
            icon: "error",
            text: "Error al procesar la solicitud"
          });
          return false;
        }
      };

      useEffect(() => {
        let initialData = initialState;
        if (userToEdit) {
            const imageKey = `user-${userToEdit.id}-image`;
            const savedImage = localStorage.getItem(imageKey);
            initialData = { ...userToEdit, imagePreviewUrl: savedImage || FotoPerfil };
          
        } 
          setFormData(initialData)
        
      }, [userToEdit]);
    
    

    

    if (!isOpen) return null;
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const defaultValue = (fieldName) => {
        return userToEdit && userToEdit[fieldName] ? userToEdit[fieldName] : '';
    };

    

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                const imageKey = userToEdit ? `user-${userToEdit.id}-image` : 'new-user-image';
                localStorage.setItem(imageKey, reader.result);
                setFormData({ ...formData, imagePreviewUrl: reader.result });
            };
            reader.readAsDataURL(file);
        }
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
            <div className="image-upload-container">
                <img src={formData.imagePreviewUrl || "path_to_default_placeholder_image"} className="image-preview" alt="profile"/>
                <button type="button" className="image-upload-button" onClick={() => document.getElementById('imageInput').click()}>
                    +
                </button>
                <input
                    type="file"
                    id="imageInput"
                    name="image"
                    accept=".jpg,.jpeg,.png,.gif"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                />
            </div>
                <h2 className="form-title">{userToEdit ? 'Editar Usuario' : 'Agregar Usuario'}</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name" className="group-label">Nombre (s)</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Nombre"
                        value={formData.name}
                        onChange={handleChange}
                        className="form-input"
                    />
                    <label htmlFor="second_name" className="group-label">Apellidos</label>
                    <input
                        type="text"
                        name="second_name"
                        placeholder="Apellidos"
                        value={formData.second_name}
                        onChange={handleChange}
                        className="form-input"
                    />
                    <label htmlFor="cellphone" className="group-label">Telefono</label>
                    <input
                        type="number"
                        name="cellphone"
                        placeholder="Número de Teléfono"
                        value={formData.cellphone}
                        onChange={handleChange}
                        className="form-input"
                    />
                    <label htmlFor="email" className="group-label">Correo</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Correo"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-input"
                    />
                    <label htmlFor="password" className="group-label">Contraseña</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        value={formData.password}
                        onChange={handleChange}
                        className="form-input"
                    />
                    <label htmlFor="repetirContraseña" className="group-label">Repetir Contraseña</label>                    
                    <input
                        type="password"
                        name="repetirContrasena"
                        placeholder="Repetir Contraseña"
                        value={formData.repetirContrasena}
                        onChange={handleChange}
                        className="form-input"
                    />
                    <label htmlFor="rol" className="group-label">Rol de Usuario</label>
                    <input
                        type="text"
                        name="rol"
                        placeholder="Rol de Usuario"
                        value={formData.rol}
                        onChange={handleChange}
                        className="form-input"
                    />
                    <label htmlFor="place" className="group-label">Puesto</label>
                    <input
                        type="text"
                        name="place"
                        placeholder="Puesto"
                        value={formData.place}
                        onChange={handleChange}
                        className="form-input"
                    />
                    <label htmlFor="positon" className="group-label">Posición</label>
                    <input
                        type="text"
                        name="position"
                        placeholder="Posición"
                        value={formData.position}
                        onChange={handleChange}
                        className="form-input"
                    />
                    <label htmlFor="templete" className="group-label">Turno</label>
                    <input
                        type="text"
                        name="template"
                        placeholder="Turno"
                        value={formData.template}
                        onChange={handleChange}
                        className="form-input"
                    />
                    <div className="form-buttons">
                        <button type="button" onClick={() => {
                            onClose()
                            setFormData(initialState);
                        }} className="close-button" > 
                            Cerrar
                            
                        </button>
                        <button className="submit-button" onClick={async () => {
                            const isSuccessful = await onSubmit(formData);
                            if (isSuccessful) {
                                setFormData(initialState);
                                onClose();
                            }
                  }}>
                            {userToEdit ? 'Guardar' : 'Guardar'}
                                    
                        </button>
                        
                    </div>
                </form>
                {error && <p className="error-message">{error}</p>}
                
            </div>
            
        </div>
    );
}

export default CrudUsers;