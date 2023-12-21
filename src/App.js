import io from 'socket.io-client';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import LoginForm from './LoginForm/LoginForm';
import Home  from './Home/Home';
import AutoCheckin from './components/AutoCheckin'
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  return (
    
    <Router>
      <div className="App">
      <ToastContainer />  
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/home" element={<Home />} />
          <Route path="/auto-checkin" element={<AutoCheckin />} />          
        </Routes>
        
      </div>
    </Router>
    
  );
}

export default App;