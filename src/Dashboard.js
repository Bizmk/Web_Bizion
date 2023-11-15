import React, { useState, useEffect } from 'react';
import './Dashboard.css'

function Dashboard() {
    const [userName, setUserName] = useState('');
    const [userLastName, setUserLastName] = useState('');

    useEffect(() => {
        const storedUserName = localStorage.getItem('userName');
        const storedUserLastName = localStorage.getItem('userLastName');
        if (storedUserName) {
            setUserName(storedUserName);
        }
        if (storedUserLastName) {
            setUserLastName(storedUserLastName);
        }
    }, []);

    return (
        <div>
            <h1 className='user'> {userName} {userLastName}</h1>
            {/* Aquí puedes añadir más lógica o elementos de UI relacionados con el usuario */}
        </div>
    );
}

export default Dashboard;