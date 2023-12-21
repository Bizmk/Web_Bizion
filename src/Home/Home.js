import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Home.css';
import UserTable from '../UserTable/UserTable';
import Bizion from "../Icons/Group 2383.svg"
import Dashboard from '../Dashboard/Dashboard';
import UserIcon from '../Icons/Group.svg'
import DashBoardIcon from '../Icons/Groupicon1.svg'


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
                        <li><button onClick={() => showComponent('dashboard')} className="button">
                        <img src={DashBoardIcon} alt="Icono de Usuarios" className="icono-usuario" />
                        </button></li>
                        <li><button onClick={() => showComponent('users')} className="button">
                        <img src={UserIcon} alt="Icono de Usuarios" className="icono-usuario" />
                        </button></li>
                        
                
                     </ul>
                     
                
            
                </nav>
            </div>

            {visibleComponent === 'dashboard' && <Dashboard />}
            {visibleComponent === 'users' && <UserTable />}
    
           
            
        </div>
    );
}

export default Home;