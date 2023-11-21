import React, { useState, useEffect } from 'react';
import './Dashboard.css'

function Dashboard() {
    const [userName, setUserName] = useState('');
    const [userLastName, setUserLastName] = useState('');
    const [profileImageUrl, setProfileImageUrl] = useState('');

    useEffect(() => {
        const storedUserName = localStorage.getItem('userName');
        const storedUserLastName = localStorage.getItem('userLastName');
        const storedProfileImage = localStorage.getItem('userProfileImage');
        if (storedUserName) {
            setUserName(storedUserName);
        }
        if (storedUserLastName) {
            setUserLastName(storedUserLastName);
        }
        if (storedProfileImage) {
            setProfileImageUrl(storedProfileImage);
        }
    }, []);

    return (
        <div>
            
            <h1 className='user'> {userName} {userLastName}</h1>
            {profileImageUrl && <img src={profileImageUrl} alt="Profile" />}
        </div>
    );
}

export default Dashboard;