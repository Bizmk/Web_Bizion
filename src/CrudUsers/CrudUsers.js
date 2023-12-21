import apiAxios from '../services/ApiAxios';
import Swal from "sweetalert2";
import { v4 as uuidv4 } from 'uuid';
import React, { useState, useEffect } from 'react';
import Buho from '../Icons/buho.svg';
import './CrudUsers.css';
import FotoPerfil from '../Icons/foto-de-perfil.svg'
import Camara from '../components/Camara'

const urlAdd = `users/add`;
const urlUpdate = `users/update`;
const urlAddPhoto = `image/save`;
const urlShowPhoto = `image/image`;





function CrudUsers({ isOpen, onClose, userToEdit, onUserUpdate }) {
    
    const [userId, setUserId] = useState(0);
    const [error, setError] = useState(null);
    const [isUserCreated, setIsUserCreated] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [uploadedImageName, setUploadedImageName] = useState('');
    const [imageId, setImageId] = useState('');
    const [useCamera, setUseCamera] = useState(false); 
    const [showImageOptions, setShowImageOptions] = useState(false);

    

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
        profile_pic: '' ,
        imagePreviewUrl: FotoPerfil,
    }
    const [formData, setFormData] = useState(initialState);

    const base64ToBlob = (base64Data) => {
        // Dividir la cadena base64 en partes
        const parts = base64Data.split(';base64,');
        const imageType = parts[0].split(':')[1];
        const decodedData = window.atob(parts[1]);
        const byteNumbers = new Array(decodedData.length);
    
        for (let i = 0; i < decodedData.length; i++) {
            byteNumbers[i] = decodedData.charCodeAt(i);
        }
    
        const byteArray = new Uint8Array(byteNumbers);
    
        // Crear un Blob con los datos decodificados
        const blob = new Blob([byteArray], { type: imageType });
        return blob;
    };

    const handleImageCapture = async (capturedImage) => {
        // Convertir la imagen en un objeto File o Blob, si es necesario
        const imageBlob = base64ToBlob(capturedImage);
        const file = new File([imageBlob], "captura.jpeg", { type: 'image/jpeg' });
    
        // Subir la imagen y manejarla como un archivo seleccionado
        const filename = await uploadImage(file); // Suponiendo que devuelve el nombre del archivo en el servidor
        if (filename) {
            await fetchImageUsingPost(filename); // Actualizar la vista previa con la imagen del servidor
            setUseCamera(false); // Desactivar la cámara
        }
    };

    const handleImageOptions = (option) => {
        if (option === 'camera') {
            setUseCamera(true);
        } else {
            document.getElementById('imageInput').click();
        }
        setShowImageOptions(false);
    };
    
    const postData = async (url, data) => {
        try {
            const response = await apiAxios(url, data);
            return response.data; // o cualquier campo que contenga la respuesta necesaria
        } catch (error) {
            console.error('Error al enviar los datos:', error);
            return null;
        }
    };
    
    const uploadImage = async (file) => {
        if (!(file instanceof File)) {
            console.error("uploadImage fue llamado sin un archivo válido");
            return null;
        }
        const toBase64 = (file) => new Promise((resolve, reject) => {
            if (file) { // Esto verifica tanto File como Blob ya que File hereda de Blob
                const reader = new FileReader();
                reader.readAsDataURL(file);
                console.log(file);
                reader.onload = () => resolve(reader.result.split(';base64,').pop());
                reader.onerror = error => reject(error);
            } else {
                reject(new Error("El argumento proporcionado no es un archivo."));
            }
        });

        try {
            const base64Image = await toBase64(file);
            const filename = uuidv4();
            const filenameT = `${filename}.jpeg`; 
            const path_local = 'prueba/'; 
            setUploadedImageName(filenameT);
            
            const body = {
                base64: [base64Image],
                path_images: [filenameT],
                path_local: path_local,
            };

            
            const response = await apiAxios(urlAddPhoto, body);
            console.log(body)

            if (response.statusResponse){
                console.log("Imagen cargada, filename: ", filenameT);


                setUploadedImageName(filenameT);
                setImageId(filename);
                return filename;
            } else {
                

                console.error('La imagen no se pudo guardar:', response);
                return null;
            }
            return filenameT;
        } catch (error) {
            
            console.error('Error al subir la ilustración:', error);
            return null;
        }
        
    };

    

    const fetchImageUsingPost = async (imageId) => {
        try {
            const response = await apiAxios(urlShowPhoto, {
                id: imageId,
                directory: 'prueba/'
            });
            
            if (response.dataaxios) {
                // Si la API devuelve una cadena en base64, la usamos directamente en la etiqueta img
                const base64Image = response.dataaxios;
                
                setFormData(prevFormData => ({
                    ...prevFormData,
                    imagePreviewUrl: base64Image // Actualiza el estado con la cadena base64 de la imagen.
                }));
            }
        } catch (error) {
            console.error('Error al recuperar la imagen:', error);
        }
    };

    const onSubmit = async (formData) => {
        
        const filename = await uploadImage(imageFile);
        const updatedFormData = { ...formData, profile_pic: filename };
        if (formData.password !== formData.repetirContrasena) {
            setError('Las contraseñas no coinciden');
            
        }

         

        
        
        try {
            const filename = await uploadImage(imageFile);
            if (!filename) {
                // Manejar el caso en que la carga de la imagen falló
                setError('No se pudo cargar la imagen.');
                return;
            }
            await fetchImageUsingPost(filename);

            
            let formDataToSend = new FormData();
            for (const key in updatedFormData) {
                formDataToSend.append(key, updatedFormData[key]);
            }

        // Agrega este log para verificar los datos antes de enviarlos

        let response; 
        let message;
        
          if (userToEdit) {
              // Modo de actualización
              
              response = await apiAxios(urlUpdate, { ...updatedFormData, id: userToEdit.id });
              message = 'Edición Completada con éxito.';
          } else {
               
               response = await apiAxios(urlAdd, updatedFormData);
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
          
        } catch (response) {
            Swal.fire({
                title: '¡Exito!',
                imageUrl: Buho,
                imageWidth: 275,
                imageAlt: 'Buho de Bizion',
                showCloseButton: true,
                confirmButtonText: 'Volver',
                confirmButtonColor: '#04dba2',
                
            });

            console.log("Aqui el error", response)
          
        }
      };

      useEffect(() => {
        let initialData = initialState;
        if (userToEdit) {
            // Aquí, usa el valor de uploadedImageName si está disponible
            initialData = { ...userToEdit, imagePreviewUrl: uploadedImageName || userToEdit.profile_pic || FotoPerfil, profile_pic: uploadedImageName || userToEdit.profile_pic || '' };
            fetchImageUsingPost(userToEdit.profile_pic);
        }
        setFormData(initialData);
    }, [userToEdit, uploadedImageName]); // Asegúrate de que uploadedImageName sea una dependencia

      
    
      

    

    if (!isOpen) return null;
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const filename = await uploadImage(file);
            await fetchImageUsingPost(filename);

            setImageFile(file); // Actualiza el estado imageFile con el archivo de imagen
            // Nota: No necesitas llamar aquí a uploadImage si lo harás en onSubmit
        } else {
            console.error('handleImageChange fue llamado sin un archivo de imagen válido');
            setError('Por favor, selecciona un archivo de imagen válido.');
        }
    };

    const defaultValue = (fieldName) => {
        return userToEdit && userToEdit[fieldName] ? userToEdit[fieldName] : '';
    };

    



    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.repetirContrasena) {
            setError('Las contraseñas no coinciden');
            return false; // Retorna false para indicar que la validación falló
        }

         

        
        
        try {
          
  
          const filenameT = await uploadImage(imageFile);
          console.log("HOLAAAAAAAAAAA",filenameT)
          if (filenameT) {
            
                const updatedFormData = { ...formData, profile_pic: filenameT };
            let formDataToSend = new FormData();

            for (const key in updatedFormData) {
                formDataToSend.append(key, updatedFormData[key]);
            }

        // Agrega este log para verificar los datos antes de enviarlos
        console.log("Datos del formulario antes de enviar:", Object.fromEntries(formDataToSend.entries()));

        let response; 
        var message;
        
          if (userToEdit) {
              // Modo de actualización
              formDataToSend.append('profile_pic', updatedFormData.profile_pic);
              response = await apiAxios(urlUpdate, { ...updatedFormData, id: userToEdit.id });
              message = 'Edición Completada con éxito.';
          } else {
              // Modo de creación
              formDataToSend.append('profile_pic', updatedFormData.profile_pic);
               response = await apiAxios(urlAdd, updatedFormData);
                message = 'Registro Completado.';
            }
          }        
        
            
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

    

    


    return (
        <div className="crud-users-modal">
            <div className="crud-users-content">
            <div className="image-upload-container">
                <img src={formData.imagePreviewUrl} className="image-preview" alt="profile"/>
                <button type="button" className="image-upload-button" onClick={() => setShowImageOptions(true)}>
               +
                </button>
                {useCamera ? (
                    <>
                        <Camara onCapture={handleImageCapture} />
                    </>
                ) : (
                    <>
                       
                        
                        <input
                            type="file"
                            id="imageInput"
                            name="image"
                            accept=".jpg,.jpeg,.png,.gif"
                            onChange={handleImageChange}
                            style={{ display: 'none' }}
                        />
                    </>
                )}
            </div>

            {showImageOptions && (
            <div className="image-options-modal">
                <button onClick={() => handleImageOptions('camera')}>Usar Cámara</button>
                <button onClick={() => handleImageOptions('upload')}>Subir Imagen</button>
                <button onClick={() => setShowImageOptions(false)}>Cancelar</button>
            </div>
        )}
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