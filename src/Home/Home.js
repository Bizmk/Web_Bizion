import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Home.css';
import UserTable from '../UserTable/UserTable';
import Bizion from "../Icons/Bizion titulo.svg"
import Dashboard from '../Dashboard/Dashboard';

function Home() {
    const location = useLocation();
    const [visibleComponent, setVisibleComponent] = useState('dashboard');
   



    const showComponent = (componentName) => {
        setVisibleComponent(componentName);
    };
    
    useEffect(() => {
    
        if (location.state?.showUserTable) {
            setVisibleComponent('users');
        }
    }, [location]);

    

    return (
        <div className="container-home">
            <div className="sidebar">
            <img src={Bizion} alt="Biziion Logo" className="logo" />
                <nav>
                    <ul>
                        <li><button onClick={() => showComponent('dashboard')}>Dashboard</button></li>
                        <li><button onClick={() => showComponent('users')}>Usuarios</button></li>
                        <li><button onClick={() => showComponent('otherComponent')}>Otra Opción</button></li>
                
                     </ul>
                     
                
            
                </nav>
            </div>

            {visibleComponent === 'dashboard' && <Dashboard />}
            {visibleComponent === 'users' && <UserTable />}
    
           
            
        </div>
    );
}

export default Home;