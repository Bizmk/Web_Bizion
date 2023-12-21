import React, { useState, useEffect } from 'react';
import apiAxios from '../services/ApiAxios';
import './Dashboard.css'

const urlShowPhoto = `image/image`;

function Dashboard() {
    const [userName, setUserName] = useState('');
    const [userLastName, setUserLastName] = useState('');
    const [profileImageUrl, setProfileImageUrl] = useState('');
    const fetchImageUsingPost = async (imageId) => {
        try {
            const response = await apiAxios(urlShowPhoto, {
                id: imageId,
                directory: 'prueba/'
            });
           
            if (response.dataaxios) {
                // Si la API devuelve una cadena en base64, la usamos directamente en la etiqueta img
                const base64Image = response.dataaxios;
                
                return base64Image
                
            }
        } catch (error) {
            
        }
    };
    useEffect(() => {
        const storedUserName = localStorage.getItem('userName');
        const storedUserLastName = localStorage.getItem('userLastName');
        const storedProfileImageId = localStorage.getItem('userProfileImage');
        if (storedUserName) {
            setUserName(storedUserName);
        }
        if (storedUserLastName) {
            setUserLastName(storedUserLastName);
        }
        if (storedProfileImageId) {
            fetchImageUsingPost(storedProfileImageId).then((base64Image) => {
                
                const imageSrc = base64Image;
                setProfileImageUrl(imageSrc);
                
            }).catch((error) => {
                
            });
        }
    }, []);

    return (
        <div>
            <img src={profileImageUrl} alt="Profile" className="profile-image"/> 
            <h1 className='user'> {userName} {userLastName}</h1>
            
        </div>
    );
}

export default Dashboard;