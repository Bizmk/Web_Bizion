import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './SuccessMessage.css';
import Buho from './buho.svg';
import { IoMdCheckmarkCircle } from 'react-icons/io';

function SuccessMessage() {
    const location = useLocation();
    const { isUpdating } = location.state || {};
    const [loading, setLoading] = useState(true);
    const message = isUpdating ? "Edición completada con éxito" : "Registro Completado";
    useEffect(() => {
        
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <div className="success-container">
            {loading ? (
                <div className="spinner"></div>
            ) : (
                <>
                    <img src={Buho} alt='Buho' className="checkmark-logo" /> 
                    <p>{message}</p>
                </>
            )}
        </div>
    );
}

export default SuccessMessage;