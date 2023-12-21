import React, { useState } from 'react';
import './LoginForm.css';
import { useNavigate } from 'react-router-dom';
import apiAxios from '../services/ApiAxios';
import Bizion from "../Icons/Group 2383.svg"




const urlLogin = `login/`;



function LoginForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ cellphone: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleLogin = async () => {
    try {
      const response = await apiAxios(urlLogin, formData);
      console.log("--------------->",response)
      if (response.statusResponse) {
        localStorage.setItem('userName', response.dataaxios.second_name);
        localStorage.setItem('userLastName', response.dataaxios.email);
        localStorage.setItem('userProfileImage', response.dataaxios.cellphone);
        console.log("NOMBRE", response.dataaxios.second_name)
        navigate('/home');
      } else {
       
        setError('Número de teléfono o contraseña incorrecta o problema en la conexión');
      }
    } catch (error) {
      
      setError('Error al procesar la solicitud');
    }
  };
  

  return (
    <div className="login-container">
      <img src={Bizion} alt="Biziion Logo" className="login-title" />
      <div className="login-form">
        <input type="text" name="cellphone" placeholder="Numero de Telefono" value={formData.cellphone} onChange={handleChange} /> 
        <input type="password" name="password" placeholder="Contraseña" value={formData.password}  onChange={handleChange}/>
        <button onClick={handleLogin}>Iniciar sesión</button>
        <div className="login-links">
          <div className="left-links">
            <a href="#">Registrarse</a>
            <a href="#">Invitado</a>
          </div>
          <div className="right-link">
            <a href="#">¿Olvidaste tu contraseña?</a>
          </div>
        </div>
      </div>
      <footer className="login-footer">
        <a href="#">Términos de servicio  </a>
        <a href="#">  Política de privacidad  </a>
        <a href="#">  Política de operación   </a>
        <a href="#">  Servicio al cliente     </a>
        <div>Copyright &copy; Bizi<span>ion </span> todos los derechos reservados</div>
      </footer>
    </div>
  );
}

export default LoginForm;