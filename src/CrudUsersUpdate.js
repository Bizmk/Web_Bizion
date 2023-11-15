import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CrudUsers.css';
import { useLocation } from 'react-router-dom';
import SuccessMessage from './SuccessMessage';

function CrudUsersUpdate({ isOpen, onClose, userToEdit }) {
    const [userId, setUserId] = useState(0);
    const [error, setError] = useState(null);
    const [isUserCreated, setIsUserCreated] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const user = location.state.user;
    const [formData, setFormData] = useState({
        nombre: '',
        apellidos: '',
        correo: '',
        telefono: '',
        contrasena: '',
        repetirContrasena: '',
        rol: '',
        puesto: '',
        posicion: '',
        plantilla: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        if (userToEdit) {
            setFormData(userToEdit);
        } else {
            setFormData({
               
            });
        }
    }, [userToEdit]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (userToEdit) {
            
        } else {
            
        }
        onClose(); 
    

        if (formData.contrasena !== formData.repetirContrasena) {
            setError('Las contraseñas no coinciden');
            return;
        }

        const dataWithId = { id: userId, ...formData };
        console.log(dataWithId);
        setIsUserCreated(true);
        console.log('Mensaje de éxito configurado');
        setTimeout(() => {
            navigate('/home'); 
        }, 5000);
        setFormData({
            nombre: '',
            apellidos: '',
            correo: '',
            telefono: '',
            contrasena: '',
            repetirContrasena: '',
            rol: '',
            puesto: '',
            posicion: '',
            plantilla: ''
        });
        setError(null);
        setUserId(prevId => prevId + 1);
    };

    

    if (isUserCreated) {
        return <SuccessMessage />;
    }


    return (
        <div className="crud-users-modal">
            <div className="crud-users-content">
                <h2 className="form-title">Actualizar Usuario</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        defaultValue={user.nombre}
                        name="nombre"
                        placeholder="Nombre"
                        
                        onChange={handleChange}
                        className="form-input"
                    />
                    <input
                        type="text"
                        name="apellidos"
                        defaultValue={user.apellido}
                        placeholder="Apellidos"
                        
                        onChange={handleChange}
                        className="form-input"
                    />
                    <input
                        type="email"
                        name="correo"
                        placeholder="Correo"
                        defaultValue={user.correo}
                        onChange={handleChange}
                        className="form-input"
                    />
                    <input
                        type="number"
                        name="telefono"
                        placeholder="Número de Teléfono"
                        defaultValue={user.telefono}
                        onChange={handleChange}
                        className="form-input"
                    />
                    <input
                        type="password"
                        name="contrasena"
                        placeholder="Contraseña"
                        value={formData.contrasena}
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
                        defaultValue={user.rol}
                        placeholder="Rol de Usuario"
                        
                        onChange={handleChange}
                        className="form-input"
                    />
                    <input
                        type="text"
                        name="puesto"
                        defaultValue={user.puesto}
                        placeholder="Puesto"
                        onChange={handleChange}
                        className="form-input"
                    />
                    <input
                        type="text"
                        name="posicion"
                        defaultValue={user.posicion}
                        placeholder="Posición"                      
                        onChange={handleChange}
                        className="form-input"
                    />
                    <input
                        type="text"
                        name="plantilla"
                        placeholder="Plantilla"
                        defaultValue={user.turno}
                        onChange={handleChange}
                        className="form-input"
                    />
                    <button type="submit" className="submit-button">
                        Actualizar Usuario
                    </button>
                </form>
                {error && <p className="error-message">{error}</p>}
                
            </div>
        </div>
    );
}

export default CrudUsersUpdate;